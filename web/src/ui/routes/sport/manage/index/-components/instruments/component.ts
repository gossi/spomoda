import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Instrument from '@spomoda/web/src/data/models/instrument';
import Sport from '@spomoda/web/src/data/models/sport';
import WolkenkitService from '@spomoda/web/src/services/wolkenkit';
import Changeset from 'ember-changeset';
import Task from 'ember-concurrency/task';
import { task } from 'ember-concurrency';

interface InstrumentsArgs {
	sport: Sport;
}

export default class InstrumentsComponent extends Component<InstrumentsArgs> {
	@service wolkenkit!: WolkenkitService;

	@tracked instruments!: Instrument[];
	@tracked selected?: Instrument | null;
	@tracked task?: Task;
	deleting?: string;

	add() {
		this.task = this.selected === null ?  undefined : this.addTask;
		this.selected = this.selected === null ? undefined : null;
	}

	select(instrument: Instrument) {
		if (this.deleting === instrument.id) {
			return;
		}

		this.task = this.selected === instrument ? undefined : this.editTask;
		this.selected = this.selected === instrument ? undefined : instrument;
	}

	remove(id: string) {
		this.deleting = id;
		this.removeTask.perform(id);
	}

	@task(function* (this: InstrumentsComponent, model: Changeset<Instrument>) {
		if (!model.isDirty) {
			return;
		}

		yield this.wolkenkit.command('sport.instrument.add', 'added', Object.assign({ sportId: this.args.sport.id }, model.change));
		this.task = undefined;
		this.selected = undefined;
		return true;
	}).drop() addTask!: Task;

	@task(function* (this: InstrumentsComponent, model: Changeset<Instrument>) {
		if (!model.isDirty) {
			return;
		}

		yield this.wolkenkit.command('sport.instrument.edit', 'edited', model.get('id'), model.change);
		model.execute();
		return true;
	}).drop() editTask!: Task;

	@task(function* (this: InstrumentsComponent, id: string) {
		yield this.wolkenkit.command('sport.instrument.remove', 'removed', id);
		if (this.selected && this.selected.id === id) {
			this.selected = undefined;
		}
		return true;
	}).drop() removeTask!: Task;
}
