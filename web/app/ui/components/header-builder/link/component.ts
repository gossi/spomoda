import Component from '@glimmer/component';
import { action } from '@ember/object';
import styles from '../segment/item/styles';

export default class HeaderBuilderLinkComponent extends Component {
	@action
	transition(transition: Function, event?: Event) {
		this.closeMenu();
		transition();

		if (event) {
			event.preventDefault();
		}
	}

	@action
	replace(replace: Function) {
		this.closeMenu();
		replace();
	}

	/**
	 * When a link on a menu is clicked, the mouse is still hovering the menu.
	 * CSS reacts on the `:hover` state to show the menu when there is a pointer
	 * device available. However, because of the constant hovering, the menu will
	 * not disappear when a link is clicked.
	 *
	 * This method is here is one piece (of two) to make the menu disappear. This
	 * part will look for the respective item and will disable pointer-events. By
	 * that the the `:hover` state from CSS is deactivated and the menu disappears.
	 *
	 * The second piece is to restore pointer events on `mouseleave`.
	 *
	 * @see PageHeaderSegmentLinkComponent.restorePointerEvents
	 */
	private closeMenu() {
		// here comes the hackers:
		if (document.activeElement) {
			let item: HTMLElement = document.activeElement as HTMLElement;

			while (!item.classList.contains(`${styles.item}`) && item.parentElement) {
				item = item.parentElement;
			}

			if (item && item.classList.contains(`${styles.item}`)) {
				item.style.pointerEvents = 'none';
			}
		}
	}
}
