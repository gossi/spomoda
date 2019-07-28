import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import WolkenkitService from 'ember-wolkenkit/services/wolkenkit';

export default class ReviewController extends Controller {
	@service wolkenkit!: WolkenkitService;

	approve = task(function* (this: ReviewController, id: string) {
		yield this.wolkenkit.command('management.sport.approve', 'approved', id);
	});

	reject = task(function* (this: ReviewController, id: string) {
		yield this.wolkenkit.command('management.sport.reject', 'rejected', id);
	});
}
