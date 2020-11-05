import { observable, action } from "mobx"
import { execute, makePromise } from "apollo-link";
import useGraphQL from "../../hooks/useGraphQL";
import toggleDoneItem from "../../api/mutations/toggleDoneItem";

export default class SingleItem {
  @observable name = null
  @observable done = false

  constructor(root, date, id, name, done) {
    this.root = root
    this.id = id
    this.date = date

    this.update(name, done)
  }

  update(name, done) {
    this.name = name
    this.done = done
  }

  async toggleDone() {
    try {
      const { data } = await makePromise(
        execute(
          useGraphQL(this.root.sessionStore.sessionKey),
          toggleDoneItem(this.id, !this.done, this.date)
        )
      )

      if (data) {
        this.updateFromJson(data.toggleDoneItem.item)
      }

    } catch (error) {
      this.errors = error
    } finally {
      await this.root.refresh()
    }
  }

  updateFromJson(json) {
    this.done = json.done
    this.name = json.name
  }
}
