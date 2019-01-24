import { inject as service } from '@ember-decorators/service';
import Route from '@ember/routing/route';
import WolkenkitService from '@spomoda/client/src/services/wolkenkit';

export default class ReviewRoute extends Route {
	@service wolkenkit!: WolkenkitService;

	model() {
		return this.wolkenkit.live('sports', {
			where: {
				approved: false
			}
		});
	}
}
