import Model from 'ember-wolkenkit/models/model';

export default class Apparatus extends Model {
	id?: string;
	title?: string;
	slug?: string;
	descrption?: string;
	skillIds?: string[];
	sportIds?: string[];
}
