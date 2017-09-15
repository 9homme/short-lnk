import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration'
// import { Accounts } from 'meteor/accounts-base';
// import SimpleSchema from 'simpl-schema';
Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    console.log('This from my custom middleware');
    console.log(req.url);
    const _id = req.url.slice(1);
    console.log(_id);
    const link = Links.findOne({ _id });
    if (link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      Meteor.call('links.trackVisit', _id);
      res.end();
    } else {
      next();
    }

  });
  // Meteor.call('greetUser', (error, result) => {
  //   console.log('Greet user', error, result);
  // });
  // Accounts.validateNewUser((user) => {
  //   console.log('New user going to be created', user);
  //   const email = user.emails[0].address;
  //   try {
  //     new SimpleSchema({
  //       email: {
  //         type: String,
  //         regEx: SimpleSchema.RegEx.Email
  //       }
  //     }).validate({ email });
  //   } catch (e) {
  //     console.log('Email validation error', e);
  //     throw new Meteor.Error(400, e.message);
  //   }
  //   return true;
  // });

  // const petSchema = new SimpleSchema({
  //   name: {
  //     type: String,
  //     min: 1,
  //     max: 200,
  //     optional: true
  //   },
  //   age: {
  //     type: Number,
  //     min: 0
  //   },
  //   contact: {
  //     type: String,
  //     optional: true
  //   }
  // });

  // petSchema.validate({ 
  //   name: 'John' ,
  //   age: 5,
  //   contact: '+66851617550'
  // });


  // const employeeSchema = new SimpleSchema({
  //   name: {
  //     type: String,
  //     min: 1,
  //     max: 200,
  //   },
  //   hourlyWage: {
  //     type: Number,
  //     min: 0
  //   },
  //   email: {
  //     type: String,
  //     regEx: SimpleSchema.RegEx.Email
  //   }
  // });

  //  employeeSchema.validate({ 
  //   name: 'John' ,
  //   hourlyWage: 5,
  //   email: 's@gmail.com'
  // });

});
