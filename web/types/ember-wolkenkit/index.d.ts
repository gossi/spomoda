declare module 'ember-wolkenkit/types/registries/model' {
	import Model from 'ember-wolkenkit/src/data/models/model';
	import Group from '@spomoda/web/src/data/models/group';
	import Instrument from '@spomoda/web/src/data/models/instrument';
	import Position from '@spomoda/web/src/data/models/position';
	import Skill from '@spomoda/web/src/data/models/skill';
	import Sport from '@spomoda/web/src/data/models/sport';

	export default interface ModelRegistry {
		'sports': Sport;
		'groups': Group;
		'instruments': Instrument;
		'positions': Position;
		'skills': Skill;
		[key: string]: Model;
	}
}
