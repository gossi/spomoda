import { action } from '@ember/object';
import Component from '@glimmer/component';
import { Owner } from '@glimmer/di';
import { tracked } from '@glimmer/tracking';
import Task from 'ember-concurrency/task';
import { changeset, Changeset } from '@spomoda/web/utils/changeset';

interface FormArgs {
	task?: Task;
	model: any;
}

export default class FormComponent extends Component<FormArgs> {
	@tracked model: Changeset<any>;

	constructor(owner: Owner, args: FormArgs) {
		super(owner, args);

		// this.model = new Changeset(this.args.model || {});
		this.model = changeset(this.args.model || {});
	}

	@action
	update(_element: HTMLFormElement, [model]: [any]) {
		this.model = changeset(model);
	}

	@action
	rollback() {
		this.model.rollback();
	}

	@action
	reset(e: Event) {
		e.preventDefault();
		this.rollback();
	}

	@action
	submit(e: Event) {
		e.preventDefault();

		if (this.args.task) {
			const task = this.args.task.perform(this.model);
			task.catch((err: any) => {
				for (let [key, value] of Object.entries(err)) {
					this.model.addError(key, value as string);
				}
			});
		}
	}
}
