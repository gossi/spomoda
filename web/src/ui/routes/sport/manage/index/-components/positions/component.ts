import { inject as service } from '@ember/service';
import Position from '@spomoda/web/src/data/models/position';
import Sport from '@spomoda/web/src/data/models/sport';
import WolkenkitService from '@spomoda/web/src/services/wolkenkit';
import Changeset from 'ember-changeset';
import Task from 'ember-concurrency/task';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { task } from 'ember-concurrency';

interface PositionsArgs {
	sport: Sport;
}

export default class PositionsComponent extends Component<PositionsArgs> {

	@service wolkenkit!: WolkenkitService;

	// @tracked positions!: Position[];
	@tracked selected?: Position | null;
	@tracked task?: Task;
	deleting?: string;

	add() {
		this.task = this.selected === null ?  undefined : this.addTask;
		this.selected = this.selected === null ? undefined : null;
	}

	select(position: Position) {
		if (position.id === this.deleting) {
			return;
		}

		this.task = this.selected === position ? undefined : this.editTask;
		this.selected = this.selected === position ? undefined : position;
	}

	remove(id: string) {
		this.deleting = id;
		this.removeTask.perform(id);
	}

	@task(function* (this: PositionsComponent, model: Changeset<Position>) {
		if (!model.isDirty) {
			return;
		}

		yield this.wolkenkit.command('sport.position.add', 'added', Object.assign({ sportId: this.args.sport.id }, model.change));
		this.task = undefined;
		this.selected = undefined;
		return true;
	}).drop() addTask!: Task;

	@task(function* (this: PositionsComponent, model: Changeset<Position>) {
		if (!model.isDirty) {
			return;
		}

		yield this.wolkenkit.command('sport.position.edit', 'edited', model.get('id'), model.change);
		model.execute();
		return true;
	}).drop() editTask!: Task;

	@task(function* (this: PositionsComponent, id: string) {
		yield this.wolkenkit.command('sport.position.remove', 'removed', id);
		this.task = undefined;
		return true;
	}).drop() removeTask!: Task;
}
