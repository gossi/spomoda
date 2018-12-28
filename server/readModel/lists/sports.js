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
	objectLabel: {
		initialState: ''
	},
	objectPluralLabel: {
		initialState: ''
	},
	positionLabel: {
		initialState: ''
	},
	positionPluralLabel: {
		initialState: ''
	},
	transitionLabel: {
		initialState: ''
	},
	transitionPluralLabel: {
		initialState: ''
	},
	featureObjects: {
		initialState: false
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
			// ...event.data
			title: event.data.title,
			sortTitle: event.data.sortTitle,
			slug: event.data.slug,
			athleteLabel: event.data.athleteLabel,
			skillLabel: event.data.skillLabel,
			skillPluralLabel: event.data.skillPluralLabel,
			groupLabel: event.data.groupLabel,
			groupPluralLabel: event.data.groupPluralLabel,
			objectLabel: event.data.objectLabel,
			objectPluralLabel: event.data.objectPluralLabel,
			positionLabel: event.data.positionLabel,
			positionPluralLabel: event.data.positionPluralLabel,
			transitionLabel: event.data.transitionLabel,
			transitionPluralLabel: event.data.transitionPluralLabel,
			featureObjects: event.data.featureObjects,
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
				// ...event.data
				title: event.data.title,
				sortTitle: event.data.sortTitle,
				slug: event.data.slug,
				athleteLabel: event.data.athleteLabel,
				skillLabel: event.data.skillLabel,
				skillPluralLabel: event.data.skillPluralLabel,
				groupLabel: event.data.groupLabel,
				groupPluralLabel: event.data.groupPluralLabel,
				objectLabel: event.data.objectLabel,
				objectPluralLabel: event.data.objectPluralLabel,
				positionLabel: event.data.positionLabel,
				positionPluralLabel: event.data.positionPluralLabel,
				transitionLabel: event.data.transitionLabel,
				transitionPluralLabel: event.data.transitionPluralLabel,
				featureObjects: event.data.featureObjects,
				featureComposition: event.data.featureComposition
			}
		});
	}
};

module.exports = {
	fields,
	projections
};
