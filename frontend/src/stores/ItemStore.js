import { observable, action } from "mobx";
import { execute, makePromise } from "apollo-link";
import toggleDoneItem from "../api/mutations/toggleDoneItem";
import addItemToChecklist from "../api/mutations/addItemToChecklist";
import scheduleItem from "../api/mutations/scheduleItem";
import removeItemFromChecklist from "../api/mutations/removeItemFromChecklist";
import useGraphQL from "../hooks/useGraphQL";

export default class ItemStore {
  constructor(root) {
    this.root = root;
  }

  @observable isLoading = false;

  @action.bound
  async scheduleItem(itemId, scheduleData) {
    try {
      const response = await makePromise(
        execute(
          useGraphQL(this.root.sessionStore.sessionKey),
          scheduleItem(itemId, scheduleData)
        )
      )
      return response
    } catch (error) {
      this.errors = error
    } finally {
      await this.root.refresh()
    }
  }

  @action.bound
  async addItem(name, checklistId) {
    try {
      await makePromise(
        execute(
          useGraphQL(this.root.sessionStore.sessionKey),
          addItemToChecklist(name, checklistId)
        )
      )
    } catch (error) {
      this.errors = error
    } finally {
      await this.root.refresh()
    }
  }

  @action.bound
  async removeItem(itemId) {
    try {
      await makePromise(
        execute(
          useGraphQL(this.root.sessionStore.sessionKey),
          removeItemFromChecklist(itemId)
        )
      )
    } catch (error) {
      this.errors = error
    } finally {
      await this.root.refresh()
    }
  }
}
