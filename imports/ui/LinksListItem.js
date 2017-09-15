import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

export default class LinksListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            justCopied: false,
            lastVisitedText: this.getLastVisitedText()
        };
    }
    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy);
        this.clipboard.on('success', () => {
            this.setState({ justCopied: true });
            setTimeout(() => { this.setState({ justCopied: false }); }, 1000);
        });
        this.clipboard.on('error', () => {
            alert('Cannot Copy');
        });

        this.interval = setInterval(() => {
            this.setState({
                lastVisitedText: this.getLastVisitedText()
            });
        }, 1000);
    }
    getLastVisitedText(){
        return this.props.lastVisitedAt ? moment(this.props.lastVisitedAt).fromNow() : '';
    }
    componentWillUnmount() {
        this.clipboard.destroy();
        clearInterval(this.interval);
    }
    setVisibility() {
        Meteor.call('links.setVisibility', this.props._id, !this.props.visible, (error, result) => {
            console.log('Link setVisibility result', error, result);
        });
    }
    removeLink() {
        Meteor.call('links.remove', this.props._id, (error, result) => {
            console.log('Link remove result', error, result);
        });
    }
    renderStat() {
        return <p className="item__stat">{this.props.visitedCount} {this.props.visitedCount > 1 ? 'Visits' : 'Visit'} <span title={moment(this.props.lastVisitedAt).format('Do MMM YYYY, h:mm:ssa')}>{this.state.lastVisitedText}</span></p>;
    }
    render() {
        return (
            <div className="item" id={this.props._id}>
                <h3>{this.props.url}</h3> 
                <p>{this.props.shortUrl}</p>
                {this.renderStat()}
                <div className="item__control">
                    <a href={this.props.shortUrl} target="_blank" className="button button--pill button--link">Visit</a>
                    <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>{this.state.justCopied ? 'Copied' : 'Copy'}</button>
                    <button className="button button--pill" onClick={this.setVisibility.bind(this)}>{this.props.visible ? 'Hide' : 'Show'}</button>
                    <button className="button button--pill" onClick={this.removeLink.bind(this)}>Remove</button>
                </div>
            </div>
        );
    }
}

LinksListItem.propTypes = {
    url: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    visitedCount: PropTypes.number.isRequired,
    lastVisitedAt: PropTypes.number,
    _id: PropTypes.string.isRequired
};
