import { service } from '@ember-decorators/service';
import Route from '@ember/routing/route';
import WolkenkitService from '@spomoda/client/src/services/wolkenkit';

export default class IndexRoute extends Route {
	@service wolkenkit!: WolkenkitService;

	async model(params: any) {
		const sports = await this.wolkenkit.read('sports', {
			where: {
				slug: params.slug
			}
		});
		return sports[0];
	}
}
