import Component from '@glimmer/component';
import { action } from '@ember/object';
import styles from '../segment/item/styles';

export default class PageHeaderLinkComponent extends Component {

  @action
  transition(transition: Function) {
    // unfocus current active element to "close" eventual open menus
    console.log('active elem', document.activeElement, document.querySelectorAll(`.${styles.item}`));

    for (const elem of Array.from(document.querySelectorAll(`.${styles.item}`))) {
      (elem as HTMLElement).blur();
    }

    if (document.activeElement) {
      (document.activeElement as HTMLElement).blur();
    }

    // then transition off
    transition();
  }
}
