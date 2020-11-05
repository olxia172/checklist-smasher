import { observable } from "mobx"
import SingleItem from "./SingleItem"
import _difference from "lodash/difference"

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
  @observable doneItemsCount = 0
  @observable itemsCount = 0
  @observable progress = 0

  update(items) {
    this.loadItems(items)
    this.removeStaleItems(items)
    this.setProgress()
  }

  loadItems(items) {
    items.forEach(item => this.findOrInitializeItem(item))
    this.removeStaleItems(items)
    this.setProgress()
  }

  setProgress() {
    const doneItems = this.items.filter(({ done }) => Boolean(done))

    this.itemsCount = this.items.length
    this.doneItemsCount = doneItems.length
    if (this.itemsCount > 0) {
      this.progress = this.doneItemsCount / this.itemsCount
    }
  }

  findOrInitializeItem(item) {
    const { id: itemId, name, done } = item
    let currentItem = this.items.find(({ id }) => id === itemId)

    if (!currentItem) {
      currentItem = new SingleItem(this.root, this.date, itemId, name, done)
      this.items.push(currentItem)
    } else {
      currentItem.update(name, done)
    }
  }

  removeStaleItems(newItems) {
    const newItemsSmallerThanInitialized = newItems && newItems.length < this.items.length

    if (newItemsSmallerThanInitialized) {
      const newItemsIds = newItems.map(({ id }) => Number(id))
      const currentItemsIds = this.items.map(({ id }) => Number(id))
      const itemsIdsToRemove = _difference(currentItemsIds, newItemsIds)

      this.items = this.items.filter(({ id }) => !itemsIdsToRemove.includes(Number(id)))
    }
  }
}
