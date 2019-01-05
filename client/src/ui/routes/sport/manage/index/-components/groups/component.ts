import { service } from '@ember-decorators/service';
import Group from '@spomoda/client/src/data/models/group';
import Sport from '@spomoda/client/src/data/models/sport';
import WolkenkitService from '@spomoda/client/src/services/wolkenkit';
import Changeset from 'ember-changeset';
import { dropTask } from 'ember-concurrency-decorators';
import Task from 'ember-concurrency/task';
import SparklesComponent, { tracked } from 'sparkles-component';

interface GroupsArgs {
	sport: Sport;
}

export default class GroupsComponent extends SparklesComponent<GroupsArgs> {
	@service wolkenkit!: WolkenkitService;

	@tracked groups!: Group[];
	@tracked selected?: Group | null;
	@tracked task?: Task;
	deleting?: string;

	async didInsertElement() {
		if (!this.groups) {
			this.groups = await this.wolkenkit.live('groups', { where: { sportId: this.args.sport.id } });
		}
	}

	add() {
		this.task = this.selected === null ?  undefined : this.addTask;
		this.selected = this.selected === null ? undefined : null;
	}

	select(group: Group) {
		if (this.deleting === group.id) {
			return;
		}

		this.task = this.selected === group ? undefined : this.editTask;
		this.selected = this.selected === group ? undefined : group;
	}

	remove(id: string) {
		this.deleting = id;
		this.removeTask.perform(id);
	}

	@dropTask
	*addTask(model: Changeset<Group>) {
		if (!model.isDirty) {
			return;
		}

		yield this.wolkenkit.command('sport.group.add', 'added', Object.assign({sportId: this.args.sport.id}, model.change));
		this.task = undefined;
		this.selected = undefined;
		return true;
	}

	@dropTask
	*editTask(model: Changeset<Group>) {
		if (!model.isDirty) {
			return;
		}

		yield this.wolkenkit.command('sport.group.edit', 'edited', model.get('id'), model.change);
		model.execute();
		return true;
	}

	@dropTask
	*removeTask(id: string) {
		yield this.wolkenkit.command('sport.group.remove', 'removed', id);
		if (this.selected && this.selected.id === id) {
			this.selected = undefined;
		}
		return true;
	}
}
