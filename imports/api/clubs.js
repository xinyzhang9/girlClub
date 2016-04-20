import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Clubs = new Mongo.Collection('clubs');

Meteor.methods({
  'clubs.insert'(clubname, coins, location) {  
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Clubs.insert({
    	clubname,
    	coins,
    	location,
    	members : [],
    	staffs: [],
    	buildings : [],
    	contracts : [],
    	actionPoints : 10,
    	owner : Meteor.userId(),
    	username : Meteor.user().username,
    	createdAt : new Date(),
    })
    console.log("club created!")
    return false;
  },

  'clubs.remove'(clubID) {
    check(clubID, String);
    Clubs.remove(clubID);
  },
});

