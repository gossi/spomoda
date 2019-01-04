import slugify from 'slugify';
import { only } from 'wolkenkit-command-tools';
import { Commands, Events, InitialState } from 'wolkenkit/writeModel';

export const initialState: InitialState = {
	sportId: undefined,
	title: '',
	slug: '',
	description: '',

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

export const commands: Commands = {
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
		(position, _command) => {
			position.events.publish('removed');
		}
	]
};

export const events: Events = {
	added(position, event) {
		position.setState(event.data);
	},
	edited(position, event) {
		position.setState(event.data);
	},
	removed() {
		// do nothing special here
	}
};
