import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import { Girls } from '../api/girls.js';

import { Clubs } from '../api/clubs.js';

import { UserGirls } from '../api/usergirls.js';

import { ReactiveVar } from 'meteor/reactive-var'
 
import './body.html';

import './content.html';

Template.index.onCreated( function() {
  this.currentTab = new ReactiveVar( "books" );
});

Template.index.helpers({
  tab: function() {
    return Template.instance().currentTab.get();
  },
  tabData: function() {
    var tab = Template.instance().currentTab.get();

    var data = {
      "books": Girls.find(),
      "movies": [],
      "games": [
        { "name": "Grand Theft Auto V", "creator": "Rockstar Games" },
        
      ]
    };

    return { contentType: tab, items: data[ tab ] };
  }
});

Template.index.events({
  'click .nav-pills li': function( event, template ) {
    var currentTab = $( event.target ).closest( "li" );

    currentTab.addClass( "active" );
    $( ".nav-pills li" ).not( currentTab ).removeClass( "active" );

    template.currentTab.set( currentTab.data( "template" ) );
  }
});