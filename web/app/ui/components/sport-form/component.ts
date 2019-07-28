import { action } from '@ember/object';
import Component from '@glimmer/component';
import { Owner } from '@glimmer/di';
import { tracked } from '@glimmer/tracking';
import Instrument from '@spomoda/web/models/instrument';
import Sport from '@spomoda/web/models/sport';
import Task from 'ember-concurrency/task';
import WolkenkitService from 'ember-wolkenkit/services/wolkenkit';
import { Changeset } from '@spomoda/web/utils/changeset';

interface SportFormArgs {
	sport?: Sport;
	task: Task;
}

export default class SportFormComponent extends Component<SportFormArgs> {

	@tracked sport: Sport;
	@tracked instruments!: Instrument[];

	constructor(owner: Owner, args: SportFormArgs) {
		super(owner, args);

		this.sport = this.args.sport ? this.args.sport : new Sport();

		const wolkenkit: WolkenkitService = owner.lookup('service:wolkenkit');

		wolkenkit.read('instruments').then(instruments => {
			this.instruments = instruments;
			if (args.sport && typeof args.sport.features.config) {
				const config = args.sport.features.config.instruments;
				config.default = instruments.find(instrument => instrument.id === config.defaultId);
				this.sport = args.sport;
			}
		});
	}

	@action
	toggleInstrumentFeature(model: Changeset<Sport>, enabled: boolean) {
		model.set('features.instruments', enabled ? {
			defaultId: '',
			required: false,
			choice: false
		} : enabled);
	}

	@action
	setInstrumentFeature(model: Changeset<Sport>, feature: string, value: any) {
		if (feature === 'default') {
			value = value === null ? undefined : value;
			this.setInstrumentFeature(model, 'defaultId', undefined);
		}
		model.set(`features.config.instruments.${feature}`, value);

		console.log('set feautre', feature, value, model.get('features.config.instruments'));
	}
}
