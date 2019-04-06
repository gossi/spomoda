import { getOwner } from '@ember/application';
import Configuration from 'ember-simple-auth/configuration';

export function authenticatedRoute(route: Function) {
	let hasBeforeModel = false;
	const symbolBeforeModel = Symbol('beforeModel');
	if (route.prototype.beforeModel) {
		route.prototype[symbolBeforeModel] = route.prototype.beforeModel;
		hasBeforeModel = true;
	}

	route.prototype.beforeModel = function () {
		const owner = getOwner(this);
		const session = owner.lookup('service:session');
		const router = owner.lookup('service:router') || owner.lookup('router:main');

		if (!session.isAuthenticated) {
			router.transitionTo(Configuration.authenticationRoute);
		}

		session.on('invalidationSucceeded', () => {
			router.transitionTo(Configuration.authenticationRoute);
		});

		if (hasBeforeModel) {
			this[symbolBeforeModel](this);
		}
	}

}
