import { service } from '@ember-decorators/service';
import Changeset from 'ember-changeset';
import IntlService from 'ember-intl/services/intl';
import SparklesComponent, { tracked } from 'sparkles-component';

interface ModelFormInputGroupArgs {
	model: Changeset<any>;
	errors: any;
	name: string;
	label: string;
	description?: string;
}

export default class ModelFormInputGroupComponent extends SparklesComponent<ModelFormInputGroupArgs> {

	@service intl!: IntlService;

	@tracked('args')
	get error(): string {
		if (this.args.model.error[this.args.name]) {
			return this.intl.t(`errors.${this.args.model.error[this.args.name].validation}`, {
				field: this.args.label
			});
		}

		return '';
	}

	change(value: any) {
		this.args.model.set(this.args.name, value);
	}
}
