import { service } from '@ember-decorators/service';
import Group from '@spomoda/client/src/data/models/group';
import Instrument from '@spomoda/client/src/data/models/instrument';
import Skill, { SkillType } from '@spomoda/client/src/data/models/skill';
import Sport from '@spomoda/client/src/data/models/sport';
import WolkenkitService from '@spomoda/client/src/services/wolkenkit';
import Task from 'ember-concurrency/task';
import SparklesComponent, { tracked } from 'sparkles-component';
import { arg } from 'sparkles-decorators';

interface SkillFormArgs {
	sport: Sport;
	skill?: Skill;
	task: Task;
}

export default class SkillFormComponent extends SparklesComponent<SkillFormArgs> {
	@service wolkenkit!: WolkenkitService;

	@arg skill = {
		type: SkillType.SKILL,
		groups: []
	};

	@tracked instruments: Instrument[] = [];
	@tracked groups: Group[] = [];

	types = [SkillType.SKILL, SkillType.COMPOSITE, SkillType.MULTIPLE];

	firstRun = true;

	async didInsertElement() {
		if (this.firstRun) {
			this.groups = await this.wolkenkit.live('groups', { where: { sportId: this.args.sport.id } });
			this.instruments = await this.wolkenkit.live('instruments', { where: { sportId: this.args.sport.id } });
			this.firstRun = false;
		}
	}
}
