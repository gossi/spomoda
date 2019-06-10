import { Fields, Projections } from 'wolkenkit/readModel';

export const fields: Fields = {
	title: { initialState: '' },
	sortTitle: { initialState: '' },
	slug: { initialState: '' },

	labels: {
		initialState: {
			athlete: '',
			skill: '',
			skillPlural: '',
			group: '',
			groupPlural: '',
			instrument: '',
			instrumentPlural: '',
			transition: '',
			transitionPlural: ''
		}
	},
	features: {
		initialState: {
			instruments: false,
			composition: false,
			apparatuses: false,
			config: {
				instruments: {
					defaultId: undefined,
					required: false,
					choice: true
				}
			}
		}
	},
	approved: { initialState: false }
};

export const projections: Projections = {
	'sport.sport.suggested'(sports, event) {
		sports.add(event.data);
	},
	'sport.sport.approved'(sports, event) {
		sports.update({
			where: { id: event.aggregate.id },
			set: { approved: event.data.approved }
		});
	},
	'sport.sport.rejected'(sports, event) {
		sports.remove({
			where: { id: event.aggregate.id }
		});
	},
	'sport.sport.edited'(sports, event) {
		sports.update({
			where: { id: event.aggregate.id },
			set: event.data
		});
	}
};
