import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import Modal from 'react-modal';

export default class AddLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            url: '',
            isOpen: false
        };
    }
    onSubmit(e) {
        e.preventDefault();
        const url = this.state.url;
        if (url) {
            Meteor.call('links.insert', url, (error, result) => {
                console.log('Link insert result', error, result);
                if (!error) {
                    this.closeModal();
                    Session.set('showVisible', true);
                } else {
                    this.setState({ error: error.reason });
                }
            });
        }
        // this insecure
        // const userId = Meteor.userId();
        // if (url) {
        //     Links.insert({ url , userId});
        //     this.refs.url.value = '';
        // }
    }
    onChange(e) {
        this.setState({
            url: e.target.value.trim()
        });
    }
    closeModal() {
        this.setState({ isOpen: false, error: '', url: '' });
    }
    render() {
        return (
            <div>
                <button className="button" onClick={() => this.setState({ isOpen: true })}>+ Add link</button>
                <Modal isOpen={this.state.isOpen}
                    contentLabel="Add link"
                    onAfterOpen={() => this.refs.url.focus()}
                    onRequestClose={this.closeModal.bind(this)}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal">
                    <h1>Add link</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.onSubmit.bind(this)}  className="boxed-view__form">
                        <input type="text" ref="url" placeholder="URL" value={this.state.url}
                            onChange={this.onChange.bind(this)} />
                        <button  className="button" >Add Link</button>
                        <button type="button" className="button button--secondary" onClick={this.closeModal.bind(this)}>Cancel</button>
                    </form>
                </Modal>
            </div>
        );
    }
}
