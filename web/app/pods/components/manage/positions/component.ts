import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Position from '@spomoda/web/models/position';
import Changeset from 'ember-changeset';
import { task } from 'ember-concurrency';
import Task from 'ember-concurrency/task';
import WolkenkitService from 'ember-wolkenkit/services/wolkenkit';

interface HumanPositionsArgs {
	positions: Position[];
}

export default class HumanPositionsComponent extends Component<HumanPositionsArgs> {

	@service wolkenkit!: WolkenkitService;

	@tracked positions!: Position[];
	@tracked selected?: Position | null;
	@tracked task?: Task;
	deleting?: string;

	@action
	add() {
		this.selected = this.selected && this.selected.id === undefined ? undefined : new Position();
		this.task = this.selected ? this.addTask : undefined;
	}

	@action
	select(position: Position) {
		if (position.id === this.deleting) {
			return;
		}

		this.task = this.selected === position ? undefined : this.editTask;
		this.selected = this.selected === position ? undefined : position;
	}

	@action
	remove(id: string) {
		this.deleting = id;
		this.removeTask.perform(id);
	}

	@task(function* (this: HumanPositionsComponent, model: Changeset<Position>) {
		if (!model.isDirty) {
			return;
		}

		yield this.wolkenkit.command('human.position.create', 'created',  model.change);
		this.task = undefined;
		this.selected = undefined;
		return true;
	}).drop() addTask!: Task;

	@task(function* (this: HumanPositionsComponent, model: Changeset<Position>) {
		if (!model.isDirty) {
			return;
		}

		yield this.wolkenkit.command('human.position.edit', 'edited', model.get('id'), model.change);
		model.execute();
		return true;
	}).drop() editTask!: Task;

	@task(function* (this: HumanPositionsComponent, id: string) {
		yield this.wolkenkit.command('human.position.delete', 'deleted', id);
		this.task = undefined;
		return true;
	}).drop() removeTask!: Task;
}
