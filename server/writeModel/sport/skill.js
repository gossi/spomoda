'use strict';

const { only } = require('wolkenkit-command-tools');
const slugify = require('slugify');

const initialState = {
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
			add: { forAuthenticated: true },
			edit: { forAuthenticated: true },
			remove: { forAuthenticated: true }
		},
		events: {
			added: { forAuthenticated: true },
			edited: { forAuthenticated: true },
			removed: { forAuthenticated: true }
		}
	}
};

const commands = {
	add: [
		only.ifCommandValidatedBy({
			type: 'object',
			properties: {
				sportId: {type: 'string', format: 'uuid'},
				title: {type: 'string'},
				slug: {type: 'string'},
				description: { type: 'string' }
			},
			required: ['sportId', 'title']
		}),
		(group, command) => {
			if (!command.data.slug) {
				command.data.slug = slugify(command.data.title, { lower: true });
			}

			group.events.publish('added', command.data);
		}
	],
	edit: [
		only.ifExists(),
		(group, command) => {
			group.events.publish('edited', command.data);
		}
	],
	remove: [
		only.ifExists(),
		(group, command) => {
			group.events.publish('removed');
		}
	]
};

const events = {
	added(group, event) {
		group.setState(event.data);
	},
	edited(group, event) {
		group.setState(event.data);
	},
	removed() {

	}
};

module.exports = {
	initialState,
	commands,
	events
};
