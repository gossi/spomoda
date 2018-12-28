import Route from '@ember/routing/route';
import WolkenkitService from '@spomoda/client/src/services/wolkenkit';
import { service } from '@ember-decorators/service';

export default class ApplicationRoute extends Route {
	@service wolkenkit!: WolkenkitService;
	@service intl!;

	async beforeModel() {
		await this.wolkenkit.connect();

		this.intl.setLocale('en');
	}
}
