import Component from '@glimmer/component';
import { action } from '@ember/object';

interface CheckboxArgs {
	checked: boolean;
	change: (checked: boolean) => void;
}

export default class CheckboxComponent extends Component<CheckboxArgs> {
	@action
	change(e: Event) {
		if (e.target && this.args.change) {
			this.args.change((e.target as HTMLInputElement).checked);
		}
	}
}
