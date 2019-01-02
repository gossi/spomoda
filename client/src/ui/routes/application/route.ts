import { service } from '@ember-decorators/service';
import Route from '@ember/routing/route';
import WolkenkitService from '@spomoda/client/src/services/wolkenkit';
import IntlService from 'ember-intl/services/intl';

export default class ApplicationRoute extends Route {
	@service wolkenkit!: WolkenkitService;
	@service intl!: IntlService;

	async beforeModel() {
		await this.wolkenkit.connect();

		this.intl.setLocale('en');
	}
}
