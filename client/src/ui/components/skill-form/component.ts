import { inject as service } from '@ember-decorators/service';
import Group from '@spomoda/client/src/data/models/group';
import Instrument from '@spomoda/client/src/data/models/instrument';
import Skill, { SkillType } from '@spomoda/client/src/data/models/skill';
import Sport from '@spomoda/client/src/data/models/sport';
import WolkenkitService from '@spomoda/client/src/services/wolkenkit';
import Task from 'ember-concurrency/task';
import SparklesComponent, { tracked } from 'sparkles-component';
import { arg } from 'sparkles-decorators';
import { observes } from '@ember-decorators/object';

interface SkillFormArgs {
	sport: Sport;
	skill?: Skill;
	task: Task;
}

export default class SkillFormComponent extends SparklesComponent<SkillFormArgs> {
	@service wolkenkit!: WolkenkitService;

	@arg skill: Skill = Skill.create({});

	types = {
		[SkillType.SKILL]: SkillType.SKILL,
		[SkillType.COMPOSITE]: SkillType.COMPOSITE,
		[SkillType.MULTIPLE]: SkillType.MULTIPLE
	};

	@tracked instruments?: Instrument[];
	@tracked groups?: Group[];
	@tracked skills?: Skill[];

	@tracked options: Skill[] = [];

	// @tracked('args')
	@observes('args')
	optionsObserver() {
		// this.options = this.args.sport.skills.slice().filter(skill => skill !== this.skill).sortBy('name');
		this.options = [];
	}
	// get options(): Skill[] {
	// 	return [];
	// 	// return this.args.sport.skills.slice().filter(skill => skill !== this.skill).sortBy('name');
	// }

	@tracked('args')
	get multiples(): Skill[] {
		return this.args.sport.skills.filter(skill => skill.type === SkillType.MULTIPLE).sortBy('name');
	}

	// async didInsertElement() {
	// 	this.groups = await this.wolkenkit.live('groups', { where: { sportId: this.args.sport.id } });
	// 	this.instruments = await this.wolkenkit.live('instruments', { where: { sportId: this.args.sport.id } });
	// 	this.skills = await this.wolkenkit.read('skills', { where: { sportId: this.args.sport.id } });
	// }

	void() {

	}
}

