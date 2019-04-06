import Component from '@glimmer/component';

interface RadioGroupArgs {
	value: any;
	changed: (value: any) => void;
}

export default class RadioGroupComponent extends Component {
	args: RadioGroupArgs = this.args;

	change(value: any) {
		if (this.args.value !== value && this.args.changed) {
			this.args.changed(value);
		}
	}
}
