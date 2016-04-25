import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Contracts = new Mongo.Collection('contracts');

Meteor.methods({
  'contracts.insert'(name, sponsor, coins, startDay, dayCount, requiredNum, songLevel) {
    
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Contracts.insert({
      name,
      sponsor,
      coins,
      startDay,
      dayCount,
      requiredNum,
      songLevel,
      createdAt: new Date(), // current time
    });
  },
  'contracts.remove'(contracts) {
    check(contracts, String);
    Contracts.remove(contracts);
  },
});