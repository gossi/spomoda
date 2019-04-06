import { tracked } from '@glimmer/tracking';
import Group from '@spomoda/web/src/data/models/group';
import Instrument from '@spomoda/web/src/data/models/instrument';
import Position from '@spomoda/web/src/data/models/position';
import Skill from '@spomoda/web/src/data/models/skill';
import Model from 'ember-wolkenkit/src/data/models/model';

export default class Sport extends Model {
	id?: string;

	title?: string;
	sortTitle?: string;

	slug?: string;

	athleteLabel?: string;

	skillLabel?: string;
	skillPluralLabel?: string;

	groupLabel?: string;
	groupPluralLabel?: string;

	instrumentLabel?: string;
	instrumentPluralLabel?: string;

	positionLabel?: string;
	positionPluralLabel?: string;

	transitionLabel?: string;
	transitionPluralLabel?: string;

	@tracked groups: Group[] = [];
	@tracked positions: Position[] = [];
	@tracked instruments: Instrument[] = [];
	@tracked skills: Skill[] = [];

	featureInstruments: boolean = false;
	featureComposition: boolean = false;
	featureApparatuses: boolean = false;

	approved: boolean = false;
}
