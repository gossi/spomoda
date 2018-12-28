import Sport from '@spomoda/client/src/data/models/sport';
import { Task } from 'ember-concurrency/-task-property';
import SparklesComponent from 'sparkles-component';

interface Args {
	sport?: Sport;
	task: Task;
}

export default class SportFormComponent extends SparklesComponent<Args> {

}
