import '../imports/ui/body.js';

Router.route('/',{
	template: 'home'
})
Router.route('/admin');

Router.configure({
    layoutTemplate: 'main'
});