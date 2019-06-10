import Component from '@glimmer/component';

interface TextfieldGroupArgs {
	label?: string;
	description?: string;
	error?: string;
	type?: string;
	value?: any;
	changed: (value: any) => void;
}

export default class TextfieldGroupComponent extends Component<TextfieldGroupArgs> {

}
