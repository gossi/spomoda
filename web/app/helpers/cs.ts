import { helper } from '@ember/component/helper';
import { Changeset } from '@spomoda/web/utils/changeset';

export default helper(function ([target, key]: [Changeset<any>, string]) {
	return function (value: any) {
		target.set(key, value);
	}
});
