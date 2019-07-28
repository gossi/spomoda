import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import SessionService from '@spomoda/web/services/session';

export default class ApplicationController extends Controller {
	@service session!: SessionService;

	@action
	login() {
		this.session.authenticate('authenticator:wolkenkit');
	}

	@action
	logout() {
		this.session.invalidate();
	}
}
