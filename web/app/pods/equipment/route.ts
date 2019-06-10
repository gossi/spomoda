import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import WolkenkitService from 'ember-wolkenkit/services/wolkenkit';

export default class HumanRoute extends Route {
	@service wolkenkit!: WolkenkitService;

	async model() {
		return {
			instruments: await this.wolkenkit.live('instruments')
		};
	}
}
