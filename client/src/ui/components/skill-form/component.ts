import { service } from '@ember-decorators/service';
import Group from '@spomoda/client/src/data/models/group';
import Instrument from '@spomoda/client/src/data/models/instrument';
import Skill from '@spomoda/client/src/data/models/skill';
import Sport from '@spomoda/client/src/data/models/sport';
import WolkenkitService from '@spomoda/client/src/services/wolkenkit';
import { Task } from 'ember-concurrency/-task-property';
import SparklesComponent, { tracked } from 'sparkles-component';

interface Args {
	sport: Sport;
	skill?: Skill;
	task: Task;
}

export default class SkillFormComponent extends SparklesComponent<Args> {
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
