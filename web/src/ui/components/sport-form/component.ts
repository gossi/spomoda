import Sport from '@spomoda/web/src/data/models/sport';
import Task from 'ember-concurrency/task';
import Component from '@glimmer/component';

interface SportFormArgs {
	sport?: Sport;
	task: Task;
}

export default class SportFormComponent extends Component<SportFormArgs> {

	get sport(): Sport {
		if (this.args.sport) {
			return this.args.sport;
		}

		return Sport.create();
	}
}
