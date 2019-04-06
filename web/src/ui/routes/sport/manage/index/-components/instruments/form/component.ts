import { InstrumentType } from '@spomoda/web/src/data/models/instrument';
import Component from '@glimmer/component';

export default class InstrumentFormComponent extends Component {
	types = [InstrumentType.MANIPULATIVE, InstrumentType.SUPPORTIVE, InstrumentType.MOVENDUM];
}
