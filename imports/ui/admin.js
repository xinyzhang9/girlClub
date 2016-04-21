import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import { Girls } from '../api/girls.js';

import { Staffs } from '../api/staffs.js';
 
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

});