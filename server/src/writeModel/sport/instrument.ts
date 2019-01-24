import slugify from 'slugify';
import { only } from 'wolkenkit-command-tools';
import { Commands, Events, InitialState } from 'wolkenkit/writeModel';

export const initialState: InitialState = {
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
		(instrument, _command) => {
			instrument.events.publish('removed');
		}
	]
};

export const events: Events = {
	added(instrument, event) {
		instrument.setState(event.data);
	},
	edited(instrument, event) {
		instrument.setState(event.data);
	},
	removed() {
		// do nothing special here
	}
};
