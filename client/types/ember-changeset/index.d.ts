import Changeset from 'ember-changeset';

declare module 'ember-changeset' {

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

	export default class Changeset<T> {
		error: Inflated<ErrLike<any>>;
		change: Inflated<any>;
		errors: Inflated<ErrLike<any>>[];
		changes: Inflated<any>[];
		data: T;
		isValid: boolean;
		isInvalid: boolean;
		isPristine: boolean;
		isDirty: boolean;

		constructor(model: T | Object);

		get(key: string): any;
		set(key: string, value: any): void;
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
	}
}
