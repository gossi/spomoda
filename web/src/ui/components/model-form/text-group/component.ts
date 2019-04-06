import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import Changeset from 'ember-changeset';
import IntlService from 'ember-intl/services/intl';
import { action } from '@ember/object';

interface ModelFormTextGroupArgs {
	model: Changeset<any>;
	errors: any;
	name: string;
	label: string;
	description?: string;
}

export default class ModelFormTextGroupComponent extends Component<ModelFormTextGroupArgs> {

	@service intl!: IntlService;

	get error(): string {
		if (this.args.model.error[this.args.name]) {
			return this.intl.t(`errors.${this.args.model.error[this.args.name].validation}`, {
				field: this.args.label
			});
		}

		return '';
	}

	@action
	change(value: any) {
		if (value === '' && !this.args.model.data[this.args.name]) {
			// that is to trigger changeset to delete empty keys (bc that is no
			// change then)
			value = undefined;
		}
		this.args.model.set(this.args.name, value);
	}
}
