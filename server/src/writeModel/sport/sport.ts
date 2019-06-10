import slugify from 'slugify';
import { Data } from 'wolkenkit/-internals';
import { Commands, Events, InitialState } from 'wolkenkit/writeModel';

export const initialState: InitialState = {
	title: '',
	sortTitle: '',

	slug: '',

	labels: {
		athlete: '',
		athletes: '',
		skill: '',
		skills: '',
		group: '',
		groups: '',
		instrument: '',
		instruments: '',
		transition: '',
		transitions: '',
		apparatus: '',
		apparatuses: '',
	},

	features: {
		instruments: false,
		composition: false,
		apparatuses: false,
		config: {
			instruments: {
				defaultId: undefined,
				required: false,
				choice: true
			}
		}
	},

	approved: false,

	isAuthorized: {
		commands: {
			suggest: {
				forAuthenticated: true
			},
			approve: {
				forAuthenticated: true
			},
			reject: {
				forAuthenticated: true
			},
			edit: {
				forAuthenticated: true
			}
		},
		events: {
			suggested: {
				forPublic: true, forAuthenticated: false
			},
			approved: {
				forPublic: true, forAuthenticated: false
			},
			rejected: {
				forPublic: true, forAuthenticated: false
			},
			edited: {
				forPublic: true, forAuthenticated: false
			}
		}
	}
};

function validate(data: Data) {
	const errors: Data = {};

	if (!data.title) {
		errors.title = 'required';
	}

	const required = ['athlete', 'athletes', 'skill', 'skills'];

	if (data.features.instruments) {
		required.push(...['instrument', 'instruments']);
	}

	if (data.features.composition) {
		required.push(...['transition', 'transitions', 'position', 'positions']);
	}

	if (data.features.apparatuses) {
		required.push(...['apparatus', 'apparatuses']);
	}

	for (const field of required) {
		const labels: {[key: string]: string} = {};
		if (!data.labels[field]) {
			labels[field] = 'required';
		}

		if (Object.keys(labels).length > 0) {
			errors.labels = labels;
		}
	}

	return errors;
}

export const commands: Commands = {
	suggest: [
		(_sport, command) => {
			const errors = validate(command.data);

			if (Object.keys(errors).length) {
				return command.reject(JSON.stringify(errors));
			}
		},
		(sport, command) => {
			if (!command.data.slug) {
				command.data.slug = slugify(command.data.title, {lower: true});
			}

			if (!command.data.sortTitle) {
				command.data.sortTitle = command.data.title;
			}

			sport.events.publish('suggested', command.data);
		}
	],

	approve(sport, _command) {
		sport.events.publish('approved', {
			approved: true
		});
	},

	reject(sport, _command) {
		sport.events.publish('rejected');
	},

	edit(sport, command) {
		sport.events.publish('edited', command.data);
	},

	// --- Skills

	/**
	 * Attach a skill to a sport
	 * @param sport
	 * @param command
	 */
	attachSkill(sport, command) {
		sport.events.publish('skillAttached', command.data);
	},

	/**
	 * Detach a skill from a sport
	 * @param sport
	 * @param command
	 */
	detachSkill(sport, command) {
		sport.events.publish('skillDetached', command.data);
	},

	// --- Instruments

	attachInstrument(sport, command) {
		sport.events.publish('instrumentAttached', command.data);
	},

	detachInstrument(sport, command) {
		sport.events.publish('instrumentDetached', command.data);
	},

	// --- Positions

	attachPosition(sport, command) {
		sport.events.publish('positionAttached', command.data);
	},

	detachPosition(sport, command) {
		sport.events.publish('positionDetached', command.data);
	},

	// --- Apparatuses

	attachApparatus(sport, command) {
		sport.events.publish('apparatusAttached', command.data);
	},

	detachApparatus(sport, command) {
		sport.events.publish('apparatusDetached', command.data);
	}
};

export const events: Events = {
	suggested(sport, event) {
		sport.setState(event.data);
	},

	approved(sport, event) {
		sport.setState({
			approved: event.data.approved
		});
	},

	rejected(_sport, _event) {
		// does nothing here - d'uh
	},

	edited(sport, event) {
		sport.setState(event.data);
	},

	skillAttached(sport, event) {
		// sport.setState(event.data);
	},

	skillDetached(sport, event) {
		// sport.setState(event.data);
	},

	instrumentAttached(sport, event) {
		// sport.setState(event.data);
	},

	instrumentDetached(sport, event) {
		// sport.setState(event.data);
	},

	positionAttached(sport, event) {
		// sport.setState(event.data);
	},

	positionDetached(sport, event) {
		// sport.setState(event.data);
	},

	apparatusAttached(sport, event) {
		// sport.setState(event.data);
	},

	apparatusDetached(sport, event) {
		// sport.setState(event.data);
	}
};
