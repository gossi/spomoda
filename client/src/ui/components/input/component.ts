import SparklesComponent, { tracked } from 'sparkles-component';
import { arg } from 'sparkles-decorators';
import { guidFor } from '@ember/object/internals';

interface InputArgs {
	type?: string;
	value?: any;
	changed: (value: any) => void;
}

export default class InputComponent extends SparklesComponent<InputArgs> {
	@arg type: string = 'text';
	@arg id: string = guidFor(this);

	@tracked label?: string;

	change(e: KeyboardEvent) {
		if (e.target && this.args.changed) {
			this.args.changed((e.target as HTMLInputElement).value);
		}
	}
}
