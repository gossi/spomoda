import SparklesComponent from 'sparkles-component';

interface RadioGroupArgs {
	value: any;
	changed: (value: any) => void;
}

export default class RadioGroupComponent extends SparklesComponent<RadioGroupArgs> {
	change(value: any) {
		if (this.args.changed) {
			this.args.changed(value);
		}
	}
}
