import Model from 'ember-wolkenkit/models/model';
import { tracked } from '@glimmer/tracking';

export default class Position extends Model {
	@tracked title?: string;
	@tracked slug?: string;
	@tracked descrption?: string;
	skillIds?: string[];
	sportIds?: string[];
}
