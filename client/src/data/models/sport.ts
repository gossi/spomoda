export default interface Sport extends Object {
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

	featureInstruments: boolean;
	featureComposition: boolean;
	featureApparatuses: boolean;

	approved: boolean;
}
