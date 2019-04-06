import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import WolkenkitService from '@spomoda/web/src/services/wolkenkit';
import { task } from 'ember-concurrency';
import Task from 'ember-concurrency/task';

export default class SportAddController extends Controller {
	@service wolkenkit!: WolkenkitService;

	@task(function* () {

	}).drop() add!: Task;
}
