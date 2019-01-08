import Changeset from 'ember-changeset';
import Task from 'ember-concurrency/task';
import SparklesComponent, { tracked } from 'sparkles-component';

interface FormArgs {
	task?: Task;
	model: any;
}

export default class FormComponent<T extends object> extends SparklesComponent<FormArgs> {

	@tracked model: Changeset<T>;
	last: any;

	constructor(args: FormArgs) {
		super(args);

		this.last = this.args.model;
		this.model = new Changeset(this.args.model || {});
	}

	rollback() {
		this.model.rollback();
	}

	submit(e: Event) {
		e.preventDefault();

		if (this.args.task) {
			const task = this.args.task.perform(this.model);
			task.catch((err: any) => {
				for (let [key, value] of Object.entries(err)) {
					this.model.addError(key, value);
				}
			});
		}
	}
}
