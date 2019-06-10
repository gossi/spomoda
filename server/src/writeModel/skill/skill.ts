import slugify from 'slugify';
import { only } from 'wolkenkit-command-tools';
import { Commands, Events, InitialState } from 'wolkenkit/writeModel';

export const initialState: InitialState = {
	title: '',
	slug: '',
	description: '',
	history: '',
	type: undefined,
	sportIds: [],
	groupIds: [],

	// movement details
	movement: {
		translation: false,
		rotation: false,
		discrete: false,
		rhythmic: false,

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
	},

	// equipment
	equipment: {
		instrumentId: undefined,
		apparatusId: undefined
	},

	// transitions
	transitions: {
		startPositionId: undefined,
		endPositionId: undefined
	},

	// relationship
	relationships: {
		// generic
		lineage: [],
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
	},

	isAuthorized: {
		commands: {
			catalog: { forAuthenticated: true }
		},
		events: {
			cataloged: { forPublic: true, forAuthenticated: true }
		}
	}
};

export const commands: Commands = {
	catalog: [
		(context, command) => {
			if (!command.data.slug) {
				command.data.slug = slugify(command.data.name, { lower: true });
			}

			if (command.data.instrumentId) {
				context.events.publish('instrumentAssigned', { instrumentId: command.data.instrumentId });
			}

			if (command.data.apparatusId) {
				context.events.publish('apparatusAssigned', { apparatusId: command.data.apparatusId });
			}

			context.events.publish('cataloged', command.data);
		}
	]
};

export const events: Events = {
	cataloged(skill, event) {
		skill.setState(event.data);
	}
};
