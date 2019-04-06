import { action } from '@ember/object';
import Component from '@glimmer/component';
import { Owner } from '@glimmer/di';
import { tracked } from '@glimmer/tracking';
import Changeset from 'ember-changeset';
import Task from 'ember-concurrency/task';

interface FormArgs {
	task?: Task;
	model: any;
}

export default class FormComponent<T extends object> extends Component<FormArgs> {
	@tracked model: Changeset<T>;

	constructor(owner: Owner, args: FormArgs) {
		super(owner, args);

		this.model = new Changeset(this.args.model || {});
	}

	@action
	rollback() {
		this.model.rollback();
	}

	@action
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
