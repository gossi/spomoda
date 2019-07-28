import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import WolkenkitService from 'ember-wolkenkit/services/wolkenkit';

export default class IndexRoute extends Route {
	@service wolkenkit!: WolkenkitService;

	async model() {
		return this.wolkenkit.live('sports', {
			where: {
				approved: true
			},
			orderBy: {
				sortTitle: 'ascending'
			}
		});
	}
}
