import { tracked } from '@glimmer/tracking';
import Apparatus from '@spomoda/web/models/apparatus';
import Group from '@spomoda/web/models/group';
import Instrument from '@spomoda/web/models/instrument';
import Position from '@spomoda/web/models/position';
import Model from 'ember-wolkenkit/models/model';

export enum SkillType {
	SKILL = 'skill',
	COMPOSITE = 'composite',
	MULTIPLE = 'multiple'
}

export default class Skill extends Model {
	type: SkillType = SkillType.SKILL;

	@tracked title?: string;
	@tracked slug?: string;
	@tracked description?: string;
	@tracked history?: string;

	groups: Group[] = [];

	// movement details
	movement: Movement = new Movement();

	transitions: Transitions = new Transitions();

	equipment: Equipment = new Equipment();

	relationships: Relationships = new Relationships();
}

class Movement {
	@tracked translation: boolean = false;
	@tracked rotation: boolean = false;
	@tracked discrete: boolean = false;
	@tracked rhythmic: boolean = false;

	@tracked longitudinal?: Rotation;
	@tracked latitudinal?: Rotation;
	@tracked transversal?: Rotation;
}

class Rotation {
	@tracked athlete: boolean = false;
	@tracked instrument: boolean = false;
	@tracked sync = null;
	@tracked direction=  null;
}

class Equipment {
	@tracked Instrument?: Instrument;
	@tracked instrumentId?: string;
	@tracked apparatus?: Apparatus;
	@tracked apparatusId?: string;
}

class Transitions {
	@tracked startPosition?: Position;
	@tracked startPositionId?: string;
	@tracked endPosition?: Position;
	@tracked endPositionId?: string;
}

class Relationships {
	// flags
	@tracked composite: boolean = false;
	@tracked multiple: boolean = false;

	// generic
	@tracked lineage = [];
	@tracked relations = [];
	@tracked relationIds = [];

	// "parent"
	@tracked children = [];
	@tracked childrenIds = [];
	@tracked variations = [];
	@tracked variationIds = [];
	@tracked parts = [];
	@tracked partIds = [];
	@tracked multiples = [];
	@tracked multipleIds = [];

	// "children"
	@tracked parents = [];
	@tracked parentIds = [];
	@tracked variation?: Skill;
	@tracked variationOfId?: string;
	@tracked belongsTo = [];
	@tracked belongsToIds = [];
	@tracked multipleOf?: Skill;
	@tracked multipleOfId?: string;

	// relationship attributes
	@tracked generation = 0;
	@tracked importance = 0;
	@tracked multiplier = undefined
}
