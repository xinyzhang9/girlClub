import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import { Girls } from '../api/girls.js';

import { Clubs } from '../api/clubs.js';

import { UserGirls } from '../api/usergirls.js';

import { Staffs } from '../api/staffs.js';

import { Songs } from '../api/songs.js';

import { UserSongs } from '../api/usersongs.js';

import { ReactiveDict } from 'meteor/reactive-dict';

import '../startup/accounts-config.js';
 
import './body.html';

import './content.html';
 
Template.myclub.helpers({
  myclub(){
  	return Clubs.find({owner : Meteor.userId()});
  },
  isOwner(){
    return this.owner === Meteor.userId();
  },
  hasNoClub(){
  	return Clubs.findOne({owner : Meteor.userId()}) === undefined;
  },
  
});

Template.club_staff.helpers({
	staffs(){
  	return Staffs.find({}, { sort: { level: 1 } });
  },
})

Template.club_song.helpers({
	songs(){
  	return Songs.find({}, { sort: { level: 1 } });
  },
})


Template.scout.helpers({
  	oneGirl(){
  		var array = Girls.find().fetch();
		var d = new Date();
		//today's star
		var s = Math.round(d.getTime()/1000/3600/1);
		console.log(s);
		var index = s % array.length;
		var element = array[index];
  		return element;
  	},
  	oneGirlCost(){
  		var array = Girls.find().fetch();
		var d = new Date();
		//today's star
		var s = Math.round(d.getTime()/1000/3600/1);
		console.log(s);
		var index = s % array.length;
		var element = array[index];
  		if(element.rating === "S"){
  			return 100;
  		}else if(element.rating === "A"){
  			return 50;
  		}else if(element.rating === "B"){
  			return 30;
  		}else{
  			return 10;
  		}
  	}
});

Template.scout.events({

})

Template.myclub.events({
	'submit .new-club'(event){
		event.preventDefault();
		const target = event.target;
    	const clubname = target.clubname.value;
    	const coins = target.coins.value;
    	const location = target.location.value;

    	Meteor.call('clubs.insert', clubname,coins,location);
	},

	'click .deleteClub'(){
		Meteor.call('clubs.remove', this._id);
		Meteor.call('usergirls.removeClub');
		Meteor.call('usersongs.removeClub');
	},

	'submit .new-member'(event){
		event.preventDefault();
		const target = event.target;
		const id = target.id.value;
		var girl = Girls.findOne({_id : id});
		console.log(girl.name)

		var array = UserGirls.find({owner : Meteor.userId()}).fetch();

		var dup = 0;
		for(var x in array){
			if(array[x].name === girl.name){
				console.log("can't add duplicate girl!");
				dup = 1;
			}
		}
		if(dup === 0){
			Meteor.call('usergirls.insert',girl);
			var array2 = UserGirls.find({owner : Meteor.userId()}).fetch();
			Meteor.call('clubs.newMember', array2[array2.length-1]);
			//deduct cost from club
			var cost = 0;
			if(girl.rating === "S"){
	  			cost = 100;
	  		}else if(girl.rating === "A"){
	  			cost = 50;
	  		}else if(girl.rating === "B"){
	  			cost = 30;
	  		}else{
	  			cost = 10;
	  		}
			Meteor.call('clubs.cost',cost);
		}
		
	},

	'click .new-staff'(event){
		var staff = Staffs.findOne({_id : this._id});
		var array = Clubs.findOne({owner : Meteor.userId()}).staffs;
		console.log(array);
		var dup = 0;
		for(var x in array){
			if(array[x]._id === this._id){
				console.log("can't add duplicate staff!");
				dup = 1;
			}
		}
		if(dup === 0){
			Meteor.call('clubs.newStaff',staff);
			var cost = staff.salary;
			Meteor.call('clubs.cost',cost);
		}
			
		
	},

	'click .addActionPoints'(event){
		Meteor.call('clubs.addActionPoints');
	},

	'click .addCoins'(event){
		Meteor.call('clubs.addCoins');
	},

	'click .new-song'(event){
		var song = Songs.findOne({_id : this._id});
		var array = UserSongs.find({owner : Meteor.userId()}).fetch();
		console.log(array);
		var dup = 0;
		for(var x in array){
			if(array[x].name === song.name){
				console.log("can't add duplicate song!");
				dup = 1;
			}
		}
		if(dup === 0){
			Meteor.call('usersongs.insert',song);
			var array2 = UserSongs.find({owner : Meteor.userId()}).fetch();
			Meteor.call('clubs.newSong', array2[array2.length-1]);
			//deduct cost from club
			Meteor.call('clubs.cost',song.cost);
		}
	}

})