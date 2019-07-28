import PageHeaderSegmentItemComponent from '@clark/starlight-page/components/header-builder/segment/item/component';
import Component from '@glimmer/component';
import { Owner } from '@glimmer/di';

interface HeaderBuilderSegmentItemMenuArgs {
  item: PageHeaderSegmentItemComponent;
}

export default class HeaderBuilderSegmentItemMenuComponent extends Component<
  HeaderBuilderSegmentItemMenuArgs
> {
  constructor(owner: Owner, args: HeaderBuilderSegmentItemMenuArgs) {
    super(owner, args);

    args.item.setMenu(true);
  }
}
