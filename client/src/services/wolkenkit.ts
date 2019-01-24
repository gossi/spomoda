import { computed } from '@ember-decorators/object';
import { getOwner } from '@ember/application';
import { A } from '@ember/array';
import EmberObject from '@ember/object';
import Service from '@ember/service';
import { singularize } from 'ember-inflector';
import ModelRegistry from 'ember-wolkenkit/types/registries/model';
import wolkenkit from 'wolkenkit-client';

export default class WokkenkitService extends Service {

	connection!: any;

	async connect() {
		this.connection = await wolkenkit.connect({
			host: 'local.wolkenkit.io',
			port: 3000,
			authentication: new wolkenkit.authentication.OpenIdConnect({
				identityProviderUrl: 'https://gossi.eu.auth0.com/authorize',
				clientId: '3X32BTs46P5w3wliDgKPs9oB8TIYgWmv',
				scope: 'profile',
				strictMode: false
			})
		});
	}

	@computed('connection')
	get auth(): any {
		return this.connection.auth;
	}

	private debug(command: string, ...args: any[]) {
		console.log('%c[WOLKENKIT] %c%s', 'color: teal;', 'color: brown;', command, ...args);
	}

	read<K extends keyof ModelRegistry>(name: K, options?: any): Promise<Array<ModelRegistry[K]>> {
		return new Promise((resolve, reject) => {
			this.debug('read', name, 'options:', options);
			this.connection.lists[name].read(options)
				.failed((err: any) => {
					reject(err);
				})
				.finished((collection: any) => {
					this.debug('read', name, 'result:', collection);
					resolve(collection.map((data: any) => this.createModel(name, data)));
				});
		});
	}

	readOne<K extends keyof ModelRegistry>(name: K, idOrOptions: string | object): Promise<ModelRegistry[K]> {
		return new Promise((resolve, reject) => {
			const options = typeof (idOrOptions) === 'string' ? { where: { id: idOrOptions } } : idOrOptions;
			this.debug('readOne', name, 'options:', options);
			this.connection.lists[name].readOne(options)
				.failed((err: any) => {
					reject(err);
				})
				.finished((data: any) => {
					this.debug('readOne:', name, 'result:', data);
					resolve(this.createModel(name, data));
				});
		});
	}

	live<K extends keyof ModelRegistry>(name: K, options?: any): Promise<Array<ModelRegistry[K]>> {
		return new Promise(resolve => {
			const results: Array<ModelRegistry[K]> = A();
			this.debug('live', name, options);
			this.connection.lists[name].readAndObserve(options)
				// .started((entries: any) => {
				// 	this.debug('live', name, 'started()', entries);
				// 	results.setObjects(entries.map(data => this.createModel(name, data)));
				// })
				.updated((models: any) => {
					const updated: any[] = [];
					for (const model of models) {
						const index = updated.findIndex(element => element.id === model.id);
						if (index !== -1) {
							updated[index] = model;
						} else {
							updated.push(model);
						}
					}
					this.debug('live', name, 'updated()', updated);
					results.setObjects(updated.map(data => this.createModel(name, data)));
				});
			resolve(results);
		});
	}

	liveOne<K extends keyof ModelRegistry>(name: K, idOrOptions: string | object): Promise<ModelRegistry[K]> {
		return new Promise(async resolve => {
			const obj = await this.readOne(name, idOrOptions);
			const options = typeof (idOrOptions) === 'string' ? { where: { id: idOrOptions } } : idOrOptions;
			this.debug('liveOne', name);
			this.connection.lists[name].readAndObserve(options)
				// .started((models: any[]) => {
				// 	this.debug('liveOne:', name, 'started()', models);
				// 	if (models.length > 0) {
				// 		obj.setProperties(models[0]);
				// 	}
				// })
				.updated((models: any[]) => {
					this.debug('liveOne', name, 'updated()', models);
					if (models.length > 0) {
						obj.setProperties(models[0]);
					}
				});
			resolve(obj);
		});
	}

	context(context: string) {
		return this.connection[context];
	}

	command(command: string, event: string, idOrPayload: any = {}, maybePayload: any = {}) {
		return new Promise((resolve, reject) => {
			const id = typeof (idOrPayload) === 'string' ? idOrPayload : undefined;
			const payload = typeof (idOrPayload) !== 'string' ? idOrPayload : maybePayload;
			const [context, aggregate, name] = command.split('.');
			this.debug('command sent', command, id ? `(${id})` : '', payload);
			this.connection[context][aggregate](id)[name](payload)
				.delivered(commandObj => {
					this.debug('command delivered', command, commandObj);
				})
				.await(event, (event, command) => {
					this.debug('command sent, event arrived', event, command);
					resolve({event, command});
				})
				.failed((err: any) => {
					this.debug('command failed', err.message);

					let error;
					try {
						error = JSON.parse(err.message);
					} catch (e) {
						error = err.message;
					}

					reject(error);
				});
		});
	}

	createModel<K extends keyof ModelRegistry>(name: K, data: any) {
		const owner = getOwner(this);
		let klass;

		try {
			klass = owner.factoryFor(`model:${singularize((name as string))}`).class;
		} catch (e) {
			klass = EmberObject;
		}

		return klass.create(data);
	}
}
