import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import SessionService from '@spomoda/web/services/session';
import WolkenkitService from 'ember-wolkenkit/services/wolkenkit';
import { InstrumentType } from '@spomoda/web/models/instrument';

export default class ApplicationController extends Controller {
	@service session!: SessionService;
	@service wolkenkit!: WolkenkitService;

	private seeds = {
		equipment: {
			unicycle: ''
		}
	};

	@action
	async seed() {
		if (this.session.isAuthenticated) {
			await this.seedHuman();
			await this.seedEquipment();
			await this.seedUnicycling();
		}
	}

	private async seedHuman() {
		await this.addPosition({
			title: 'Riding',
			description: 'Sitting on the Seat'
		});
	}

	private async seedEquipment() {
		const { event } = await this.addInstrument({
			title: 'Unicycle',
			description: 'A unicycle',
			type: InstrumentType.MOVENDUM
		});
		this.seeds.equipment.unicycle = event.aggregate.id;
	}

	private async seedUnicycling() {
		const { event } = await this.wolkenkit.command('sport.sport.suggest', 'suggested', {
			title: 'Unicycling',
			sortTitle: 'unicycling',
			slug: 'unicycling',
			labels: {
				athlete: 'Unicyclist',
				athletes: 'Unicyclists',
				skill: 'Trick',
				skills: 'Tricks',
				group: 'Struct',
				groups: 'Structs',
				instrument: 'Unicycle',
				instruments: 'Unicycles',
				position: 'Position',
				positions: 'Positions',
				transition: 'Transition',
				transitions: 'Transitions',
			},
			features: {
				instruments: true,
				composition: true,
				apparatuses: false,
				config: {
					instruments: {
						defaultId: this.seeds.equipment.unicycle,
						required: true,
						choice: false
					}
				}
			}
		});
		const sportId = event.aggregate.id;

		await this.wolkenkit.command('sport.sport.approve', 'approved', sportId);

		await this.addGroup(sportId, {
			title: 'Riding',
			descrption: 'Regular Riding'
		});
	}

	private addGroup(sportId, data) {
		return this.wolkenkit.command('sport.group.create', 'created', { sportId: sportId, ...data });
	}

	private addPosition(data) {
		return this.wolkenkit.command('human.position.create', 'created', data);
	}

	private addInstrument(data) {
		return this.wolkenkit.command('equipment.instrument.create', 'created', data);
	}

}
