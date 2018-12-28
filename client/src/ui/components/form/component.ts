import Changeset from 'ember-changeset';
import { Task } from 'ember-concurrency/-task-property';
import SparklesComponent, { tracked } from 'sparkles-component';

interface FormArgs {
	task?: Task;
	model: any;
}

export default class FormComponent<T> extends SparklesComponent<FormArgs> {

	model: Changeset<T>;
	@tracked errors: any;

	constructor(args: FormArgs) {
		super(args);

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
				this.errors = err;
			});
		}
	}
}
