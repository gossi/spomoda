import Controller from '@ember/controller';
import { dropTask } from 'ember-concurrency-decorators';

export default class SportAddController extends Controller {

	@dropTask
	*add() {

	}
}
