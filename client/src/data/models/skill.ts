import Model from 'ember-wolkenkit/src/data/models/model';
import Group from '@spomoda/client/src/data/models/group';
import { tracked } from 'sparkles-component';

export enum SkillType {
	SKILL = 'skill',
	COMPOSITE = 'composite',
	MULTIPLE = 'multiple'
}

type Relationships = {
	multipleOfId?: string;
	multipleOf?: Skill;
	multiplier?: number;
	parentIds: string[];
	parents: Skill[];
	childrenIds: string[];
	children: Skill[];
	variationIds: string[];
	variations: Skill[];
	partIds: string[];
	parts: [];
	generation?: number;
	importance?: number;
};

export default class Skill extends Model {
	type: SkillType = SkillType.SKILL;

	groups: Group[] = [];

	@tracked relationships: Relationships = {
		multipleOf: undefined,
		parentIds: [],
		parents: [],
		childrenIds: [],
		children: [],
		variationIds: [],
		variations: [],
		partIds: [],
		parts: [],
		generation: 0,
		importance: 0
	};
}
