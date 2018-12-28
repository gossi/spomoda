'use strict';

const slugify = require('slugify');

const initialState = {
	title: '',
	sortTitle: '',
	athleteLabel: '',
	objectLabel: '',
	objectPluralLabel: '',
	skillLabel: '',
	skillPluralLabel: '',
	groupLabel: '',
	groupPluralLabel: '',
	transitionLabel: '',
	transitionPluralLabel: '',
	positionLabel: '',
	featureComposition: false,
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
	}
};

module.exports = {
	initialState,
	commands,
	events
};
