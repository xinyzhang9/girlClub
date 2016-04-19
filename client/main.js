import '../imports/ui/body.js';
import { Girls } from '../imports/api/girls.js';
Router.route('/',{
	name: 'home',
	template: 'home'
})
Router.route('/admin',{
	name: 'admin',
    template: 'admin'
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