import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import Task from 'ember-concurrency/task';
import WolkenkitService from 'ember-wolkenkit/services/wolkenkit';

export default class ReviewController extends Controller {
	@service wolkenkit!: WolkenkitService;

	@task(function* (this: ReviewController, id: string) {
		yield this.wolkenkit.command('management.sport.approve', 'approved', id);
	}) approve!: Task;

	@task(function* (this: ReviewController, id: string) {
		yield this.wolkenkit.command('management.sport.reject', 'rejected', id);
	}) reject!: Task;
}
