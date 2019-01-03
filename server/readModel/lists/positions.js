'use strict';

const fields = {
	sportId: { initialState: undefined },
	title: { initialState: '' },
	slug: { initialState: '' },
	description: { initialState: '' },
	skills: { initialState: [] }
};

const projections = {
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

module.exports = {
	fields,
	projections
};
