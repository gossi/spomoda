'use strict';

const fields = {
	sportId: { initialState: undefined },
	title: { initialState: '' },
	slug: { initialState: '' },
	description: { initialState: '' },
	skills: { initialState: [] }
};

const projections = {
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

module.exports = {
	fields,
	projections
};
