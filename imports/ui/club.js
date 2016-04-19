import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import { Girls } from '../api/girls.js';

import { Clubs } from '../api/clubs.js';

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

})