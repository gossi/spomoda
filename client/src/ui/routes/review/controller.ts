import { service } from '@ember-decorators/service';
import Controller from '@ember/controller';
import WolkenkitService from '@spomoda/client/src/services/wolkenkit';
import { task } from 'ember-concurrency-decorators';

export default class ReviewController extends Controller {
	@service wolkenkit!: WolkenkitService;

	@task
	*approve(id: string) {
		yield this.wolkenkit.command('management.sport.approve', 'approved', id);
	}

	@task
	*reject(id: string) {
		yield this.wolkenkit.command('management.sport.reject', 'rejected', id);
	}
}
