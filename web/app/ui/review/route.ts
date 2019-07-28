import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { AuthenticatedRoute } from '@spomoda/web/decorators/authenticated-route';
import WolkenkitService from 'ember-wolkenkit/services/wolkenkit';

@AuthenticatedRoute
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
