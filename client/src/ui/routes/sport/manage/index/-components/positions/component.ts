import { service } from '@ember-decorators/service';
import Position from '@spomoda/client/src/data/models/position';
import Sport from '@spomoda/client/src/data/models/sport';
import WolkenkitService from '@spomoda/client/src/services/wolkenkit';
import Changeset from 'ember-changeset';
import { dropTask } from 'ember-concurrency-decorators';
import Task from 'ember-concurrency/task';
import SparklesComponent, { tracked } from 'sparkles-component';

interface PositionsArgs {
	sport: Sport;
}

export default class PositionsComponent extends SparklesComponent<PositionsArgs> {
	@service wolkenkit!: WolkenkitService;

	@tracked positions!: Position[];
	@tracked selected?: Position | null;
	@tracked task?: Task;
	deleting?: string;

	async didInsertElement() {
		if (!this.positions) {
			this.positions = await this.wolkenkit.live('positions', { where: { sportId: this.args.sport.id } });
		}
	}

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

	@dropTask
	*addTask(model: Changeset<Position>) {
		if (!model.isDirty) {
			return;
		}

		yield this.wolkenkit.command('sport.position.add', 'added', Object.assign({sportId: this.args.sport.id}, model.change));
		this.task = undefined;
		this.selected = undefined;
		return true;
	}

	@dropTask
	*editTask(model: Changeset<Position>) {
		if (!model.isDirty) {
			return;
		}

		yield this.wolkenkit.command('sport.position.edit', 'edited', model.get('id'), model.change);
		model.execute();
		return true;
	}

	@dropTask
	*removeTask(id: string) {
		yield this.wolkenkit.command('sport.position.remove', 'removed', id);
		this.task = undefined;
		return true;
	}
}
