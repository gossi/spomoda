import { inject as service } from '@ember-decorators/service';
import Controller from '@ember/controller';
import WolkenkitService from '@spomoda/client/src/services/wolkenkit';
import { dropTask } from 'ember-concurrency-decorators';

export default class SportAddController extends Controller {
	@service wolkenkit!: WolkenkitService;

	@dropTask
	*add() {

	}
}
