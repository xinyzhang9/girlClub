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
    	coins : parseInt(coins),
    	location,
    	members : [],
    	staffs: [],
    	buildings : [],
    	contracts : [],
      songs : [],
    	actionPoints : 10,
      daycount : 1,
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

  'clubs.newMember'(girl){
    Clubs.update(
       { owner : Meteor.userId() },
       { $push: { members: girl } }
    )
    console.log("member added");
  },

  'clubs.newStaff'(staff){
    Clubs.update(
       { owner : Meteor.userId() },
       { $push: { staffs: staff } }
    )
    console.log("staff added");
  },

  'clubs.newSong'(song){
    Clubs.update(
       { owner : Meteor.userId() },
       { $push: { songs: song } }
    )
    console.log("song added");
  },

  //temp methods! not logically correct
  'clubs.removeStaff'(staffID){
    Clubs.update(
       { owner : Meteor.userId() },
       { $pop: { staffs: 1 } }
    )
  },
  //temp methods! not logically correct
  'clubs.removeMember'(memberID){
    Clubs.update(
       { owner : Meteor.userId() },
       { $pop: { members: 1 } }
    )
  },

  'clubs.addActionPoints'(){
    Clubs.update(
       { owner : Meteor.userId() },
       { $inc: { actionPoints: 1 } }
    )
  },

  'clubs.addCoins'(){
    Clubs.update(
       { owner : Meteor.userId() },
       { $inc: { coins: 1000 } }
    )
  },

  'clubs.cost'(cost){
    Clubs.update(
       { owner : Meteor.userId() },
       { $inc: { coins: -cost } }
    )
  },

  'clubs.nextday'(){
    Clubs.update(
       { owner : Meteor.userId() },
       { $inc: { daycount: 1 } },
    );
    Clubs.update(
       { owner : Meteor.userId() },
       { $set: { actionPoints: 10 } },
    );
  },
  'clubs.spendActionPoints'(points){
    Clubs.update(
       { owner : Meteor.userId() },
       { $inc: { actionPoints: -points } },
    );
  }




});

