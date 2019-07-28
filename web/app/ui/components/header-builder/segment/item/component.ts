import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HeaderBuilderSegmentItemComponent extends Component {
  @tracked hasMenu: boolean = false;

  @action
  restorePointerEvents(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target) {
      target.style.pointerEvents = 'auto';
    }
  }

  setMenu(hasMenu: boolean) {
    this.hasMenu = hasMenu;
  }
}
