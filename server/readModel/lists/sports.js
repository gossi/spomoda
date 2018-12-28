'use strict';

const fields = {
	title: {
		initialState: ''
	},
	sortTitle: {
		initialState: ''
	},
	slug: {
		initialState: ''
	},
	athleteLabel: {
		initialState: ''
	},
	objectLabel: {
		initialState: ''
	},
	objectPluralLabel: {
		initialState: ''
	},
	skillLabel: {
		initialState: ''
	},
	skillPluralLabel: {
		initialState: ''
	},
	groupLabel: {
		initialState: ''
	},
	groupPluralLabel: {
		initialState: ''
	},
	transitionLabel: {
		initialState: ''
	},
	transitionPluralLabel: {
		initialState: ''
	},
	positionLabel: {
		initialState: ''
	},
	featureComposition: {
		initialState: false
	},
	approved: {
		initialState: false
	}
};

const projections = {
	'management.sport.suggested'(sports, event) {
		sports.add({
			title: event.data.title,
			slug: event.data.slug,
			athleteLabel: event.data.athleteLabel,
			objectLabel: event.data.objectLabel,
			objectPluralLabel: event.data.objectPluralLabel,
			skillLabel: event.data.skillLabel,
			skillPluralLabel: event.data.skillPluralLabel,
			groupLabel: event.data.groupLabel,
			groupPluralLabel: event.data.groupPluralLabel,
			transitionLabel: event.data.transitionLabel,
			transitionPluralLabel: event.data.transitionPluralLabel,
			positionLabel: event.data.positionLabel,
			featureComposition: event.data.featureComposition
		});
	},
	'management.sport.approved'(sports, event) {
		sports.update({
			where: {
				id: event.aggregate.id
			},
			set: {
				approved: event.data.approved
			}
		});
	},
	'management.sport.rejected'(sports, event) {
		sports.remove({
			where: { id: event.aggregate.id }
		});
	},
	'management.sport.edited'(sports, event) {
		sports.update({
			where: {
				id: event.aggregate.id
			},
			set: {
				title: event.data.title,
				athleteLabel: event.data.athleteLabel,
				objectLabel: event.data.objectLabel,
				objectPluralLabel: event.data.objectPluralLabel,
				skillLabel: event.data.skillLabel,
				skillPluralLabel: event.data.skillPluralLabel,
				groupLabel: event.data.groupLabel,
				groupPluralLabel: event.data.groupPluralLabel,
				transitionLabel: event.data.transitionLabel,
				transitionPluralLabel: event.data.transitionPluralLabel,
				positionLabel: event.data.positionLabel,
				featureComposition: event.data.featureComposition
			}
		});
	}
};

module.exports = {
	fields,
	projections
};
