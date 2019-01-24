import { Fields, Projections } from 'wolkenkit/readModel';

export const fields: Fields = {
	sportId: { initialState: undefined },
	title: {initialState: '' },
	slug: { initialState: '' },
	description: { initialState: '' },
	history: { initialState: '' },
	movement: {
		initialState: {
			description: '',
			isDiscrete: false,
			isRythmic: false,
			isTranslation: false,
			isRotation: false,
			longitudinal: {
				athlete: false,
				instrument: false,
				sync: null,
				direction: null
			},
			latitudinal: {
				athlete: false,
				instrument: false,
				sync: null,
				direction: null
			},
			transversal: {
				athlete: false,
				instrument: false,
				sync: null,
				direction: null
			}
		}
	},
	type: { initialState: '' },
	relationships: {
		initialState: {
			multipleOfId: undefined,
			multiplier: undefined,
			parentIds: [],
			childrenIds: [],
			variationIds: [],
			generation: 0,
			importance: 0
		}
	},
	transitions: {
		initialState: {
			startPositionId: undefined,
			endPositionId: undefined
		}
	},
	instrumentId: { initialState: undefined }
};

export const projections: Projections = {
	'sport.skill.cataloged'(skills, event) {
		skills.add(event.data);
	}
};
