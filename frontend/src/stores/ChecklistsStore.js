import { decorate, observable } from "mobx"

class ChecklistsStore {
  checklists = []
}

decorate(ChecklistsStore, {
  checklists: observable
})

export default new ChecklistsStore()