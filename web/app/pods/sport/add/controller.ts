import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import Task from 'ember-concurrency/task';
import WolkenkitService from 'ember-wolkenkit/services/wolkenkit';

export default class SportAddController extends Controller {
	@service wolkenkit!: WolkenkitService;

	@task(function* () {

	}).drop() add!: Task;
}
