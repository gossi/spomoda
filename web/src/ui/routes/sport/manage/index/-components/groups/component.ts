import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Group from '@spomoda/web/src/data/models/group';
import Sport from '@spomoda/web/src/data/models/sport';
import WolkenkitService from '@spomoda/web/src/services/wolkenkit';
import Changeset from 'ember-changeset';
import { task } from 'ember-concurrency';
import Task from 'ember-concurrency/task';

interface GroupsArgs {
	sport: Sport;
}

export default class GroupsComponent extends Component<GroupsArgs> {

	@service wolkenkit!: WolkenkitService;

	@tracked selected?: Group | null;
	@tracked task?: Task;
	deleting?: string;

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

	@task(function* (this: GroupsComponent, model: Changeset<Group>) {
		if (!model.isDirty) {
			return;
		}

		yield this.wolkenkit.command('sport.group.add', 'added', { sportId: this.args.sport.id, ...model.change });
		this.task = undefined;
		this.selected = undefined;
		return true;
	}).drop() addTask!: Task;

	@task(function* (this: GroupsComponent, model: Changeset<Group>) {
		if (!model.isDirty) {
			return;
		}

		yield this.wolkenkit.command('sport.group.edit', 'edited', model.get('id'), model.change);
		model.execute();
		return true;
	}).drop() editTask!: Task;

	@task(function* (this: GroupsComponent, id: string) {
		yield this.wolkenkit.command('sport.group.remove', 'removed', id);
		if (this.selected && this.selected.id === id) {
			this.selected = undefined;
		}
		return true;
	}).drop() removeTask!: Task;
}