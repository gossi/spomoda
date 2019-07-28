import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Sport from '@spomoda/web/models/sport';
import { task } from 'ember-concurrency';
import WolkenkitService from 'ember-wolkenkit/services/wolkenkit';

export default class SportRoute extends Route {
	@service wolkenkit!: WolkenkitService;

	async model(params: any) {
		const sport = await this.wolkenkit.liveOne('sports', { where: { slug: params.slug } });

		this.load.perform(sport, 'groups', { where: { sportId: sport.id } });
		// this.load.perform(sport, 'positions', { where: { sportId: sport.id } });
		// this.load.perform(sport, 'instruments', { where: { sportId: sport.id } });
		this.load.perform(sport, 'skills', { where: { id: sport.skillIds } });

		return sport;
	}

	load = task(function* (this: SportRoute, model: Sport, name: keyof Sport, options: any) {
		const models = yield this.wolkenkit.live(name, options);
		model[name] = models;
	});
}
