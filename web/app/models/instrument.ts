import Model from 'ember-wolkenkit/models/model';
import { tracked } from '@glimmer/tracking';

export enum InstrumentType {
	MANIPULATIVE = 'manipulative',
	SUPPORTIVE = 'supportive',
	MOVENDUM = 'movendum'
}

export default class Instrument extends Model {
	@tracked title?: string;
	@tracked slug?: string;
	@tracked descrption?: string;
	@tracked type?: InstrumentType;
}
