import { service } from '@ember-decorators/service';
import Controller from '@ember/controller';
import Sport from '@spomoda/client/src/data/models/sport';
import WolkenkitService from '@spomoda/client/src/services/wolkenkit';
import { changesetToPayload } from '@spomoda/client/src/utils/payload';
import Changeset from 'ember-changeset';
import { dropTask } from 'ember-concurrency-decorators';

export default class SuggestController extends Controller {
	@service wolkenkit!: WolkenkitService;

	@dropTask
	*suggest(model: Changeset<Sport>) {
		if (!model.isDirty) {
			return;
		}

		try {
			yield this.wolkenkit.command('management.sport.suggest', 'suggested', changesetToPayload(model));
		} catch (e) {
			throw e;
		}

		return true;
	}

}
