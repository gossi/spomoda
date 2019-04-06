import Controller from '@ember/controller';
import { action } from '@ember/object';
import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Session from 'ember-simple-auth/services/session';
import WolkenkitService from 'ember-wolkenkit/src/services/wolkenkit';

export default class ApplicationController extends Controller {
	@service wolkenkit!: WolkenkitService;
	@service session!: Session;

	@reads('wolkenkit.auth')
	auth: any;

	init() {
		super.init();
		console.log('init', this.wolkenkit);
	}

	@action
	login() {
		this.session.authenticate('authenticator:wolkenkit');
	}

	@action
	logout() {
		this.session.invalidate();
	}
}
