import Component from '@glimmer/component';
import { Owner } from '@glimmer/di';
import PageHeaderSegmentItemComponent from '@spomoda/web/pods/components/page-header/segment/item/component';

interface PageHeaderSegmentItemMenuArgs {
  item: PageHeaderSegmentItemComponent;
}

export default class PageHeaderSegmentItemMenuComponent extends Component<PageHeaderSegmentItemMenuArgs> {

  constructor(owner: Owner, args: PageHeaderSegmentItemMenuArgs) {
    super(owner, args);

    args.item.hasMenu = true;
  }
}
