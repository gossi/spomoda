import Changeset from 'ember-changeset';

export function changesetToPayload(changeset: Changeset<any>) {
	return changeset.changes.reduce((prev, obj) => {
		prev[obj.key] = obj.value;
		return prev;
	}, {});
}
