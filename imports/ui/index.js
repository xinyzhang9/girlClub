import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import { Girls } from '../api/girls.js';

import { Clubs } from '../api/clubs.js';

import { UserGirls } from '../api/usergirls.js';

import { ReactiveVar } from 'meteor/reactive-var'
 
import './body.html';

import './content.html';

Template.index.onCreated( function() {
  this.currentTab = new ReactiveVar( "members" );
});

Template.index.helpers({
  tab: function() {
    return Template.instance().currentTab.get();
  },
  tabData: function() {
    var tab = Template.instance().currentTab.get();

    var data = {
      "members": Clubs.findOne({owner : Meteor.userId()}).members,
      "staffs": Clubs.findOne({owner : Meteor.userId()}).staffs,
      "contracts": Clubs.findOne({owner : Meteor.userId()}).contracts,
      "songs" : [{"name" : "Summer Sounds Good!"},
                {"name" : "Give Me Five!"}],

        
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

Template.content.helpers({
  isMembers(){
    return this.contentType === "members";
  },
  isStaffs(){
    return this.contentType === "staffs";
  },
  isContracts(){
    return this.contentType === "contracts";
  },
  isSongs(){
    return this.contentType === "songs";
  },
});

Template.content.events({
  'click .releaseStaff'(event){
    Meteor.call('clubs.removeStaff', this._id);

  },
  'submit .releaseMember'(event){
    event.preventDefault();
    const target = event.target;
    const id = target.id.value;
    const name = target.name.value;
    Meteor.call('clubs.removeMember', id);
    console.log(this._id);
    Meteor.call('usergirls.remove', name);
  },

})