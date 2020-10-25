import { observable } from "mobx"

export default class SingleItem {
  constructor(root, id, name, done) {
    this.root = root
    this.id = id

    this.update(name, done)
  }

  @observable name = null
  @observable done = false 

  update(name, done) {
    this.name = name
    this.done = done
  }
}
