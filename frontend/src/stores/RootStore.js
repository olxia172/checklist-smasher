import ChecklistStore from "./ChecklistsStore"

export default class RootStore {
  constructor() {
    this.checklistsStore = new ChecklistStore(this)
  }

  setup() {
    this.checklistsStore.getChecklists()
  }
}