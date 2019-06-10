import { Fields, Projections } from 'wolkenkit/readModel';

export const fields: Fields = {
	sportIds: { initialState: [] },
	title: {initialState: '' },
	slug: { initialState: '' },
	description: { initialState: '' },
	history: { initialState: '' },
	type: { initialState: undefined },
	movement: {
		initialState: {
			isTranslation: false,
			isRotation: false,
			isDiscrete: false,
			isRhythmic: false,
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
	equipment: {
		initialState: {
			instrumentId: undefined,
			apparatusId: undefined
		}
	},
	transitions: {
		initialState: {
			startPositionId: undefined,
			endPositionId: undefined
		}
	},
	relationships: {
		initialState: {
			// flags
			composite: false,
			multiple: false,

			// generic
			lineageIds: [],
			relationIds: [],

			// "parent"
			childrenIds: [],
			variationIds: [],
			partIds: [],
			multipleIds: [],

			// "children"
			parentIds: [],
			variationOfId: undefined,
			belongsToIds: [],
			multipleOfId: undefined,

			// relationship attributes
			generation: 0,
			importance: 0,
			multiplier: undefined
		}
	}
};

export const projections: Projections = {
	'sport.skill.cataloged'(skills, event) {
		skills.add(event.data);
	}
};
