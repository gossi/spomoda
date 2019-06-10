import slugify from 'slugify';
import { only } from 'wolkenkit-command-tools';
import { Commands, Events, InitialState } from 'wolkenkit/writeModel';

export const initialState: InitialState = {
	title: '',
	slug: '',
	description: '',
	type: undefined,
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
				description: { type: 'string' },
				type: { type: 'string', enum: ['manipulative', 'supportive', 'movendum'] }
			},
			required: ['title', 'type']
		}),
		(instrument, command) => {
			if (!command.data.slug) {
				command.data.slug = slugify(command.data.title, { lower: true });
			}

			instrument.events.publish('created', command.data);
		}
	],
	edit: [
		only.ifExists(),
		(instrument, command) => {
			instrument.events.publish('edited', command.data);
		}
	],
	delete: [
		only.ifExists(),
		(instrument, _command) => {
			instrument.events.publish('deleted');
		}
	],

	/**
	 * attachs the instrument to a sport
	 */
	attach: [
		only.ifExists(),
		(instrument, command) => {
			instrument.events.publish('attached', command.data);
		}
	],

	/**
	 * detaches the instrument from a sport
	 */
	detach: [
		only.ifExists(),
		(instrument, command) => {
			instrument.events.publish('detached', command.data);
		}
	]
};

export const events: Events = {
	created(instrument, event) {
		instrument.setState(event.data);
	},
	edited(instrument, event) {
		instrument.setState(event.data);
	},
	deleted() {
		// do nothing special here
	},
	attached(instrument, event) {
		// instrument.setState(event.data);
	},
	detached(instrument, event) {
		// instrument.setState(event.data);
	}
};
