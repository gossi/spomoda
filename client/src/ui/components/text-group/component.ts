import SparklesComponent from 'sparkles-component';
import { arg } from 'sparkles-decorators';
import { guidFor } from '@ember/object/internals';

interface TextGroupArgs {
	type?: string;
	value?: any;
	changed: (value: any) => void;
}

export default class TextGroupComponent extends SparklesComponent<TextGroupArgs> {
	@arg id: string = guidFor(this);
}
