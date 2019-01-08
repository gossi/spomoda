declare module 'ember-changeset' {
	import EmberObject from '@ember/object';
	import Evented from '@ember/object/evented';

	export type ValidationOk = true | [true];
	export type ValidationErr = string | Array<string>;
	export type ValidationResult = ValidationOk | ValidationErr;

	export type ErrLike<T> = {
		value: T,
		validation: ValidationErr,
	};

	export type Snapshot = {
		changes: { [key: string]: any },
		errors:  { [key: string]: ErrLike<any> },
	};

	export interface Change {
		value: any;
	}

	type Inflated<T> = {
		[key: string]: Inflated<T> | T,
	};

	export default class Changeset<T extends object> extends EmberObject {
		error: Inflated<ErrLike<any>>;
		change: Inflated<any>;
		errors: Inflated<ErrLike<any>>[];
		changes: Inflated<any>[];
		data: T;
		isValid: boolean;
		isInvalid: boolean;
		isPristine: boolean;
		isDirty: boolean;

		// not yet, see: https://github.com/Microsoft/TypeScript/pull/26797?
		// [P in keyof T]: T[P];

		constructor(model: T);

		prepare(cb: (changes: object[]) => void): void;
		execute(): Changeset<T>;
		save(): Promise<T>;
		merge(changeset: Changeset<T>): Changeset<T>;
		rollback(): Changeset<T>;
		rollbackProperty(key: string): Changeset<T>;
		validate(key?: string): Promise<void>;
		addError(key: string, validate: object): void;
		pushErrors(key: string, ...messages: string[]): void;
		snapshot(): Snapshot;
		restore(snapshot: Snapshot): Changeset<T>;
		isValidating(key?: string): boolean;

		// evented

		/**
		 * Subscribes to a named event with given function.
		 */
		on<Target>(
			name: string,
			target: Target,
			method: (this: Target, ...args: any[]) => void
		): this;
		on(name: string, method: (...args: any[]) => void): this;
		/**
		 * Subscribes a function to a named event and then cancels the subscription
		 * after the first time the event is triggered. It is good to use ``one`` when
		 * you only care about the first time an event has taken place.
		 */
		one<Target>(
			name: string,
			target: Target,
			method: (this: Target, ...args: any[]) => void
		): this;
		one(name: string, method: (...args: any[]) => void): this;
		/**
		 * Triggers a named event for the object. Any additional arguments
		 * will be passed as parameters to the functions that are subscribed to the
		 * event.
		 */
		trigger(name: string, ...args: any[]): any;
		/**
		 * Cancels subscription for given name, target, and method.
		 */
		off<Target>(
			name: string,
			target: Target,
			method: (this: Target, ...args: any[]) => void
		): this;
		off(name: string, method: (...args: any[]) => void): this;
		/**
		 * Checks to see if object has any subscriptions for named event.
		 */
		has(name: string): boolean;
	}

}
