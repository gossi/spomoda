import { Commands, Data, DomainContext, Entity, Logger, Metadata, ReadContext } from 'wolkenkit/-internals';
import { Query } from 'wolkenkit/-internals/query';

interface DomainApp {
	[key: string]: DomainContext;
}

export type App = DomainApp & {
	lists: ReadContext;
}

/**
 * An aggregate embraces logically related commands and events. It contains the state that is necessary
 * to decide whether to publish events, and thereby update the application state.
 */
export type Aggregate = Commands & {
	state: Data;
	id: string;
	events: {
		publish(name: string, data?: Data): void;
	};

	setState(data: Data): void;
	exists(): boolean;
	read(query: Query): Entity;
	readOne(query: Query): Entity;
}

export interface Services {
	app: App;
	logger: Logger;
}

/**
 * A command is a request to update the application state. They are typically caused by some user interaction,
 * but they can also be caused programmatically. A command contains data as well as metadata. Its name is
 * phrased using the imperative, as it represents an instruction given to the application.
 */
export interface Command extends Entity {
	reject(error: any): void;
}

declare enum EventType {
	DOMAIN = 'domain',
	READ_MODEL = 'readModel'
}

/**
 * An event is a fact that has happened and that can not be undone. An event contains data and metadata. An event's
 * name is phrased using past tense. Events are published by the write model, so that the read model as well as
 * clients can react to them. Additionally, they are stored in the event store.
 */
export interface Event extends Entity {
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
