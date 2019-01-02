import { InstrumentType } from '@spomoda/client/src/data/models/instrument';
import SparklesComponent from 'sparkles-component';

export default class InstrumentFormComponent extends SparklesComponent {
	types = [InstrumentType.MANIPULATIVE, InstrumentType.SUPPORTIVE, InstrumentType.MOVENDUM];
}
