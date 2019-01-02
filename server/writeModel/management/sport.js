'use strict';

const slugify = require('slugify');

const initialState = {
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
				forPublic: true
			},
			approve: {
				forPublic: true
			},
			reject: {
				forPublic: true
			},
			edit: {
				forPublic: true
			}
		},
		events: {
			suggested: {
				forPublic: true
			},
			approved: {
				forPublic: true
			},
			rejected: {
				forPublic: true
			},
			edited: {
				forPublic: true
			}
		}
	}
};

function validate(data) {
	const errors = {};
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

const commands = {
	suggest(sport, command) {
		const errors = validate(command.data);

		if (Object.keys(errors).length) {
			return command.reject(JSON.stringify(errors));
		}

		if (!command.data.slug) {
			command.data.slug = slugify(command.data.title, {lower: true});
		}

		if (!command.data.sortTitle) {
			command.data.sortTitle = command.data.title;
		}

		sport.events.publish('suggested', command.data);
	},

	approve(sport, command) {
		sport.events.publish('approved', {
			approved: true
		});
	},

	reject(sport, command) {
		sport.events.publish('rejected');
	},

	edit(sport, command) {
		sport.events.publish('edited', command.data);
	}
};

const events = {
	suggested(sport, event) {
		sport.setState(event.data);
	},

	approved(sport, event) {
		sport.setState({
			approved: event.data.approved
		});
	},

	rejected(sport, event) {
		// does nothing here - d'uh
	},

	edited(sport, event) {
		sport.setState(event.data);
	}
};

module.exports = {
	initialState,
	commands,
	events
};
