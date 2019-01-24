import { computed } from '@ember-decorators/object';
import { reads } from '@ember-decorators/object/computed';
import { inject as service } from '@ember-decorators/service';
import Controller from '@ember/controller';
import WolkenkitService from '@spomoda/client/src/services/wolkenkit';

export default class ApplicationController extends Controller {
	@service wolkenkit!: WolkenkitService;

	@reads('wolkenkit.auth')
	auth: any;

	@computed('auth')
	get loggedIn(): boolean {
		return this.auth.isLoggedIn();
	}

	@computed('loggedIn')
	get profile(): any {
		return this.auth.getProfile();
	}

	login() {
		this.auth.login();
	}
}
