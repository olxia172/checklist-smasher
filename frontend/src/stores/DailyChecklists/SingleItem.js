import { observable, action } from "mobx"
import { execute, makePromise } from "apollo-link";
import useGraphQL from "../../hooks/useGraphQL";
import toggleDoneItem from "../../api/mutations/toggleDoneItem";

export default class SingleItem {
  @observable name = null
  @observable done = false

  constructor(root, id, name, done) {
    this.root = root
    this.id = id

    this.update(name, done)
  }

  update(name, done) {
    this.name = name
    this.done = done
  }

  async toggleDone() {
    try {
      await makePromise(
        execute(
          useGraphQL(this.root.sessionStore.sessionKey),
          toggleDoneItem(this.id, !this.done)
        )
      )

      this.done = !this.done
    } catch (error) {
      this.errors = error
    } finally {
      await this.root.refresh()
      return true
    }
  }
}
