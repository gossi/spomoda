import { Fields, Projections } from 'wolkenkit/readModel';

export const fields: Fields = {
	title: { initialState: '' },
	slug: { initialState: '' },
	description: { initialState: '' },
	type: { initialState: undefined },
	sportIds: { initialState: [] },
	skillIds: { initialState: [] }
};

export const projections: Projections = {
	'equipment.instrument.created'(instruments, event) {
		instruments.add(event.data);
	},
	'equipment.instrument.edited'(instruments, event) {
		instruments.update({
			where: { id: event.aggregate.id },
			set: event.data
		});
	},
	'equipment.instrument.deleted'(instruments, event) {
		instruments.remove({
			where: { id: event.aggregate.id }
		});
	},
	'sport.sport.instrumentAttached'(instruments, event) {

	},
	'sport.sport.instrumentDetached'(instruments, event) {

	},
	'skill.skill.instrumentAssigned'(instruments, event) {

	},
	'skill.skill.instrumentUnassigned'(instruments, event) {

	}
};
