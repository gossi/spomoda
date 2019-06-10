import { Aggregate } from 'wolkenkit';

interface Data {
	[key: string]: any;
}

interface Logger {
	fatal(...messages: any): void;
	error(...messages: any): void;
	warn(...messages: any): void;
	info(...messages: any): void;
	debug(...messages: any): void;
}

/**
 * A context groups related aggregates.
 */
type DomainContext = {
	[key: string]: (id?: string) => Aggregate;
}

type ReadContext = {
	[key: string]: Aggregate;
}

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
