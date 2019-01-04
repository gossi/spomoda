import { Fields, Projections } from 'wolkenkit/readModel';

export const fields: Fields = {
	sportId: { initialState: undefined },
	title: { initialState: '' },
	slug: { initialState: '' },
	description: { initialState: '' },
	skills: { initialState: [] }
};

export const projections: Projections = {
	'sport.position.added'(positions, event) {
		positions.add(event.data);
	},
	'sport.position.edited'(positions, event) {
		positions.update({
			where: { id: event.aggregate.id },
			set: event.data
		});
	},
	'sport.position.removed'(positions, event) {
		positions.remove({
			where: { id: event.aggregate.id }
		});
	}
};
