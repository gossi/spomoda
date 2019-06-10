import slugify from 'slugify';
import { only } from 'wolkenkit-command-tools';
import { Commands, Events, InitialState } from 'wolkenkit/writeModel';

export const initialState: InitialState = {
	title: '',
	slug: '',
	description: '',
	sportIds: [],

	isAuthorized: {
		commands: {
			create: { forAuthenticated: true },
			edit: { forAuthenticated: true },
			delete: { forAuthenticated: true },
			attach: { forAuthenticated: true },
			detach: { forAuthenticated: true }
		},
		events: {
			createed: { forPublic: true, forAuthenticated: true },
			edited: { forPublic: true, forAuthenticated: true },
			deleted: { forPublic: true, forAuthenticated: true },
			attached: { forPublic: true, forAuthenticated: true },
			detached: { forPublic: true, forAuthenticated: true }
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
		(apparatus, command) => {
			if (!command.data.slug) {
				command.data.slug = slugify(command.data.title, { lower: true });
			}

			apparatus.events.publish('created', command.data);
		}
	],
	edit: [
		only.ifExists(),
		(apparatus, command) => {
			apparatus.events.publish('edited', command.data);
		}
	],
	delete: [
		only.ifExists(),
		(apparatus, _command) => {
			apparatus.events.publish('deleted');
		}
	],

	/**
	 * attachs the apparatus to a sport
	 */
	attach: [
		only.ifExists(),
		(apparatus, command) => {
			apparatus.events.publish('attached', command.data);
		}
	],

	/**
	 * detaches the apparatus from a sport
	 */
	detach: [
		only.ifExists(),
		(apparatus, command) => {
			apparatus.events.publish('detached', command.data);
		}
	]
};

export const events: Events = {
	created(apparatus, event) {
		apparatus.setState(event.data);
	},
	edited(apparatus, event) {
		apparatus.setState(event.data);
	},
	deleted() {
		// do nothing special here
	},
	attached(apparatus, event) {
		// apparatus.setState(event.data);
	},
	detached(apparatus, event) {
		// apparatus.setState(event.data);
	}
};
