import { AuthorizedState, CommandMethodSignature, CommandMiddleWare, EventMethodSignature } from 'wolkenkit/-internals/writeModel';

/**
 * The initial state contains any values that make up the aggregate's state when no command has yet been run.
 * By default, commands and events can only be run respectively received by the owner of their aggregate.
 * You may want to change this by configuring authorization.
 */
type InitialState = {
	isAuthorized: {
		commands: {
			[key: string]: AuthorizedState;
		},
		events: {
			[key: string]: AuthorizedState;
		}
	}

	[key: string]: any;
}

/**
 * Commands for the `writeModel`
 *
 * Reserved commands:
 *
 * - `transferOwnership`
 * - `authorize`
 */
type Commands = {
	// final transferOwnership: CommandMethodSignature;
	// final authorize: CommandMethodSignature;
	[key: string]: CommandMethodSignature | CommandMiddleWare;
}

/**
 * Events for your `writeModel`
 *
 * Reserved events:
 *
 * - `transferredOwnership`
 * - `authorized`
 */
type Events = {
	// final transferredOwnership: EventMethodSignature;
	// final authorized: EventMethodSignature;
	[key: string]: EventMethodSignature;
}
