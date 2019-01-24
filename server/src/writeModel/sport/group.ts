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
			added: { forPublic: true, forAuthenticated: true },
			edited: { forPublic: true, forAuthenticated: true },
			removed: { forPublic: true, forAuthenticated: true }
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
		(group, _command) => {
			group.events.publish('removed');
		}
	]
};

export const events: Events = {
	added(group, event) {
		group.setState(event.data);
	},
	edited(group, event) {
		group.setState(event.data);
	},
	removed() {
		// do nothing special here
	}
};
