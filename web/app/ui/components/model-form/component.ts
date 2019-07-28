import Component from '@glimmer/component';
import Task from 'ember-concurrency/task';

interface ModelFormArgs {
	model: any;
	task: Task;
}

export default class ModelFormComponent extends Component<ModelFormArgs> {
}
