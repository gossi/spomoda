'use strict';

const { only } = require('wolkenkit-command-tools');
const slugify = require('slugify');

const initialState = {
	sportId: undefined,
	title: '',
	slug: '',
	description: '',
	type: undefined,

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
				description: { type: 'string' },
				type: { type: 'string', enum: ['manipulative', 'supportive', 'movendum'] }
			},
			required: ['sportId', 'title', 'type']
		}),
		(instrument, command) => {
			if (!command.data.slug) {
				command.data.slug = slugify(command.data.title, { lower: true });
			}

			instrument.events.publish('added', command.data);
		}
	],
	edit: [
		only.ifExists(),
		(instrument, command) => {
			instrument.events.publish('edited', command.data);
		}
	],
	remove: [
		only.ifExists(),
		(instrument, command) => {
			instrument.events.publish('removed');
		}
	]
};

const events = {
	added(instrument, event) {
		instrument.setState(event.data);
	},
	edited(instrument, event) {
		instrument.setState(event.data);
	},
	removed() {

	}
};

module.exports = {
	initialState,
	commands,
	events
};
