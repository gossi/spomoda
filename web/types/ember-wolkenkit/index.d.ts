declare module 'ember-wolkenkit/types/registries/model' {
	import Model from 'ember-wolkenkit/models/model';
	import Group from '@spomoda/web/models/group';
	import Instrument from '@spomoda/web/models/instrument';
	import Position from '@spomoda/web/models/position';
	import Skill from '@spomoda/web/models/skill';
	import Sport from '@spomoda/web/models/sport';

	export default interface ModelRegistry {
		'sports': Sport;
		'groups': Group;
		'instruments': Instrument;
		'positions': Position;
		'skills': Skill;
		[key: string]: Model;
	}
}
