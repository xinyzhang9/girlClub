import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import { Girls } from '../api/girls.js';

import { Clubs } from '../api/clubs.js';

import { UserGirls } from '../api/usergirls.js';

import { UserSongs } from '../api/usersongs.js';

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
      "members": UserGirls.find({owner : Meteor.userId()}).fetch(),
      "staffs": Clubs.findOne({owner : Meteor.userId()}).staffs,
      "contracts": Clubs.findOne({owner : Meteor.userId()}).contracts,
      "songs" : UserSongs.find({owner : Meteor.userId()}).fetch(),
      "training" : [],

        
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
  isTraining(){
    return this.contentType === "training";
  },
  freeMembers(){
    return UserGirls.find({$and:[{owner : Meteor.userId()},{busy : 0}]}).fetch();
  },
  membersInSong(){
    //this._id is the song's id
    return UserSongs.findOne({_id : this._id}).members;
  }
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

  'click .joinSong'(event, template){
    var song = template.data.items[1];
    console.log(song);
    var girl = UserGirls.findOne({_id:this._id});
    song.members.push(girl);
    Meteor.call('usersongs.addMember',song._id, girl);
    Meteor.call('usergirls.setBusy',this._id,1);
    console.log(this._id + "joined the song");
  },

  'click .quitSong'(event, template){
    var song = template.data.items[1];
    console.log(template.data);
    var girl = UserGirls.findOne({_id:this._id});
    song.members.push(girl);
    Meteor.call('usersongs.removeMember',song._id, girl);
    Meteor.call('usergirls.setBusy',this._id,0);
    console.log(this._id + "quited the song");
  },
  

})

Template.club_member.events({
  'click .addSing'(event){
    console.log(this._id);
    var club = Clubs.findOne({owner : Meteor.userId()});
    var girl = UserGirls.findOne({_id : this._id});
    if(club.actionPoints >= 1 && girl.fatigue <= 90){
      Meteor.call('usergirls.addSing',this._id,1);
      Meteor.call('usergirls.addFatigue',this._id,10);
      Meteor.call('usergirls.addExp',this._id,5);
      Meteor.call('clubs.spendActionPoints',1);
    }else{
      console.log("not enough actionPoints or the girl is too tired!");
    }
  },
  'click .addDance'(event){
    console.log(this._id);
    var club = Clubs.findOne({owner : Meteor.userId()});
    var girl = UserGirls.findOne({_id : this._id});
    if(club.actionPoints >= 1 && girl.fatigue <= 90){
      Meteor.call('usergirls.addDance',this._id,1);
      Meteor.call('usergirls.addFatigue',this._id,10);
      Meteor.call('usergirls.addExp',this._id,5);
      Meteor.call('clubs.spendActionPoints',1);
    }else{
      console.log("not enough actionPoints or the girl is too tired!");
    }
  },
  'click .addAct'(event){
    console.log(this._id);
    var club = Clubs.findOne({owner : Meteor.userId()});
    var girl = UserGirls.findOne({_id : this._id});
    if(club.actionPoints >= 1 && girl.fatigue <= 90){
      Meteor.call('usergirls.addAct',this._id,1);
      Meteor.call('usergirls.addFatigue',this._id,10);
      Meteor.call('usergirls.addExp',this._id,5);
      Meteor.call('clubs.spendActionPoints',1);
    }else{
      console.log("not enough actionPoints or the girl is too tired!");
    }
  },
  'click .addInstrument'(event){
    console.log(this._id);
    var club = Clubs.findOne({owner : Meteor.userId()});
    var girl = UserGirls.findOne({_id : this._id});
    if(club.actionPoints >= 1 && girl.fatigue <= 90){
      Meteor.call('usergirls.addInstrument',this._id,1);
      Meteor.call('usergirls.addFatigue',this._id,10);
      Meteor.call('usergirls.addExp',this._id,5);
      Meteor.call('clubs.spendActionPoints',1);
    }else{
      console.log("not enough actionPoints or the girl is too tired!");
    }
  },
  'click .reduceFatigue'(event){
    console.log(this._id);
    var club = Clubs.findOne({owner : Meteor.userId()});
    var girl = UserGirls.findOne({_id : this._id});
    if(club.actionPoints >= 1 && girl.fatigue >= 30){
      Meteor.call('usergirls.reduceFatigue',this._id,30);
      Meteor.call('clubs.spendActionPoints',1);
    }else{
      console.log("not enough actionPoints or the girl doesn't need heal!");
    }
  },

})