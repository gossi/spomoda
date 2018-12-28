export default interface Sport extends Object {
	title: string;
	sortTitle: string;

	slug: string;

	athleteLabel: string;

	skillLabel: string;
	skillPluralLabel: string;

	groupLabel: string;
	groupPluralLabel: string;

	objectLabel?: string;
	objectPluralLabel?: string;

	positionLabel?: string;
	positionPluralLabel?: string;

	transitionLabel?: string;
	transitionPluralLabel?: string;

	featureObjects: boolean;
	featureComposition: boolean;

	approved: boolean;
}
