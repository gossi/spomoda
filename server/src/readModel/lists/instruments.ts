import { Fields, Projections } from 'wolkenkit/readModel';

export const fields: Fields = {
	sportId: { initialState: undefined },
	title: { initialState: '' },
	slug: { initialState: '' },
	description: { initialState: '' },
	type: { initialState: undefined },
	skills: { initialState: [] }
};

export const projections: Projections = {
	'sport.instrument.added'(instruments, event) {
		instruments.add(event.data);
	},
	'sport.instrument.edited'(instruments, event) {
		instruments.update({
			where: { id: event.aggregate.id },
			set: event.data
		});
	},
	'sport.instrument.removed'(instruments, event) {
		instruments.remove({
			where: { id: event.aggregate.id }
		});
	}
};
