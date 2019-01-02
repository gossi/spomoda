import SparklesComponent, { tracked } from 'sparkles-component';
import { arg } from 'sparkles-decorators';
import { guidFor } from '@ember/object/internals';

interface TextareaArgs {
	value?: any;
	changed: (value: any) => void;
}

export default class TextareaComponent extends SparklesComponent<TextareaArgs> {
	@arg id: string = guidFor(this);

	@tracked label?: string;

	change(e: KeyboardEvent) {
		if (e.target && this.args.changed) {
			this.args.changed((e.target as HTMLInputElement).value);
		}
	}
}
