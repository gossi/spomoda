import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import Sport from '@spomoda/web/src/data/models/sport';
import WolkenkitService from '@spomoda/web/src/services/wolkenkit';
import { task } from 'ember-concurrency';
import Task from 'ember-concurrency/task';

export default class SportRoute extends Route {
	@service wolkenkit!: WolkenkitService;

	async model(params: any) {
		const sport = await this.wolkenkit.liveOne('sports', { where: { slug: params.slug } });

		this.load.perform(sport, 'groups', { where: { sportId: sport.id } });
		this.load.perform(sport, 'positions', { where: { sportId: sport.id } });
		this.load.perform(sport, 'instruments', { where: { sportId: sport.id } });
		this.load.perform(sport, 'skills', { where: { sportId: sport.id } });

		return sport;
	}

	@task(function* (this: SportRoute, model: Sport, name: keyof Sport, options: any) {
		const models = yield this.wolkenkit.live(name, options);
		model[name] = models;
	}) load!: Task;
}
