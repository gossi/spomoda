import { service } from '@ember-decorators/service';
import Controller from '@ember/controller';
import Instrument from '@spomoda/client/src/data/models/instrument';
import Position from '@spomoda/client/src/data/models/position';
import WolkenkitService from '@spomoda/client/src/services/wolkenkit';
import Changeset from 'ember-changeset';
import { dropTask } from 'ember-concurrency-decorators';
import { Task } from 'ember-concurrency/-task-property';
import { tracked } from 'sparkles-component';

export default class SportManageIndexController extends Controller {

	@service wolkenkit!: WolkenkitService;

	@tracked instruments: Instrument[] = [];
	@tracked selectedInstrument?: Instrument | {};
	@tracked instrumentTask?: Task;

	@tracked positions: Position[] = [];
	@tracked selectedPosition?: Position | {};
	@tracked positionTask?: Task;

	async setup() {
		// this.groups = await this.wolkenkit.live('groups', { where: { sportId: this.model.id } });
		this.positions = await this.wolkenkit.live('positions', { where: { sportId: this.model.id } });
	}

	//
	// POSITIOM
	//

	addPosition() {
		this.selectedPosition = {};
		this.positionTask = this.addPositionTask;
	}

	selectPosition(position: Position) {
		this.selectedPosition = position;
		this.positionTask = this.editPositionTask;
	}

	removePosition(id: string) {
		this.removePositionTask.perform(id);
	}

	@dropTask
	*addPositionTask(model: Changeset<Position>) {
		if (!model.isDirty) {
			return;
		}

		yield this.wolkenkit.command('sport.position.add', 'added', Object.assign({sportId: this.model.id}, model.change));
		this.selectedPosition = undefined;
		return true;
	}

	@dropTask
	*editPositionTask(model: Changeset<Position>) {
		if (!model.isDirty) {
			return;
		}

		yield this.wolkenkit.command('sport.position.edit', 'edited', model.id, model.change);
		model.execute();
		return true;
	}

	@dropTask
	*removePositionTask(id: string) {
		yield this.wolkenkit.command('sport.position.remove', 'removed', id);
		if (this.selectedPosition.id === id) {
			this.selectedPosition = undefined;
		}
		return true;
	}
}
