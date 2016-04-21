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
  	return Clubs.find({owner : Meteor.userId()});
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

		Meteor.call('usergirl.insert',girl);
		
	},

})