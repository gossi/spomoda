import { Fields, Projections } from 'wolkenkit/readModel';

export const fields: Fields = {
	sportId: { initialState: undefined },
	title: { initialState: '' },
	slug: { initialState: '' },
	description: { initialState: '' },
	skillIds: { initialState: [] }
};

export const projections: Projections = {
	'sport.group.created'(groups, event) {
		groups.add(event.data);
	},
	'sport.group.edited'(groups, event) {
		groups.update({
			where: { id: event.aggregate.id },
			set: event.data
		});
	},
	'sport.group.deleted'(groups, event) {
		groups.remove({
			where: { id: event.aggregate.id }
		});
	}
};
