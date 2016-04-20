import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import { Girls } from '../api/girls.js';

import { Clubs } from '../api/clubs.js';

import { UserGirls } from '../api/usergirls.js';

import { ReactiveDict } from 'meteor/reactive-dict';

import '../startup/accounts-config.js';
 
import './body.html';
 
Template.myclub.helpers({
  myclub(){
  	return Clubs.findOne({owner : Meteor.userId()});
  },
  isOwner(){
    return this.owner === Meteor.userId();
  },
  hasNoClub(){
  	return Clubs.findOne({owner : Meteor.userId()}) === undefined;
  },
  oneGirl(){
  	return Girls.findOne({potential : "96"});
  }
});

Template.myclub.events({
	'submit .new-club'(event){
		event.preventDefault();

		const target = event.target;
    	const clubname = target.clubname.value;
    	const coins = target.coins.value;
    	const location = target.location.value;

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

	'submit .new-member'(event){
		event.preventDefault();

		const target = event.target;
		const id = target.id.value;

		var girl = Girls.findOne({_id : id});

		UserGirls.insert({
			name : girl.name,
	      	image : girl.image,
	        age : girl.age,
	      	height : girl.height,
	      	nickname : girl.nickname,
	      	birthplace : girl.birthplace,
	      	sing : girl.sing,
	      	dance : girl.dance,
	      	act : girl.act,
	      	instrument : girl.instrument,
	      	leadership : girl.leadership,
	      	potential : girl.potential,
	      	temper : girl.temper,
	      	rating : girl.rating,
	      	fans : 0,
	      	salary : 20,
	      	fatigue : 0,
	      	owner : Meteor.userId(),
    		username : Meteor.user().username,
	      	createdAt: new Date(), // current time
		})
		console.log("girl created!")
    	return false;
	}

})