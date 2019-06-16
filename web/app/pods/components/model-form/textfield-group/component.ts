import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { Changeset } from '@spomoda/web/utils/changeset';
import IntlService from 'ember-intl/services/intl';

interface ModelFormTextfieldGroupArgs {
	model: Changeset<any>;
	errors: any;
	name: string;
	label: string;
	description?: string;
}

export default class ModelFormTextareaGroupComponent extends Component<ModelFormTextfieldGroupArgs> {
	@service intl!: IntlService;

	get error(): string {
		if (this.args.model.errored[this.args.name]) {
			return this.intl.t(`errors.${this.args.model.errored[this.args.name]!.messages[0]}`, {
				field: this.args.label
			});
		}

		return '';
	}

	get value(): string {
		return this.args.model[this.args.name];
	}

	@action
	change(value: any) {
		this.args.model.set(this.args.name, value);
	}
}
