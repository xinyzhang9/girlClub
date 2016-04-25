import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import { Girls } from '../api/girls.js';

import { Staffs } from '../api/staffs.js';

import { Songs } from '../api/songs.js';

import { Contracts } from '../api/contracts.js';

import './body.html';
 
Template.admin.helpers({
  girls() {
    return Girls.find({}, { sort: { createdAt: -1 } });
  },
  
});

Template.admin_staffs.helpers({
	staffs(){
  	return Staffs.find({}, { sort: { createdAt: 1 } });
  },
});

Template.admin_songs.helpers({
	songs(){
  	return Songs.find({}, { sort: { createdAt: 1 } });
  },
})

Template.admin_contracts.helpers({
  contracts(){
    return Contracts.find({}, { sort: { createdAt: 1 } });
  },
})

Template.admin_contracts.events({
  'submit .new-contract'(event){
    event.preventDefault();

    const target = event.target;
    const name = target.name.value;
    const sponsor = target.sponsor.value;
    const coins = target.coins.value;
    const startDay = target.startDay.value; //based on daycount of the Club's created_at
    const dayCount = target.dayCount.value;
    const requiredNum = target.requiredNum.value;
    const songLevel = target.songLevel.value;

    Meteor.call('contracts.insert', name, sponsor, coins, startDay, dayCount, requiredNum, songLevel);

    //clear form
    target.name.value = '';
    target.sponsor.value = '';
    target.coins.value = '';
    target.startDay.val = '';
    target.dayCount.val = '';
    target.requiredNum.val = '';
    target.songLevel.val = '';

    return false;
  },

  'click .deleteContracts'(){
    Meteor.call('contracts.remove', this._id);
  },
})

Template.admin.events({
  'submit .new-girl'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const name = target.name.value;
    const image = target.image.value;
    const age = target.age.value;
    const height = target.height.value;
    const nickname = target.nickname.value;
    const birthplace = target.birthplace.value;
    const sing = target.sing.value;
    const dance = target.dance.value;
    const act = target.act.value;
    const instrument = target.instrument.value;
    const leadership = target.leadership.value;
    const potential = target.potential.value;
    const temper = target.temper.value;
    const rating = target.rating.value;

 
    // Insert a girl into the collection
    Meteor.call('girls.insert', name, image, age, height, nickname, birthplace, 
    	sing, dance, act, instrument, leadership, potential, temper, rating);

    // Clear form
    target.name.value = '';
    target.image.value = '';
    target.age.value = '';
    target.height.value = '';
    target.nickname.value = '';
    target.birthplace.value = '';

    return false;
  },
  'click .delete'(){
  	Meteor.call('girls.remove', this._id);
  },

  'submit .new-staff'(event){
  	// Prevent default browser form submit
    event.preventDefault();

    const target = event.target;
    const name = target.name.value;
    const level = target.level.value;
    const job = target.job.value;
    const salary = target.salary.value;

    Meteor.call('staffs.insert', name, level, job, salary);

    //Clear form
    target.name.value = '';
    target.level.value= '';
    target.job.value = '';
    target.salary.value = '';

    return false;
  },
  'click .deleteStaff'(){
  	Meteor.call('staffs.remove', this._id);
  },

  'submit .new-song'(event){
  	// Prevent default browser form submit
    event.preventDefault();

    const target = event.target;
    const name = target.name.value;
    const tag = target.tag.value;
    const level = target.level.value;
    const cost = target.cost.value;
    const actionPoints = target.actionPoints.value;
    const requiredMember = target.requiredMember.value;
    const minNumber = target.minNumber.value;

    Meteor.call('songs.insert', name, tag, level, cost, actionPoints, requiredMember, minNumber);

    //Clear form
    target.name.value = '';
    target.tag.value = '';
    target.level.value = '';
    target.cost.value = '';
    target.actionPoints.value = '';
    target.requiredMember.value = '';
    target.minNumber.value = '';

    return false;
  },
  'click .deleteSong'(){
  	Meteor.call('songs.remove', this._id);
  },

  

});