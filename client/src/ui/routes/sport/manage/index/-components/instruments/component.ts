import { service } from '@ember-decorators/service';
import Instrument from '@spomoda/client/src/data/models/instrument';
import Sport from '@spomoda/client/src/data/models/sport';
import WolkenkitService from '@spomoda/client/src/services/wolkenkit';
import Changeset from 'ember-changeset';
import { dropTask } from 'ember-concurrency-decorators';
import SparklesComponent, { tracked } from 'sparkles-component';
import { Task } from 'ember-concurrency/-task-property';

interface InstrumentsArgs {
	sport: Sport;
}

export default class InstrumentsComponent extends SparklesComponent<InstrumentsArgs> {
	@service wolkenkit!: WolkenkitService;

	@tracked instruments!: Instrument[];
	@tracked selected?: Instrument | null;
	@tracked task?: Task;
	deleting?: string;

	async didInsertElement() {
		if (!this.instruments) {
			this.instruments = await this.wolkenkit.live('instruments', { where: { sportId: this.args.sport.id } });
		}
	}

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

	@dropTask
	*addTask(model: Changeset<Instrument>) {
		if (!model.isDirty) {
			return;
		}

		yield this.wolkenkit.command('sport.instrument.add', 'added', Object.assign({sportId: this.args.sport.id}, model.change));
		this.task = undefined;
		return true;
	}

	@dropTask
	*editTask(model: Changeset<Instrument>) {
		if (!model.isDirty) {
			return;
		}

		yield this.wolkenkit.command('sport.instrument.edit', 'edited', model.get('id'), model.change);
		model.execute();
		return true;
	}

	@dropTask
	*removeTask(id: string) {
		yield this.wolkenkit.command('sport.instrument.remove', 'removed', id);
		if (this.selected && this.selected.id === id) {
			this.selected = undefined;
		}
		return true;
	}
}
