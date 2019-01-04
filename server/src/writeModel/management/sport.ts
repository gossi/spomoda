import slugify from 'slugify';
import { Data } from 'wolkenkit';
import { Commands, Events, InitialState } from 'wolkenkit/writeModel';

export const initialState: InitialState = {
	title: '',
	sortTitle: '',

	slug: '',

	athleteLabel: '',

	skillLabel: '',
	skillPluralLabel: '',

	groupLabel: '',
	groupPluralLabel: '',

	instrumentLabel: '',
	instrumentPluralLabel: '',

	positionLabel: '',
	positionPluralLabel: '',

	transitionLabel: '',
	transitionPluralLabel: '',

	featureInstruments: false,
	featureComposition: false,
	featureApparatuses: false,

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
				forAuthenticated: true
			},
			approved: {
				forAuthenticated: true
			},
			rejected: {
				forAuthenticated: true
			},
			edited: {
				forAuthenticated: true
			}
		}
	}
};

function validate(data: Data) {
	const errors: Data = {};

	if (!data.title) {
		errors.title = 'required';
	}

	if (!data.athleteLabel) {
		errors.athleteLabel = 'required';
	}

	if (!data.skillLabel) {
		errors.skillLabel = 'required';
	}

	if (!data.skillPluralLabel) {
		errors.skillPluralLabel = 'required';
	}

	if (data.featureInstruments) {
		if (!data.instrumentLabel) {
			errors.instrumentLabel = 'required';
		}

		if (!data.instrumentPluralLabel) {
			errors.instrumentPluralLabel = 'required';
		}
	}

	if (data.featureComposition) {
		if (!data.transitionLabel) {
			errors.transitionLabel = 'required';
		}

		if (!data.transitionPluralLabel) {
			errors.transitionPluralLabel = 'required';
		}

		if (!data.positionLabel) {
			errors.positionLabel = 'required';
		}

		if (!data.positionPluralLabel) {
			errors.positionPluralLabel = 'required';
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
	}
};
