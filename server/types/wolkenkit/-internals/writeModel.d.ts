import { Aggregate, Command, Event, Services } from 'wolkenkit';
//
// INITIAL STATE
//

type AuthenticatedState = {
	/**
	 * Authorization for authenticated users
	 */
	forAuthenticated: boolean;
}

type PublicState = {
	/**
	 * Authorization for guests
	 */
	forPublic: boolean;
}

type AuthorizedState = AuthenticatedState | PublicState;

//
// COMMANDS
//
type CommandMethodSignature = (aggregate: Aggregate, command: Command, services: Services) => void;
type CommandMethodSetup = (...args: any[]) => CommandMethodSignature;
type CommandMiddleWare = CommandMethodSignature[];

//
// EVENTS
//
type EventMethodSignature = (aggregate: Aggregate, event: Event) => void;
