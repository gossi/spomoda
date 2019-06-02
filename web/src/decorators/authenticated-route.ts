import { getOwner } from '@ember/application';
import Configuration from 'ember-simple-auth/configuration';
import Transition from '@ember/routing/-private/transition';

export function AuthenticatedRoute(route: Function) {
	let hasBeforeModel = false;
	const symbolBeforeModel = Symbol('beforeModel');
	if (route.prototype.beforeModel) {
		route.prototype[symbolBeforeModel] = route.prototype.beforeModel;
		hasBeforeModel = true;
	}

	route.prototype.beforeModel = function (transition: Transition) {
		const owner = getOwner(this);
		const session = owner.lookup('service:session');
		const router = owner.lookup('service:router') || owner.lookup('router:main');

		// route away when logged out
		session.on('invalidationSucceeded', () => {
			router.transitionTo(Configuration.authenticationRoute);
		});

		if (!session.isAuthenticated) {
			session.attemptedTransition = transition;
			router.transitionTo(Configuration.authenticationRoute);
		}

		if (hasBeforeModel) {
			this[symbolBeforeModel](this);
		}
	}

}
