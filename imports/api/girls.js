import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Girls = new Mongo.Collection('girls');

Meteor.methods({
  'girls.insert'(name,image,age,height,nickname,birthplace,
  	sing,dance,act,instrument,leadership,potential,temper,rating) {
    
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Girls.insert({
      name,
      image,
      age,
      height,
      nickname,
      birthplace,
      sing,
      dance,
      act,
      instrument,
      leadership,
      potential,
      temper,
      rating,
      fans : 0,
      createdAt: new Date(), // current time
    });
  },
  'girls.remove'(girlID) {
    check(girlID, String);
    Girls.remove(girlID);
  },
});