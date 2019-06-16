// based on: https://github.com/poteto/validated-proxy
// but deeply nested

import { notifyPropertyChange } from '@ember/object';

interface CacheValue<T> {
	key: string;

	value: T;

	validated?: boolean;

	isValid?: boolean;

	isInvalid?: boolean;
}

type BufferCache<T> = {
	[P in keyof T]: CacheValue<T[P]>;
}

interface BufferChange<T> {
	key: string;
	value: T;
}

export type ValidationError = {
	key: string;
	value: any;
	messages: string | string[];
}

type ManualErrors<T> = {
	[P in keyof T]?: ValidationError;
}

class BufferedProxy<T extends object, K extends keyof T> {
	[key: string]: unknown;

	private target: T;

	private cache: Partial<BufferCache<T>> = Object.create(null);

	private nested: Map<K, Changeset<any>> = new Map();

	private manualErrors: ManualErrors<T> = Object.create(null);

	constructor(target: T) {
		this.target = target;

		for (const [key, value] of Object.entries(target)) {
			if (typeof (value) === 'object') {
				this.nested.set(key as K, changeset(value));
			}
		}
	}

	/**
	 * Returns cached changes as an object.
	 *
	 * ```ts
	 * bufferedProxy.changed; // { name: 'Lauren' };
	 * ```
	 */
	public get changed(): Partial<T> {
		return this.values.reduce((acc, { key, value }) => {
			acc[key] = value;
			return acc;
		}, Object.create(null));
	}

	/**
	 * Returns cached changes as an array.
	 *
	 * ```ts
	 * bufferedProxy.changes; // [{ key: 'name', value: 'Lauren' }]
	 * ```
	 */
	public get changes(): BufferChange<T[K]>[] {
		return this.values.map(({ key, value }) => {
			return { key, value };
		});
	}

	get isPristine(): boolean {
		return Object.values(this.cache).length === 0;
	};

	get isDirty(): boolean {
		return !this.isPristine;
	}

	set(key: K, value: any) {
		let notify = false;
		const pristine = this.isPristine;

		if (this.cache[key] && value === this.get(key)) {
			delete this.cache[key];
			notify = true;
		} else if (this.changed[key] !== value) {
			this.updateCache(key, {
				key: (key as string),
				value: value,
				validated: false
			});
			notify = true;
		}

		if (notify) {
			notifyPropertyChange(this.target, key as string);

			if (pristine !== this.isPristine) {
				notifyPropertyChange(this, 'changes');
				notifyPropertyChange(this, 'changed');
				notifyPropertyChange(this, 'isPristine');
				notifyPropertyChange(this, 'isDirty');
			}
		}
	}

	get(key: K): any {
		if ((key as string).includes('.')) {
			const parts = (key as string).split('.');
			const next = parts.shift();
			const sub = this.get(next as K);

			if (sub) {
				return sub.get(parts.join('.'));
			}
		}

		if (this.nested.has(key)) {
			return this.nested.get(key);
		}

		if (this.changed[key]) {
			return this.changed[key];
		}

		if (key in this) {
			return this[key as string];
		}

		return this.target[key];
	}

	rollback() {
		this.cache = Object.create(null);
	}

	/**
	 * Returns cached errors as an object.
	 *
	 * ```ts
	 * bufferedProxy.errored;
	 * {
	 *   name: {
	 *     value: 'Lauren Elizabeth',
	 *     messages: ['Name is too long']
	 *   }
	 * };
	 * ```
	 */
	get errored(): ManualErrors<T> {
		return this.manualErrors;
	}

	/**
	 * Returns cached errors as an array.
	 *
	 * ```ts
	 * bufferedProxy.errors;
	 * [
	 *   { key: 'name', messages: ['must be letters'], value: 123 }
	 * ]
	 * ```
	 */
	get errors(): ValidationError[] {
		return Object.values(this.manualErrors);
	}

	addError(key: string, error: ValidationError | string) {
		if (typeof(error) === 'string' && this.cache[key as K]) {
			error = {
				key,
				value: this.changed[key as K],
				messages: error
			};
		}
		this.manualErrors[key as K] = error as ValidationError;
	}

	private updateCache(key: keyof T, value: CacheValue<T[K]>) {
		this.cache[key] = value;
	}

	private get values(): CacheValue<T[K]>[]{
		return (Object.values(this.cache) as CacheValue<T[K]>[]);
	}
}

type BufferedChangeset<T extends object> = {
	[K in keyof T]: T[K];
}

export type Changeset<T extends object> = BufferedChangeset<T> & BufferedProxy<T, keyof T>;

export function changeset<T extends object>(target: T) {
	const proxy = new BufferedProxy(target) as Changeset<T>;

	return new Proxy(proxy, {
		get: function (proxyTarget, key) {
			return proxyTarget.get(key as keyof T);
		},

		set: function (proxyTarget, key, value, _receiver) {
			proxyTarget.set(key as keyof T, value);

			return true;
		}
	});
}

// export default class Changeset<T extends object> {
// 	/**
// 	 * Changeset factory
// 	 *
// 	 */
// 	constructor(target: T) {
// 		return changeset(target);
// 	}

// 	// changes!: Partial<T>;
// 	// errors!: Partial<T>;

// 	// isPristine!: boolean;
// 	// isDirty!: boolean;
// }
