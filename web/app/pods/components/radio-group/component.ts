import Component from '@glimmer/component';
import { action } from '@ember/object';

interface RadioGroupArgs {
	value: any;
	change: (value: any) => void;
}

export default class RadioGroupComponent extends Component<RadioGroupArgs> {
	@action
	change(value: any) {
		if (this.args.value !== value && this.args.change) {
			this.args.change(value);
		}
	}
}
