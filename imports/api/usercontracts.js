import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const UserContracts = new Mongo.Collection('usercontracts');

Meteor.methods({
  'usercontracts.create'() {
    
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    names = ["Public Show", "Handshake Meeting", "Photograph Appointments","Fans Face-To-Face"];
    sponsors = ["Leshi","East TV","Phoenix TV","Times","Man Magazine"];
    var rand_name = Math.floor(Math.random()*names.length);
    var rand_sponsor = Math.floor(Math.random()*sponsors.length);
    var rand_dayCount = Math.floor(Math.random()*3);
    var rand_Song = Math.floor(Math.random()*4);
 
    UserContracts.insert({
      name : contract.name,
      sponsor : contract.sponsor,
      coins : contract.coins,
      startDay : contract.startDay,
      dayCount : contract.dayCount,
      requiredNum : contract.requiredNum,
      songLevel : contract.songLevel,
      status : 0,
	    owner : Meteor.userId(),
      username : Meteor.user().username,
	    createdAt: new Date(), // current time
		})
		console.log("user contract created!")
    	return false;
  },

  'usercontracts.removeClub'() {
    UserContracts.remove({owner : Meteor.userId()});
  },
});