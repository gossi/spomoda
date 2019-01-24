import slugify from 'slugify';
import { only } from 'wolkenkit-command-tools';
import { Commands, Events, InitialState } from 'wolkenkit/writeModel';

export const initialState: InitialState = {
	sportId: undefined,
	title: '',
	slug: '',
	description: '',
	history: '',
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
	},
	movementDescription: '',
	variations: [],
	startPosition: undefined,
	endPosition: undefined,
	isComposite: false,
	isMultiple: false,
	multipleOf: undefined,
	multiplier: undefined,
	generation: 0,
	importance: 0,
	instrumentId: undefined,

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
		(sport, command) => {
			if (!command.data.slug) {
				command.data.slug = slugify(command.data.name, { lower: true });
			}

			sport.events.publish('cataloged', command.data);
		}
	]
};

export const events: Events = {
	cataloged(group, event) {
		group.setState(event.data);
	}
};
