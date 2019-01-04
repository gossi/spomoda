import { Fields, Projections } from 'wolkenkit/readModel';

export const fields: Fields = {
	sportId: { initialState: undefined },
	title: { initialState: '' },
	slug: { initialState: '' },
	description: { initialState: '' },
	skills: { initialState: [] }
};

export const projections: Projections = {
	'sport.group.added'(groups, event) {
		groups.add(event.data);
	},
	'sport.group.edited'(groups, event) {
		groups.update({
			where: { id: event.aggregate.id },
			set: event.data
		});
	},
	'sport.group.removed'(groups, event) {
		groups.remove({
			where: { id: event.aggregate.id }
		});
	}
};
