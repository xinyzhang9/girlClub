import '../imports/ui/admin.js';
import '../imports/ui/club.js';
import { Girls } from '../imports/api/girls.js';
import { Clubs } from '../imports/api/clubs.js';
import '../imports/startup/accounts-config.js';
Router.route('/',{
	name: 'home',
	template: 'home'
});

Router.route('/admin',{
	name: 'admin',
    template: 'admin'
});

Router.route('/myclub',{
	name : 'myclub',
	template: 'myclub',
    
});

Router.configure({
    layoutTemplate: 'main'
});

Router.route('/member/:_id', {
    template: 'memberProfile',
    data: function(){
        var member_id = this.params._id;
        return Girls.findOne({ _id : member_id });
    }
});