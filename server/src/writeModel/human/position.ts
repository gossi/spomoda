import slugify from 'slugify';
import { only } from 'wolkenkit-command-tools';
import { Commands, Events, InitialState } from 'wolkenkit/writeModel';

export const initialState: InitialState = {
	title: '',
	slug: '',
	description: '',

	isAuthorized: {
		commands: {
			create: { forAuthenticated: true },
			edit: { forAuthenticated: true },
			delete: { forAuthenticated: true }
		},
		events: {
			created: { forPublic: true, forAuthenticated: true },
			edited: { forPublic: true, forAuthenticated: true },
			deleted: { forPublic: true, forAuthenticated: true }
		}
	}
};

export const commands: Commands = {
	create: [
		only.ifCommandValidatedBy({
			type: 'object',
			properties: {
				title: {type: 'string'},
				slug: {type: 'string'},
				description: { type: 'string' }
			},
			required: ['title']
		}),
		(position, command) => {
			if (!command.data.slug) {
				command.data.slug = slugify(command.data.title, { lower: true });
			}

			position.events.publish('created', command.data);
		}
	],
	edit: [
		only.ifExists(),
		(position, command) => {
			position.events.publish('edited', command.data);
		}
	],
	delete: [
		only.ifExists(),
		(position, _command) => {
			position.events.publish('deleted');
		}
	]
};

export const events: Events = {
	created(position, event) {
		position.setState(event.data);
	},
	edited(position, event) {
		position.setState(event.data);
	},
	deleted() {
		// do nothing special here
	}
};
