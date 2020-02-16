import ChecklistStore from './ChecklistsStore'
import ItemStore from './ItemStore'

export default class RootStore {
  constructor() {
    this.checklistsStore = new ChecklistStore(this)
    this.itemStore = new ItemStore(this)
  }

  setup() {
    this.checklistsStore.getChecklists()
  }

  refresh() {
    this.checklistsStore.getChecklists()
  }
}