import { Fields, Projections } from 'wolkenkit/readModel';

export const fields: Fields = {
	title: { initialState: '' },
	slug: { initialState: '' },
	description: { initialState: '' },
	sportIds: { initialState: [] }
};

export const projections: Projections = {
	'human.position.created'(positions, event) {
		positions.add(event.data);
	},
	'human.position.edited'(positions, event) {
		positions.update({
			where: { id: event.aggregate.id },
			set: event.data
		});
	},
	'human.position.deleted'(positions, event) {
		positions.remove({
			where: { id: event.aggregate.id }
		});
	},
	async 'sport.sport.positionAttached'(positions, event, {app, logger}) {
		const position = await app.lists.positions.readOne({
			where: { id: event.data.id }
		});

		logger.info('POSITIONS, attach sport', position);

		positions.update({
			where: { id: event.data.id },
			set: {
				sportIds: [...position.sportIds, event.aggregate.id]
			}
		});
	},
	'sport.sport.positionDetached'(positions, event) {

	}
};
