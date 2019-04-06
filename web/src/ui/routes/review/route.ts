import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { authenticatedRoute } from '@spomoda/web/src/decorators/authenticated-route';
import WolkenkitService from '@spomoda/web/src/services/wolkenkit';

@authenticatedRoute
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