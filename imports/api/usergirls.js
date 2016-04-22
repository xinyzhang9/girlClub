import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const UserGirls = new Mongo.Collection('usergirls');

Meteor.methods({
  'usergirls.insert'(girl) {
    
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    UserGirls.insert({
    		original_id : girl._id,
			name : girl.name,
	      	image : girl.image,
	        age : girl.age,
	      	height : girl.height,
	      	nickname : girl.nickname,
	      	birthplace : girl.birthplace,
	      	sing : parseInt(girl.sing),
	      	dance : parseInt(girl.dance),
	      	act : parseInt(girl.act),
	      	instrument : parseInt(girl.instrument),
	      	leadership : parseInt(girl.leadership),
	      	potential : parseInt(girl.potential),
	      	temper : parseInt(girl.temper),
	      	rating : girl.rating,
	      	fans : 0,
	      	salary : 20,
	      	fatigue : 0,
	      	busy : 0, //0 means free, 10 means not free in next 10 days
	      	owner : Meteor.userId(),
    		username : Meteor.user().username,
    		exp : 0,
    		level : 1,
    		role : "member",
	      	createdAt: new Date(), // current time
		})
		console.log("girl created!")
    	return false;
  },
  'usergirls.remove'(name) {
    UserGirls.remove({$and:[{owner : Meteor.userId()},{name : name}]});
  },
  'usergirls.removeClub'() {
    UserGirls.remove({owner : Meteor.userId()});
  },
  'usergirls.addFatigue'(id,val){
  	UserGirls.update(
       { _id : id },
       { $inc: { fatigue: val } },
    );
  },
  'usergirls.addSing'(id,val){
  	UserGirls.update(
       { _id : id },
       { $inc: { sing: val } },
    );
  },
  'usergirls.addDance'(id,val){
  	UserGirls.update(
       { _id : id },
       { $inc: { dance: val } },
    );
  },
  'usergirls.addAct'(id,val){
  	UserGirls.update(
       { _id : id },
       { $inc: { act: val } },
    );
  },
  'usergirls.addInstrument'(id,val){
  	UserGirls.update(
       { _id : id },
       { $inc: { instrument: val } },
    );
  },
});