import { action, observable } from "mobx"
import DailyChecklistStore from "./DailyChecklistStore"
import { toString } from "../../helpers/dateHelpers"

export default class AllChecklistsStore {
  @observable newDailyChecklists = []
  @observable areChecklistsFetched = false

  constructor(root) {
    this.root = root;
  }

  @action.bound
  async newGetMyDailyChecklists(newDate = toString(new Date())) {
    this.areChecklistsFetched = false

    try {
      let checklist = this.newDailyChecklists.find(({ date }) => date === newDate)

      if (!checklist) {
        checklist = new DailyChecklistStore(this.root, newDate)
      }
      await checklist.loadDailyChecklists()
      this.newDailyChecklists.push(checklist)
    } catch (error) {
      this.errors = error
    } finally {
      this.areChecklistsFetched = true

      return this.areChecklistsFetched
    }
  }
}
