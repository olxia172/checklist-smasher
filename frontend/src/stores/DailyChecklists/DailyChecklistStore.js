import { observable, action, runInAction } from "mobx";
import { execute, makePromise } from "apollo-link";
import { getDailyChecklists } from "../../api/queries/dailyChecklists";
import useGraphQL from "../../hooks/useGraphQL";
import SingleChecklist from "./SingleChecklist"
import _difference from "lodash/difference"

export default class DailyChecklistStore {
  constructor(root, date) {
    this.root = root;
    this.date = date;
  }

  @observable checklists = []
  @observable errors = null
  @observable isLoading = false

  @action.bound
  async loadDailyChecklists() {
    this.isLoading = true

    try {
      const { data } = await makePromise(
        execute(useGraphQL(this.root.sessionStore.sessionKey), getDailyChecklists(this.date))
      )

      runInAction(() => {
        data.dailyChecklists.forEach(checklist => this.findOrInitializeChecklist(checklist))
        this.removeStaleChecklists(data.dailyChecklists)
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

  removeStaleChecklists(newChecklistsData) {
    const newChecklistsSmallerThanInitialized = newChecklistsData && newChecklistsData.length < this.checklists.length

    if (newChecklistsSmallerThanInitialized) {
      const newChecklstsIds = newChecklistsData.map(({ id }) => Number(id))
      const currentChecklistsIds = this.checklists.map(({ id }) => Number(id))
      const checklistsIdsToRemove = _difference(currentChecklistsIds, newChecklstsIds)

      this.checklists = this.checklists.filter(({ id }) => !checklistsIdsToRemove.includes(Number(id)))
    }
  }
}
