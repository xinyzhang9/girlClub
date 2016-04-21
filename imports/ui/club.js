import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import { Girls } from '../api/girls.js';

import { Clubs } from '../api/clubs.js';

import { UserGirls } from '../api/usergirls.js';

import { Staffs } from '../api/staffs.js';

import { ReactiveDict } from 'meteor/reactive-dict';

import '../startup/accounts-config.js';
 
import './body.html';
 
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


Template.scout.helpers({
  	oneGirl(){
  		var array = Girls.find().fetch();
		var d = new Date();
		//today's star
		var s = Math.round(d.getTime()/1000/3600/24);
		console.log(s);
		var index = s % array.length;
		var element = array[index];
  		return element;
  	},
  	oneGirlCost(){
  		var array = Girls.find().fetch();
		var d = new Date();
		//today's star
		var s = Math.round(d.getTime()/1000/3600/24);
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
			Meteor.call('clubs.newMember', array[array.length-1]);
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
		if(dup === 0)
			Meteor.call('clubs.newStaff',staff);
		
	},

})