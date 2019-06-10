import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Instrument from '@spomoda/web/models/instrument';
import Sport from '@spomoda/web/models/sport';
import Changeset from 'ember-changeset';
import { task } from 'ember-concurrency';
import Task from 'ember-concurrency/task';
import WolkenkitService from 'ember-wolkenkit/services/wolkenkit';

interface ManageInstrumentsArgs {
	instruments: Instrument[]
}

export default class ManageInstrumentsComponent extends Component<ManageInstrumentsArgs> {
	@service wolkenkit!: WolkenkitService;

	@tracked selected?: Instrument;
	@tracked task?: Task;
	deleting?: string;

	get adding(): boolean {
		return this.task === this.addTask;
	}

	@action
	add() {
		this.selected = this.selected && this.selected.id === undefined ? undefined : new Instrument();
		this.task = this.selected ? this.addTask : undefined;
	}

	@action
	select(instrument: Instrument) {
		if (this.deleting === instrument.id) {
			return;
		}

		this.task = this.selected === instrument ? undefined : this.editTask;
		this.selected = this.selected === instrument ? undefined : instrument;
	}

	@action
	remove(id: string) {
		this.deleting = id;
		this.removeTask.perform(id);
	}

	@task(function* (this: ManageInstrumentsComponent, model: Changeset<Instrument>) {
		if (!model.isDirty) {
			return;
		}

		yield this.wolkenkit.command('equipment.instrument.create', 'created', model.change);
		this.task = undefined;
		this.selected = undefined;
		return true;
	}).drop() addTask!: Task;

	@task(function* (this: ManageInstrumentsComponent, model: Changeset<Instrument>) {
		if (!model.isDirty) {
			return;
		}

		yield this.wolkenkit.command('equipment.instrument.edit', 'edited', model.get('id'), model.change);
		model.execute();
		return true;
	}).drop() editTask!: Task;

	@task(function* (this: ManageInstrumentsComponent, id: string) {
		yield this.wolkenkit.command('equipment.instrument.delete', 'deleted', id);
		if (this.selected && this.selected.id === id) {
			this.selected = undefined;
		}
		return true;
	}).drop() removeTask!: Task;
}
