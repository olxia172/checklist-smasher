import { observable, action, runInAction } from "mobx";
import { execute, makePromise } from "apollo-link";
import { getDailyChecklists } from "../../api/queries/dailyChecklists";
import useGraphQL from "../../hooks/useGraphQL";
import SingleChecklist from "./SingleChecklist"

export default class DailyChecklistStore {
  constructor(root, date) {
    this.root = root;
    this.date = date;
    this.sessionKey = this.root.sessionStore.sessionKey
  }

  @observable checklists = []
  @observable errors = null
  @observable isLoading = false

  @action.bound
  async loadDailyChecklists() {
    this.isLoading = true

    try {
      const { data } = await makePromise(
        execute(useGraphQL(this.sessionKey), getDailyChecklists(this.date))
      )
      runInAction(() => {
        data.dailyChecklists.forEach(checklist => this.findOrInitializeChecklist(checklist))
      })
    } catch (error) {
      this.errors = error
    } finally {
      this.isLoading = false
    }
  }

  findOrInitializeChecklist(checklist) {
    const { id: checklistId, name, items } = checklist
    let currentChecklist = this.checklists.find(({ id }) => id === checklistId)

    if (!currentChecklist) {
      currentChecklist = new SingleChecklist(this.root, checklistId, name, this.date, items)
      this.checklists.push(currentChecklist)
    } else {
      currentChecklist.update(items)
    }
  }
}
