import Model from 'ember-wolkenkit/src/data/models/model';

export enum InstrumentType {
	MANIPULATIVE = 'manipulative',
	SUPPORTIVE = 'supportive',
	MOVENDUM = 'movendum'
}

export default class Instrument extends Model {
	id: string;
	sportId: string;
	title: string;
	slug: string;
	descrption: string;
	type: InstrumentType;
	skillIds: string[];
}
