import SparklesComponent from 'sparkles-component';
import { arg } from 'sparkles-decorators';
import { guidFor } from '@ember/object/internals';

interface InputArgs {
	type?: string;
	value?: any;
	changed: (value: any) => void;
}

export default class InputComponent extends SparklesComponent<InputArgs> {
	@arg id: string = guidFor(this);
}
