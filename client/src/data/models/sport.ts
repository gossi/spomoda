import Group from '@spomoda/client/src/data/models/group';
import Instrument from '@spomoda/client/src/data/models/instrument';
import Position from '@spomoda/client/src/data/models/position';
import Skill from '@spomoda/client/src/data/models/skill';
import Model from 'ember-wolkenkit/src/data/models/model';
import { tracked } from 'sparkles-component';

export default class Sport extends Model {
	id: string;

	title: string;
	sortTitle: string;

	slug: string;

	athleteLabel: string;

	skillLabel: string;
	skillPluralLabel: string;

	groupLabel: string;
	groupPluralLabel: string;

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

	featureInstruments: boolean;
	featureComposition: boolean;
	featureApparatuses: boolean;

	approved: boolean;
}
