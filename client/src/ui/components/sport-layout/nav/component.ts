import { service } from '@ember-decorators/service';
import Group from '@spomoda/client/src/data/models/group';
import Instrument from '@spomoda/client/src/data/models/instrument';
import Sport from '@spomoda/client/src/data/models/sport';
import WolkenkitService from '@spomoda/client/src/services/wolkenkit';
import SparklesComponent, { tracked } from 'sparkles-component';

interface SportNavArgs {
	sport: Sport;
}

export default class SportNavComponent extends SparklesComponent<SportNavArgs> {
	@service wolkenkit!: WolkenkitService;

	@tracked instruments?: Instrument[];
	@tracked groups?: Group[];

	async didInsertElement() {
		if (!this.groups) {
			this.groups = await this.wolkenkit.live('groups', { where: { sportId: this.args.sport.id } });
		}

		if (!this.instruments) {
			this.instruments = await this.wolkenkit.live('instruments', { where: { sportId: this.args.sport.id } });
		}
	}
}
