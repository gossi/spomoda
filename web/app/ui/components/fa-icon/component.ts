import FaIcon from '@fortawesome/ember-fontawesome/components/fa-icon';
import layout from '@fortawesome/ember-fontawesome/templates/components/fa-icon';
import { alias } from '@ember/object/computed';

export default class FaIco extends FaIcon {
	layout = layout;

	@alias('fixedWidth') fw!: boolean;
}
