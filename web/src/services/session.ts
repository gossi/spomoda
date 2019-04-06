import Session from 'ember-simple-auth/services/session';
import { inject as service } from '@ember/service';
import WokkenkitService from 'ember-wolkenkit/src/services/wolkenkit';

export default class SessionService extends Session {
	@service wolkenkit!: WokkenkitService;

	init() {
		super.init();

		// workaround, until wolkenkit v4.0
		this.session.authenticator = 'authenticator:wolkenkit';
		this.session._updateStore();
		this.session.restore();
	}

	get profile(): object {
		if (this.isAuthenticated) {
			return this.wolkenkit.auth.getProfile();
		}

		return {};
	}
}
