import Component from '@glimmer/component';

interface CheckboxArgs {
	value: any;
	changed: (value: any) => void;
}

export default class CheckboxComponent extends Component {
	args: CheckboxArgs = this.args;

	change(e: Event) {
		if (e.target && this.args.changed) {
			this.args.changed((e.target as HTMLInputElement).checked);
		}
	}
}
