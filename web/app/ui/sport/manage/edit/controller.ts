import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import Sport from '@spomoda/web/models/sport';
import Changeset from 'ember-changeset';
import { task } from 'ember-concurrency';
import WolkenkitService from 'ember-wolkenkit/services/wolkenkit';

export default class SportManageEditController extends Controller {
	@service wolkenkit!: WolkenkitService;

	edit = task(function* (this: SportManageEditController, model: Changeset<Sport>) {
		if (!model.isDirty) {
			return;
		}

		yield this.wolkenkit.command('management.sport.edit', 'edited', this.model.id, model.change);
		this.transitionToRoute('sport.manage');

		return true;
	});
}
