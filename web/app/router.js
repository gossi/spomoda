import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
	location: config.locationType,
	rootURL: config.rootURL
});

Router.map(function () {
	this.route('login');
	this.route('suggest');
	this.route('review');
	this.route('human');
	this.route('equipment');
	this.route('sport', { path: '/:slug' }, function() {
		this.route('manage', function () {
			this.route('edit');
		});
		this.route('add');
	});
});

export default Router;
