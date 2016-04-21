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
	      	sing : girl.sing,
	      	dance : girl.dance,
	      	act : girl.act,
	      	instrument : girl.instrument,
	      	leadership : girl.leadership,
	      	potential : girl.potential,
	      	temper : girl.temper,
	      	rating : girl.rating,
	      	fans : 0,
	      	salary : 20,
	      	fatigue : 0,
	      	owner : Meteor.userId(),
    		username : Meteor.user().username,
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
});