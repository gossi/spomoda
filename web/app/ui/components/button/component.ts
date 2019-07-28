import Component from '@glimmer/component';
import { action } from '@ember/object';

interface ButtonArgs {
	action?: () => void;
}

export default class ButtonComponent extends Component<ButtonArgs> {

	@action
	handleKeyDown(e: KeyboardEvent) {
		if (e.key === ' ' && this.args.action) {
			this.args.action();
		}
	}

	@action
	handleClick() {
		if (this.args.action) {
			this.args.action();
		}
	}
}
