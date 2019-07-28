import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

interface InputArgs {
	id?: string;
	value?: any;
	change: (value: any) => void;
}

export default class TextComponent extends Component<InputArgs> {

	get id(): string {
		return this.args.id || guidFor(this);
	}

	@action
	change(e: KeyboardEvent) {
		if (e.target && this.args.change) {
			this.args.change((e.target as HTMLInputElement).value);
		}
	}
}
