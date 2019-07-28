import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

interface FormGroupArgs {
	label?: string;
	description?: string;
	error?: string;
	id?: string;
}

export default class FormGroupComponent extends Component<FormGroupArgs> {
	get id(): string {
		return this.args.id || guidFor(this);
	}
}
