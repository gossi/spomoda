import { inject as service } from '@ember-decorators/service';
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

	@arg skill: Skill = Skill.create({
		relationships: {
			parents: [],
			parts: []
		}
	});

	types = {
		[SkillType.SKILL]: SkillType.SKILL,
		[SkillType.COMPOSITE]: SkillType.COMPOSITE,
		[SkillType.MULTIPLE]: SkillType.MULTIPLE
	};

	// Workaround (see below)
	@tracked multiples?: Skill[];
	@tracked options?: Skill[];

	latestSkills?: Skill[];

	constructor(args: SkillFormArgs) {
		super(args);
		this.setOptions();
	}

	didUpdate() {
		this.setOptions();
	}

	setOptions() {
		if (this.latestSkills !== this.args.sport.skills || !this.options || !this.multiples) {
			this.options = this.args.sport.skills.filter(skill => skill !== this.skill).sortBy('name');
			this.multiples = this.args.sport.skills.filter(skill => skill.type === SkillType.MULTIPLE).sortBy('name');
			this.latestSkills = this.args.sport.skills;
		}
	}

	// Intended Implementation
	// Related issue: https://github.com/cibernox/ember-power-select/issues/1196

	// @tracked('args')
	// get options(): Skill[] {
	// 	return this.args.sport.skills.filter(skill => skill !== this.skill).sortBy('name');
	// }

	// @tracked('args')
	// get multiples(): Skill[] {
	// 	return this.args.sport.skills.filter(skill => skill.type === SkillType.MULTIPLE).sortBy('name');
	// }
}

