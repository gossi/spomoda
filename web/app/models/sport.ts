import { tracked } from '@glimmer/tracking';
import Group from '@spomoda/web/models/group';
import Instrument from '@spomoda/web/models/instrument';
import Position from '@spomoda/web/models/position';
import Skill from '@spomoda/web/models/skill';
import Model from 'ember-wolkenkit/models/model';

export default class Sport extends Model {
	@tracked title?: string;
	@tracked sortTitle?: string;

	@tracked slug?: string;

	approved: boolean = false;

	@tracked labels: Labels = new Labels();
	@tracked features: Features = new Features();

	@tracked skillIds: string[] = [];

	@tracked groups: Group[] = [];
	@tracked positions: Position[] = [];
	@tracked instruments: Instrument[] = [];
	@tracked skills: Skill[] = [];
}

class Labels {
	@tracked athlete?: string;
	@tracked athletes?: string;
	@tracked skill?: string;
	@tracked skills?: string;
	@tracked group?: string;
	@tracked groups?: string;
	@tracked instrument?: string;
	@tracked instruments?: string;
	@tracked transition?: string;
	@tracked transitions?: string;
	@tracked apparatus?: string;
	@tracked apparatuses?: string;
}

class Features {
	@tracked instruments: boolean = false;
	@tracked apparatuses: boolean = false;
	@tracked composition: boolean = false;
	@tracked config: FeatureConfig = {
		instruments: new InstrumentsConfig()
	}
}

interface FeatureConfig {
	instruments: InstrumentsConfig
}

class InstrumentsConfig {
	@tracked defaultId?: string;
	@tracked default?: Instrument;

	/**
	 * Whether an instrument is required
	 */
	@tracked required: boolean = false;

	/**
	 * Whether the user has a choice to pick an instrument
	 * (anyway default is used)
	 */
	@tracked choice: boolean = true;
}
