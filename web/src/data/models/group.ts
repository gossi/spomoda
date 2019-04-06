import Model from 'ember-wolkenkit/src/data/models/model';

export default class Group extends Model {
	id: string;
	sportId: string;
	title: string;
	slug: string;
	descrption: string;
	skillIds: string[];
}
