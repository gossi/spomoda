import RadioGroupComponent from '@spomoda/web/src/ui/components/radio-group/component';
import Component from '@glimmer/component';

interface RadioArgs {
	value: any;
	group: RadioGroupComponent;
}

export default class RadioGroupOptionComponent extends Component {
	args: RadioArgs = this.args;

	change() {
		this.args.group.change(this.args.value);
	}
}
