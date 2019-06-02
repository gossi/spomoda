import { inject as service } from '@ember/service';
import Session from 'ember-simple-auth/services/session';
import WolkenkitService from 'ember-wolkenkit/src/services/wolkenkit';

export default class SessionService extends Session {
	@service wolkenkit!: WolkenkitService;

	async init() {
		super.init();

		// workaround, until wolkenkit v4.0
		this.session.authenticator = 'authenticator:wolkenkit';
		this.session._updateStore();
		await this.session.restore();

		// retry an attempated transition
		if (this.attemptedTransition) {
			this.attemptedTransition.retry();
			this.attemptedTransition = null;
		}
	}

	get profile(): object {
		if (this.isAuthenticated) {
			return this.wolkenkit.auth.getProfile();
		}

		return {};
	}
}
