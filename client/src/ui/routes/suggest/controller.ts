import { inject as service } from '@ember-decorators/service';
import Controller from '@ember/controller';
import Sport from '@spomoda/client/src/data/models/sport';
import WolkenkitService from '@spomoda/client/src/services/wolkenkit';
import Changeset from 'ember-changeset';
import { dropTask } from 'ember-concurrency-decorators';

export default class SuggestController extends Controller {
	@service wolkenkit!: WolkenkitService;

	@dropTask
	*suggest(model: Changeset<Sport>) {
		if (!model.isDirty) {
			return;
		}

		yield this.wolkenkit.command('management.sport.suggest', 'suggested', model.change);

		return true;
	}

}
