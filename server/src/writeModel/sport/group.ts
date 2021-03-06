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

			group.events.publish('created', command.data);
		}
	],
	edit: [
		only.ifExists(),
		(group, command) => {
			group.events.publish('edited', command.data);
		}
	],
	delete: [
		only.ifExists(),
		(group, _command) => {
			group.events.publish('deleted');
		}
	]
};

export const events: Events = {
	created(group, event) {
		group.setState(event.data);
	},
	edited(group, event) {
		group.setState(event.data);
	},
	deleted() {
		// do nothing special here
	}
};
