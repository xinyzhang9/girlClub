import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.body.helpers({
	girls : [
		{name : "Liu Jiongran"},
		{name : "Huang Tingting"},
	]
});

