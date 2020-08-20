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
  toggleDoneItem(itemId, doneValue) {
    makePromise(
      execute(
        useGraphQL(this.root.sessionStore.sessionKey),
        toggleDoneItem(itemId, doneValue)
      )
    )
      .then(() => this.root.refresh())
      .catch((error) => (this.errors = error));
  }

  @action.bound
  scheduleItem(itemId, scheduleData) {
    return makePromise(
      execute(
        useGraphQL(this.root.sessionStore.sessionKey),
        scheduleItem(itemId, scheduleData)
      )
    )
      .then(() => this.root.refresh())
      .catch((error) => (this.errors = error));
  }

  @action.bound
  addItem(name, checklistId) {
    makePromise(
      execute(
        useGraphQL(this.root.sessionStore.sessionKey),
        addItemToChecklist(name, checklistId)
      )
    )
      .then(() => this.root.refresh())
      .catch((error) => (this.errors = error));
  }

  @action.bound
  removeItem(itemId) {
    makePromise(
      execute(
        useGraphQL(this.root.sessionStore.sessionKey),
        removeItemFromChecklist(itemId)
      )
    )
      .then(() => this.root.refresh())
      .catch((error) => (this.errors = error));
  }
}
