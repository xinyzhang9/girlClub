import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const UserSongs = new Mongo.Collection('usersongs');

Meteor.methods({
  'usersongs.insert'(song) {
    
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    UserSongs.insert({
    		original_id : song._id,
			name : song.name,
	      	tag : song.tag,
	      	level : song.level,
	      	cost : song.cost,
	      	curPoints : 0, //current actionPoints
	      	actionPoints : song.actionPoints,
	      	requiredMember : song.requiredMember,
	      	minNumber : song.minNumber,
	      	center : null, //center singer
	      	members : [], //singers
	      	owner : Meteor.userId(),
    		username : Meteor.user().username,
	      	createdAt: new Date(), // current time
		})
		console.log("girl created!")
    	return false;
  },

  'usersongs.removeClub'() {
    UserSongs.remove({owner : Meteor.userId()});
  },
});