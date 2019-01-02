import { service } from '@ember-decorators/service';
import Controller from '@ember/controller';
import Sport from '@spomoda/client/src/data/models/sport';
import WolkenkitService from '@spomoda/client/src/services/wolkenkit';
import Changeset from 'ember-changeset';
import { dropTask } from 'ember-concurrency-decorators';

export default class SportManageEditController extends Controller {
	@service wolkenkit!: WolkenkitService;

	@dropTask
	*edit(model: Changeset<Sport>) {
		if (!model.isDirty) {
			return;
		}

		yield this.wolkenkit.command('management.sport.edit', 'edited', this.model.id, model.change);
		this.transitionToRoute('sport.manage');

		return true;
	}
}
