import Model from 'ember-wolkenkit/models/model';
import { tracked } from '@glimmer/tracking';

export default class Group extends Model {
	@tracked sportId?: string;
	@tracked title?: string;
	@tracked slug?: string;
	@tracked descrption?: string;
	@tracked skillIds?: string[];
}
