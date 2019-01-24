declare module 'ember-wolkenkit/types/registries/model' {
	import Model from 'ember-wolkenkit/src/data/models/model';
	import Group from '@spomoda/client/src/data/models/group';
	import Instrument from '@spomoda/client/src/data/models/instrument';
	import Position from '@spomoda/client/src/data/models/position';
	import Skill from '@spomoda/client/src/data/models/skill';
	import Sport from '@spomoda/client/src/data/models/sport';

	export default interface ModelRegistry {
		'sports': Sport;
		'groups': Group;
		'instruments': Instrument;
		'positions': Position;
		'skills': Skill;
		[key: string]: Model;
	}
}
