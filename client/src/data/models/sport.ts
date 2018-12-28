export default interface Sport extends Object {
	title: string;
	sortTitle: string;
	slug: string;
	athleteLabel: string;
	objectLabel: string;
	objectPluralLabel: string;
	skillLabel: string;
	skillPluralLabel: string;
	groupLabel: string;
	groupPluralLabel: string;
	transitionLabel?: string;
	positionLabel?: string;
	featureComposition: boolean;
	approved: boolean;
}
