import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import WolkenkitService from 'ember-wolkenkit/services/wolkenkit';

export default class SportAddController extends Controller {
	@service wolkenkit!: WolkenkitService;

	add = task(function* () {

	});
}
