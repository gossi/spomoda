import SparklesComponent from 'sparkles-component';
import Task from 'ember-concurrency/task';

interface ModelFormArgs {
	model: any;
	task: Task;
}
export default class ModelFormComponent extends SparklesComponent<ModelFormArgs> {

}
