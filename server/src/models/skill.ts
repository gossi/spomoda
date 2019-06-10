import { Aggregate } from 'wolkenkit';

export enum SkillType {
	SKILL = 'skill',
	COMPOSITE = 'composite',
	MULTIPLE = 'multiple'
}

export interface Skill extends Aggregate {
	parents: string[];
}
