import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import Sport from '@spomoda/web/models/sport';
import WolkenkitService from 'ember-wolkenkit/services/wolkenkit';
import Changeset from 'ember-changeset';
import { task } from 'ember-concurrency';
import Task from 'ember-concurrency/task';

export default class SuggestController extends Controller {
	@service wolkenkit!: WolkenkitService;

	@task(function* (this: SuggestController, model: Changeset<Sport>) {
		if (!model.isDirty) {
			return;
		}

		yield this.wolkenkit.command('management.sport.suggest', 'suggested', model.change);

		return true;
	}) suggest!: Task;

}
