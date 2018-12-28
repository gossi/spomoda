import SparklesComponent from 'sparkles-component';

interface CheckboxArgs {
	value: any;
	changed: (value: any) => void;
}

export default class CheckboxComponent extends SparklesComponent<CheckboxArgs> {
	change(e: Event) {
		if (e.target && this.args.changed) {
			this.args.changed((e.target as HTMLInputElement).checked);
		}
	}
}
