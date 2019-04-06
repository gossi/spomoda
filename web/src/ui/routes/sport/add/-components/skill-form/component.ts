import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { Owner } from '@glimmer/di';
import { tracked } from '@glimmer/tracking';
import Skill, { SkillType } from '@spomoda/web/src/data/models/skill';
import Sport from '@spomoda/web/src/data/models/sport';
import WolkenkitService from '@spomoda/web/src/services/wolkenkit';
import Task from 'ember-concurrency/task';

interface SkillFormArgs {
	sport: Sport;
	task: Task;
}

export default class SkillFormComponent extends Component<SkillFormArgs> {
	@service wolkenkit!: WolkenkitService;

	skill: Skill = Skill.create({
		relationships: {
			parents: [],
			parts: []
		},
		movement: {

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

	constructor(owner: Owner, args: SkillFormArgs) {
		super(owner, args);
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

	// get options(): Skill[] {
	// 	return this.args.sport.skills.filter(skill => skill !== this.skill).sortBy('name');
	// }

	// get multiples(): Skill[] {
	// 	return this.args.sport.skills.filter(skill => skill.type === SkillType.MULTIPLE).sortBy('name');
	// }
}

