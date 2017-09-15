
import React from 'react';
import { withRouter } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';

import NotFound from '../ui/NotFound';
import Signup from '../ui/Signup';
import Link from '../ui/Link';
import Login from '../ui/Login';
import App from '../ui/App';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/link'];

export default class MainRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <App />
                    <Switch>
                        <Route exact path="/" render={() => (
                            Meteor.userId() ? (
                                <Redirect to="/link" />
                            ) : (
                                    <Login />
                                )
                        )} />
                        <Route exact path="/signup" render={() => (
                            Meteor.userId() ? (
                                <Redirect to="/link" />
                            ) : (
                                    <Signup />
                                )
                        )} />
                        <Route exact path="/link" render={() => (
                            Meteor.userId() ? (
                                <Link />
                            ) : (
                                    <Redirect to="/" />
                                )
                        )} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

