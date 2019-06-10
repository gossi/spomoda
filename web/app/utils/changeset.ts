
export default class Changeset<T extends object> {
	changes = {};

	constructor(target: T) {
		return new Proxy(target: T, {
			get: function(target, prop) {
				if (prop === 'secret') {
					return `${target.secret.substr(0, 4)} ... shhhh!`;
				} else {
					return Reflect.get(...arguments);
				}
			}
		});
	}
}
