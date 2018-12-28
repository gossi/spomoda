import SparklesComponent, { tracked } from 'sparkles-component';
import Changeset from 'ember-changeset';
import { service } from '@ember-decorators/service';

interface ModelFormInputGroupArgs {
	model: Changeset<any>;
	errors: any;
	name: string;
	label: string;
	description?: string;
}

export default class ModelFormInputGroupComponent extends SparklesComponent<ModelFormInputGroupArgs> {

	@service intl!;

	@tracked('args')
	get error(): string {
		if (this.args.errors && this.args.errors[this.args.name]) {
			return this.intl.t(`errors.${this.args.errors[this.args.name]}`, {
				field: this.args.label
			});
		}

		return '';
	}

	change(value: any) {
		this.args.model.set(this.args.name, value);
	}
}
