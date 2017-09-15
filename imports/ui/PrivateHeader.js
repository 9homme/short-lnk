import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

const PrivateHeader = (props) => {
    return (
        <div className="titlebar">
            <div className="titlebar__wrapper">
                <h1 className="titlebar__title">{props.title}</h1>
                <button className="button button--link-text" onClick={() => Accounts.logout()}>Logout</button>
            </div>
        </div>
    );
};

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
};

export default PrivateHeader;