import { guidFor } from '@ember/object/internals';
import SparklesComponent from 'sparkles-component';
import { arg } from 'sparkles-decorators';

interface FormGroupArgs {
	label?: string;
	description?: string;
	error?: string;
	id?: string;
}

export default class FormGroupComponent extends SparklesComponent<FormGroupArgs> {
	@arg id: string = guidFor(this);
}
