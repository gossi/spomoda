import { A } from '@ember/array';
import EmberObject from '@ember/object';
import Service from '@ember/service';
import wolkenkit from 'wolkenkit-client';

export default class WokkenkitService extends Service {

	connection!: any;

	async connect() {
		this.connection = await wolkenkit.connect({ host: 'local.wolkenkit.io', port: 3000 });
	}

	private debug(...args: any[]) {
		console.log('[WOLKENKIT]', ...args);
	}

	read(name: string, options?: any): Promise<any[]> {
		return new Promise((resolve, reject) => {
			this.connection.lists[name].read(options)
				.failed((err: any) => {
					reject(err);
				})
				.finished((models: any) => {
					resolve(models);
				});
		});
	}

	readOne(name: string, idOrOptions: string | object): Promise<EmberObject> {
		return new Promise((resolve, reject) => {
			const options = typeof (idOrOptions) === 'string' ? { where: { id: idOrOptions } } : idOrOptions;
			this.debug('readOne:', name, 'options:', options);
			this.connection.lists[name].readOne(options)
				.failed((err: any) => {
					reject(err);
				})
				.finished((model: any) => {
					this.debug('readOne:', name, 'result:', model);
					resolve(EmberObject.create(model));
				});
		});
	}

	live(name: string, options?: any): Promise<any[]> {
		return new Promise(resolve => {
			const results = A();
			this.debug('live:', name);
			this.connection.lists[name].readAndObserve(options)
				.started((models: any) => {
					this.debug('live:', name, 'started()', models);
					results.setObjects(models);
				})
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
					this.debug('live:', name, 'updated()', updated);
					results.setObjects(updated);
				});
			resolve(results);
		});
	}

	liveOne(name: string, idOrOptions: string | object) {
		return new Promise(async (resolve) => {
			const obj = await this.readOne(name, idOrOptions);
			const options = typeof (idOrOptions) === 'string' ? { where: { id: idOrOptions } } : idOrOptions;
			this.debug('liveOne:', name);
			this.connection.lists[name].readAndObserve(options)
				.started((models: any[]) => {
					this.debug('liveOne:', name, 'started()', models);
					if (models.length > 0) {
						obj.setProperties(models[0]);
					}
				})
				.updated((models: any[]) => {
					this.debug('liveOne:', name, 'updated()', models);
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
			const [context, model, name] = command.split('.');
			this.debug('command sent:', command, id ? `(${id})` : '', payload);
			this.connection[context][model](id)[name](payload)
				.await(event, (event, command) => {
					this.debug('command sent, event arrived:', event, command);
					resolve({event, command});
				})
				.failed((err) => {
					this.debug('command failed:', err.message);

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
}
