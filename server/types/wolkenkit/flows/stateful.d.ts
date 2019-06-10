import { Event, Services } from 'wolkenkit';

interface Flow {
	is: string;
	[key: string]: any;

	setState(state: object): void;
	transitionTo(newState: string): void;
}

interface Identity {
	[key: string]: (event: Event) => string;
}

interface InitialState {
	is: string;
	[key: string]: any;
}

interface Transitions {
	[key: string]: {
		[key: string]: (flow: Flow, event: Event, services: Services) => void;
	}
}

interface Reactions {
	[key: string]: {
		[key: string]: (flow: Flow, event: Event, services: Services) => void;
	}
}
