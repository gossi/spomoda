import { service } from '@ember-decorators/service';
import Route from '@ember/routing/route';
import WolkenkitService from '@spomoda/client/src/services/wolkenkit';

export default class SportRoute extends Route {
	@service wolkenkit!: WolkenkitService;

	model(params: any) {
		return this.wolkenkit.liveOne('sports', { where: { slug: params.slug } });
	}
}
