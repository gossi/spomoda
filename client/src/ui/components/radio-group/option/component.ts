import RadioGroupComponent from '@spomoda/client/src/ui/components/radio-group/component';
import SparklesComponent from 'sparkles-component';

interface RadioArgs {
	value: any;
	group: RadioGroupComponent;
}

export default class RadioGroupOptionComponent extends SparklesComponent<RadioArgs> {
	change() {
		this.args.group.change(this.args.value);
	}
}
