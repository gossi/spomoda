import SparklesComponent from 'sparkles-component';
import { arg } from 'sparkles-decorators';

interface FormBtnArgs {
	type?: string;
	disabled?: boolean;
}

export default class FormBtnComponent extends SparklesComponent<FormBtnArgs> {
	@arg type = 'button';

	@arg disabled = false;
}
