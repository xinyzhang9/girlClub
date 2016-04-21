import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Staffs = new Mongo.Collection('staffs');

Meteor.methods({
  'staffs.insert'(name, level, job, salary) {
    
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Staffs.insert({
			name : name,
	      	level : level,
	      	job : job,
	        salary : salary,
	      	owner : Meteor.userId(),
    		username : Meteor.user().username,
	      	createdAt: new Date(), // current time
		})
		console.log("staff created!")
    	return false;
  },
  'staffs.remove'(staffID) {
    check(staffID, String);
    Staffs.remove(staffID);
  },
});