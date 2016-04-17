import { Template } from 'meteor/templating';

import { Girls } from '../api/girls.js';
 
import './body.html';
 
Template.body.helpers({
  girls() {
    return Girls.find({});
  },
});

Template.body.events({
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

 
    // Insert a task into the collection
    Girls.insert({
      name,
      image,
      age,
      height,
      nickname,
      birthplace,
      sing,
      dance,
      act,
      instrument,
      leadership,
      potential,
      temper,
      rating,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    target.text.value = '';

  },
});