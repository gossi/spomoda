'use strict';

const { only } = require('wolkenkit-command-tools');
const slugify = require('slugify');

const initialState = {
	sportId: undefined,
	title: '',
	slug: '',
	description: '',

	isAuthorized: {
		commands: {
			add: { forPublic: true },
			edit: { forPublic: true },
			remove: { forPublic: true }
		},
		events: {
			added: { forPublic: true },
			edited: { forPublic: true },
			removed: { forPublic: true }
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
		(position, command) => {
			if (!command.data.slug) {
				command.data.slug = slugify(command.data.title, { lower: true });
			}

			position.events.publish('added', command.data);
		}
	],
	edit: [
		only.ifExists(),
		(position, command) => {
			position.events.publish('edited', command.data);
		}
	],
	remove: [
		only.ifExists(),
		(position, command) => {
			position.events.publish('removed');
		}
	]
};

const events = {
	added(position, event) {
		position.setState(event.data);
	},
	edited(position, event) {
		position.setState(event.data);
	},
	removed() {

	}
};

module.exports = {
	initialState,
	commands,
	events
};
