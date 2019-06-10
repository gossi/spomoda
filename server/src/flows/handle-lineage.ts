'use strict';

import { Identity, InitialState, Reactions, Transitions } from 'wolkenkit/flows/stateful';
import { getDescendents } from '@spomoda/server/src/shared/lineage';

enum FlowState {
	CollectImportance = 'collect-importance'

}

const identity: Identity = {
	'sport.skill.childAdded': event => event.aggregate.id
};

const initialState: InitialState = {
	processedImportanceSkills: new Set(),
	importanceQueue: new Set(),

	is: FlowState.CollectImportance
};

const transitions: Transitions = {};

const reactions: Reactions = {
	[FlowState.CollectImportance]: {
		'sport.skill.childAdded'(flow, event, { app, logger }) {
			const skill = app.lists.skill(event.aggregate.id).read();
			logger.info('read skill', skill);
			// getDescendents(event.aggregate, app);
		}
	}
};

module.exports = { identity, initialState, transitions, reactions };
