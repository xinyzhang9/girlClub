import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import { Girls } from '../api/girls.js';

import { ReactiveDict } from 'meteor/reactive-dict';
 
import './body.html';
 
Template.myclub.helpers({
  girls() {
    return Girls.find({}, { sort: { createdAt: -1 } });
  },
});