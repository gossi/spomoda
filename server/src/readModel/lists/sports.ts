import { Fields, Projections } from 'wolkenkit/readModel';

export const fields: Fields = {
	title: { initialState: '' },
	sortTitle: { initialState: '' },
	slug: { initialState: '' },
	athleteLabel: { initialState: '' },
	skillLabel: { initialState: '' },
	skillPluralLabel: { initialState: '' },
	groupLabel: { initialState: '' },
	groupPluralLabel: { initialState: '' },
	instrumentLabel: { initialState: '' },
	instrumentPluralLabel: { initialState: '' },
	positionLabel: { initialState: '' },
	positionPluralLabel: { initialState: '' },
	transitionLabel: { initialState: '' },
	transitionPluralLabel: { initialState: '' },
	featureInstruments: { initialState: false },
	featureComposition: { initialState: false },
	featureApparatuses: { initialState: false },
	approved: { initialState: false }
};

export const projections: Projections = {
	'management.sport.suggested'(sports, event) {
		sports.add(event.data);
	},
	'management.sport.approved'(sports, event) {
		sports.update({
			where: { id: event.aggregate.id },
			set: { approved: event.data.approved }
		});
	},
	'management.sport.rejected'(sports, event) {
		sports.remove({
			where: { id: event.aggregate.id }
		});
	},
	'management.sport.edited'(sports, event) {
		sports.update({
			where: { id: event.aggregate.id },
			set: event.data
		});
	}
};
