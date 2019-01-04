declare module 'wolkenkit' {

	import { Commands, Entity, Metadata } from 'wolkenkit/internals';

	interface Data {
		[key: string]: any;
	}

	interface App {
		[key: string]: Context;
	}

	/**
	 * A context groups related aggregates.
	 */
	type Context = {
		[key: string]: (id?: string) => Aggregate;
	}

	/**
	 * An aggregate embraces logically related commands and events. It contains the state that is necessary
	 * to decide whether to publish events, and thereby update the application state.
	 */
	type Aggregate = Commands & {
		state: Data;
		id: string;
		events: {
			publish(name: string, data?: Data): void;
		};

		setState(data: Data): void;
		exists(): boolean;
	}

	interface Services {
		app: App;
	}

	/**
	 * A command is a request to update the application state. They are typically caused by some user interaction,
	 * but they can also be caused programmatically. A command contains data as well as metadata. Its name is
	 * phrased using the imperative, as it represents an instruction given to the application.
	 */
	interface Command extends Entity {
		reject(error: any): void;
	}

	enum EventType {
		DOMAIN = 'domain',
		READ_MODEL = 'readModel'
	}

	/**
	 * An event is a fact that has happened and that can not be undone. An event contains data and metadata. An event's
	 * name is phrased using past tense. Events are published by the write model, so that the read model as well as
	 * clients can react to them. Additionally, they are stored in the event store.
	 */
	interface Event extends Entity {
		type: EventType;

		metadata: Metadata & {
			isAuthorized: {
				/**
				 * The id of the user that owns the aggregate instance that published this event.
				 */
				owner: string;

				/**
				 * et to true, if authenticated users are allowed to receive this event; otherwise false.
				 */
				forAuthenticated: boolean;

				/**
				 * Set to true, if public users are allowed to receive this event; otherwise false.
				 */
				forPublic: boolean;
			}
		}
	}
}

declare module 'wolkenkit/internals' {
	import { Data } from 'wolkenkit';

	interface CommandMethod {
		(): void;
		(data: Data): void;
	}

	interface Commands {
		[key: string]: CommandMethod;
	}

	type Metadata = {
		/**
		 * The point in time when the event was published.
		 */
		timestamp: number;

		/**
		 * The id of the command that caused this event.
		 */
		causationId: string;

		/**
		 * The id of the command that led to this event.
		 */
		correlationId: string;
	};

	interface Entity {
		name: string;
		id: string;

		context: {
			name: string;
		};

		/**
		 * The aggregate that published the event.
		 */
		aggregate: {
			name: string;
			id: string;
		};

		/**
		 * The data of the event. This contains any values that you have provided when you published the event.
		 */
		data: Data;

		user: null | {
			/**
			 * The id will be set to the subject of the command's JWT token provided by your identity provider.
			 */
			id: string;

			/**
			 * @TODO What is in the token?
			 */
			token?: any;
		};

		metadata: Metadata;
	}
}

declare module 'wolkenkit/query' {
	import { Data } from 'wolkenkit';

	type UpdateData = {
		where: WhereClause;
		set: SetData;
	}

	type SetOperators = {
		/**
		 * Decreases the field by the given value.
		 */
		$decrementBy: number;

		/**
		 * Divides the field by the given value.
		 */
		$divideBy: number;

		/**
		 * Increments the field by the given value.
		 */
		$incrementBy: number;

		/**
		 * Multiplies the field by the given value.
		 */
		$multiplyBy: number;

		/**
		 * Adds the given value to the array.
		 */
		$add: any;

		/**
		 * Removes the given value from the array.
		 */
		$remove: any;
	}

	type SetData = Data | {
		[key: string]: SetOperators;
	}

	type LogicalOperators = {
		/**
		 * Matches items that match all conditions.
		 */
		$or: WhereClause[];

		/**
		 * Matches items that match at least one condition.
		 */
		$and: WhereClause[];
	}

	type WhereOperators = {
		/**
		 * Matches fields greater than the given value.
		 */
		$greaterThan: number;

		/**
		 * Matches fields greater than or equal to the given value.
		 */
		$greaterThanOrEqualTo: number;

		/**
		 * Matches fields less than the given value.
		 */
		$lessThan: number;

		/**
		 * Matches fields less than or equal to the given value.
		 */
		$lessThanOrEqualTo: number;

		/**
		 * Matches fields not equal to the given value.
		 */
		$notEqualTo: any;

		/**
		 * Matches arrays that contain the given value.
		 */
		$contains: any;

		/**
		 * Matches arrays that do not contain the given value.
		 */
		$doesNotContain: any;
	}

	type WhereClause = Data | LogicalOperators | {
		[key: string]: WhereOperators;
	}

	enum Sort {
		ASC = 'ascending',
		DESC = 'descending'
	}

	type Query = {
		where: WhereClause;
		orderBy?: {
			[key: string]: Sort;
		}
		skip?: number,
		take?: number;
	}
}

declare module 'wolkenkit/readModel' {
	import { Data } from 'wolkenkit';
	import { Query, UpdateData, WhereClause } from 'wolkenkit/query';
	import { ListAdd, ListRead, ListReadAndObserve, ListReadOne, ProjectionMethodSignature } from 'wolkenkit/readModel/internals';

	type Fields = {
		[key: string]: {
			initialState: any,
			fastLookup?: boolean;
			isUnique?: boolean;
		}
	}

	type Projections = {
		[key: string]: ProjectionMethodSignature;
	}

	// @TODO I split List and Reading List, maybe for later use in wolkenkit-client ?

	interface ReadingList {
		read(query: Query): ListRead;
		readOne(query: Query): ListReadOne;
		readAndObserve(query: Query): ListReadAndObserve;
	}

	interface List extends ReadingList {
		/**
		 * Add an item to the list
		 *
		 * @param data the data to add
		 */
		add(data: Data): ListAdd;

		/**
		 * Update an item in the list
		 *
		 * @param data provide a where clause and an update expression
		 */
		update(data: UpdateData): void;

		/**
		 * Remove an item from the list
		 *
		 * @param data provide a where clause
		 */
		remove(data: { where: WhereClause }): void;
	}
}

declare module 'wolkenkit/readModel/internals' {
	import { Event, Services } from 'wolkenkit';
	import { UpdateData } from 'wolkenkit/query';
	import { List } from 'wolkenkit/readModel';

	type ProjectionMethodSignature = (aggregate: List, event: Event, services: Services) => void;

	interface ListAdd {
		orUpdate(data: UpdateData): void;
		orDiscard(): void;
	}

	interface ListRead {
		failed(cb: (error: any) => void): ListRead;
		finished(cb: (models: any[]) => void): ListRead;
	}

	interface ListReadOne {
		failed(cb: (error: any) => void): ListReadOne;
		finished(cb: (model: any) => void): ListReadOne;
	}

	interface ListReadAndObserve {
		failed(cb: (error: any) => void): ListReadOne;
		started(cb: (models: any[], cancel: Function) => void): ListReadOne;
		updated(cb: (models: any[], cancel: Function) => void): ListReadOne;
	}
}

declare module 'wolkenkit/writeModel' {
	import { AuthorizedState, CommandMethodSignature, CommandMiddleWare, EventMethodSignature } from 'wolkenkit/writeModel/internals';

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
}

declare module 'wolkenkit/writeModel/internals' {
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

}
