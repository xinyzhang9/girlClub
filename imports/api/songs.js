import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Songs = new Mongo.Collection('songs');

Meteor.methods({
  'songs.insert'(name, tag, level, cost, actionPoints, requiredMember, minNumber) {
    
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Songs.insert({
			name : name,
      tag : tag,
	    level : level,
	    cost : parseInt(cost),
      actionPoints : actionPoints,
	    requiredMember : requiredMember,
	    minNumber : parseInt(minNumber),
	    createdAt: new Date(), // current time
		})
		console.log("song created!")
    	return false;
  },
  'songs.remove'(songID) {
    check(songID, String);
    Songs.remove(songID);
  },
});