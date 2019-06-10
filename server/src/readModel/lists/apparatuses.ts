import { Fields, Projections } from 'wolkenkit/readModel';

export const fields: Fields = {
	title: { initialState: '' },
	slug: { initialState: '' },
	description: { initialState: '' },
	sportIds: { initialState: [] },
	skillIds: { initialState: [] }
};

export const projections: Projections = {
	'equipment.apparatus.created'(apparatuses, event) {
		apparatuses.add(event.data);
	},
	'equipment.apparatus.edited'(apparatuses, event) {
		apparatuses.update({
			where: { id: event.aggregate.id },
			set: event.data
		});
	},
	'equipment.apparatus.deleted'(apparatuses, event) {
		apparatuses.remove({
			where: { id: event.aggregate.id }
		});
	},
	'sport.sport.apparatusAttached'(apparatuses, event, {logger}) {
		logger.info('APPARATUS projection:', event);
	},
	'sport.sport.apparatusDetached'(apparatuses, event) {

	},
	'skill.skill.apparatusAssigned'(apparatuses, event) {

	},
	'skill.skill.apparatusUnassigned'(apparatuses, event) {

	}
};
