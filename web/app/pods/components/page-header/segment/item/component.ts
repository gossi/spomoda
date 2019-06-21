import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class PageHeaderSegmentItemComponent extends Component {

  @tracked hasMenu: boolean = false;
}
