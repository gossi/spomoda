import Component from '@glimmer/component';

interface TextGroupArgs {
	label?: string;
	description?: string;
	error?: string;
	type?: string;
	value?: any;
	change: (value: any) => void;
}

export default class TextGroupComponent extends Component<TextGroupArgs> {

}
