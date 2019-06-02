import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Session from 'ember-simple-auth/services/session';

export default class ApplicationController extends Controller {
	@service session!: Session;

	@action
	login() {
		this.session.authenticate('authenticator:wolkenkit');
	}

	@action
	logout() {
		this.session.invalidate();
	}
}
