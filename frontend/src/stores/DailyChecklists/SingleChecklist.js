import { observable } from "mobx"
import SingleItem from "./SingleItem"

export default class SingleChecklist {
  constructor(root, id, name, date, items) {
    this.id = id
    this.name = name
    this.date = date
    this.root = root

    this.loadItems(items)
  }

  @observable items = []
  @observable isLoading = false

  update(items) {
    this.loadItems(items)
  }

  loadItems(items) {
    items.forEach(item => this.findOrInitializeItem(item))
  }

  findOrInitializeItem(item) {
    const { id: itemId, name, done } = item
    let currentItem = this.items.find(({ id }) => id === itemId)

    if (!currentItem) {
      currentItem = new SingleItem(this.root, itemId, name, done)
      this.items.push(currentItem)
    } else {
      currentItem.update(name, done)
    }
  }
}
