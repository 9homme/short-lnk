import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import MainRouter from '../imports/route/MainRouter';
import '../imports/startup/simple-schema-configuration'

Meteor.startup(() => {
  // Meteor.call('addNumber', 3, 5, (error, result) => {
  //   console.log('Add number result', error, result);
  // });
  console.log('Set show visible',true);
  Session.set('showVisible', true);
  ReactDOM.render((
    <MainRouter />
  ), document.getElementById('app'));
});

