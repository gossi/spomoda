import Service from '@ember/service';
import wolkenkit from 'wolkenkit-client';
import ArrayProxy from '@ember/array/proxy';

export default class WokkenkitService extends Service {

	connection!: any;

	async connect() {
		this.connection = await wolkenkit.connect({ host: 'local.wolkenkit.io', port: 3000 });
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

	readOne(name: string, id: string | any) {
		return new Promise((resolve, reject) => {
			this.connection.lists[name].readOne({
				'where': {id}
			})
				.failed((err: any) => {
					reject(err);
				})
				.finished((models: any) => {
					resolve(models);
				});
		});
	}

	live(name: string, options?: any) {
		return new Promise(resolve => {
			const results = ArrayProxy.create();
			this.connection.lists[name].readAndObserve(options)
				.started((models: any) => {
					results.set('content', models);
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
					results.set('content', updated);
				});
			resolve(results);
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
			this.connection[context][model](id)[name](payload)
				.await(event, (event, command) => {
					resolve({event, command});
				})
				.failed((err) => {
					reject(JSON.parse(err.message));
				});
		});
	}
}
