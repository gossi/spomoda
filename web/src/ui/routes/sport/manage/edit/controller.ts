import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import Sport from '@spomoda/web/src/data/models/sport';
import WolkenkitService from '@spomoda/web/src/services/wolkenkit';
import Changeset from 'ember-changeset';
import { task } from 'ember-concurrency';
import Task from 'ember-concurrency/task';

export default class SportManageEditController extends Controller {
	@service wolkenkit!: WolkenkitService;

	@task(function* (this: SportManageEditController, model: Changeset<Sport>) {
		if (!model.isDirty) {
			return;
		}

		yield this.wolkenkit.command('management.sport.edit', 'edited', this.model.id, model.change);
		this.transitionToRoute('sport.manage');

		return true;
	}).drop() edit!: Task;
}