import { service } from '@ember-decorators/service';
import Route from '@ember/routing/route';
import WolkenkitService from '@spomoda/client/src/services/wolkenkit';

export default class IndexRoute extends Route {
	@service wolkenkit!: WolkenkitService;

	async model() {
		return await this.wolkenkit.live('sports', {
			where: {
				approved: true
			},
			orderBy: {
				sortTitle: 'ascending'
			}
		});
	}
}
