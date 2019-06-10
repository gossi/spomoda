import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Group from '@spomoda/web/models/group';
import Sport from '@spomoda/web/models/sport';
import Changeset from 'ember-changeset';
import { task } from 'ember-concurrency';
import Task from 'ember-concurrency/task';
import WolkenkitService from 'ember-wolkenkit/services/wolkenkit';

interface ManageGroupsArgs {
	sport: Sport;
}

export default class ManageGroupsComponent extends Component<ManageGroupsArgs> {

	@service wolkenkit!: WolkenkitService;

	@tracked selected?: Group | null;
	@tracked task?: Task;
	deleting?: string;

	@action
	add() {
		this.task = this.selected === null ?  undefined : this.addTask;
		this.selected = this.selected === null ? undefined : null;
	}

	@action
	select(group: Group) {
		if (this.deleting === group.id) {
			return;
		}

		this.task = this.selected === group ? undefined : this.editTask;
		this.selected = this.selected === group ? undefined : group;
	}

	@action
	remove(id: string) {
		this.deleting = id;
		this.removeTask.perform(id);
	}

	@task(function* (this: ManageGroupsComponent, model: Changeset<Group>) {
		if (!model.isDirty) {
			return;
		}

		yield this.wolkenkit.command('sport.group.add', 'added', { sportId: this.args.sport.id, ...model.change });
		this.task = undefined;
		this.selected = undefined;
		return true;
	}).drop() addTask!: Task;

	@task(function* (this: ManageGroupsComponent, model: Changeset<Group>) {
		if (!model.isDirty) {
			return;
		}

		yield this.wolkenkit.command('sport.group.edit', 'edited', model.get('id'), model.change);
		model.execute();
		return true;
	}).drop() editTask!: Task;

	@task(function* (this: ManageGroupsComponent, id: string) {
		yield this.wolkenkit.command('sport.group.remove', 'removed', id);
		if (this.selected && this.selected.id === id) {
			this.selected = undefined;
		}
		return true;
	}).drop() removeTask!: Task;
}
