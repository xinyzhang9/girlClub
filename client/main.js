import '../imports/ui/admin.js';
import '../imports/ui/club.js';
import '../imports/ui/index.js';
import { Girls } from '../imports/api/girls.js';
import { UserGirls } from '../imports/api/usergirls.js';
import { Clubs } from '../imports/api/clubs.js';
import { Staffs } from '../imports/api/staffs.js';
import { Songs } from '../imports/api/songs.js';
import { UserSongs } from '../imports/api/usersongs.js';
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

Router.route('/usermember/:_id', {
    template: 'memberProfile',
    data: function(){
        var member_id = this.params._id;
        return UserGirls.findOne({ _id : member_id });
    }
});