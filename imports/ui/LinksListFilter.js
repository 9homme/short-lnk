import React from 'react';
import { Session } from 'meteor/session';

export default class LinksListFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showVisible: true
        };

        console.log('constructor LinksListFilter: ', this.state);
    }
    componentDidMount() {
        this.checkboxTracker = Tracker.autorun(() => {
            let showVisible = Session.get('showVisible');
            this.setState({ showVisible });
            console.log('Tracker LinksListFilter: ', this.state);
        });
    }
    componentWillUnmount() {
        this.checkboxTracker.stop();
    }
    render() {
        return (
            <div>
                <label className="checkbox">
                    <input className="checkbox__box" type="checkbox" onChange={(e) => {
                        console.log('onChange LinksListFilter: ', this.state);
                        Session.set('showVisible', !e.target.checked);
                    }} checked={!this.state.showVisible} />
                    show hidden links
            </label>
            </div>
        );
    }
}
