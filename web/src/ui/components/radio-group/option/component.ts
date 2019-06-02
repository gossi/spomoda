import Component from '@glimmer/component';
import RadioGroupComponent from '@spomoda/web/src/ui/components/radio-group/component';

interface RadioGroupOptionArgs {
	value: any;
	group: RadioGroupComponent;
}

export default class RadioGroupOptionComponent extends Component<RadioGroupOptionArgs> {}
