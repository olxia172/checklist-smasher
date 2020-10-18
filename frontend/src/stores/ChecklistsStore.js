import { observable, action } from "mobx";
import { execute, makePromise } from "apollo-link";
import { checklists } from "../api/queries/checklists";
import { getDailyChecklists } from "../api/queries/dailyChecklists";
import createChecklist from "../api/mutations/createChecklist";
import useGraphQL from "../hooks/useGraphQL";

export default class ChecklistsStore {
  constructor(root) {
    this.root = root;
  }

  @observable isLoading = false;
  @observable checklists = [];
  @observable checklistsCount = 0;
  @observable errors = null;
  @observable dailyChecklists = []
  @observable dailyChecklistsCount = 0;

  @action.bound
  getChecklists() {
    this.isLoading = true;
    makePromise(
      execute(useGraphQL(this.root.sessionStore.sessionKey), checklists)
    )
      .then(({ data }) => {
        this.checklists = data.checklists;
        this.checklistsCount = this.checklists.length;
        this.isLoading = false;
      })
      .catch((error) => (this.errors = error));
  }

  @action.bound
  createChecklist(checklistName) {
    makePromise(
      execute(
        useGraphQL(this.root.sessionStore.sessionKey),
        createChecklist(checklistName)
      )
    )
      .then(() => this.root.refresh())
      .catch((error) => (this.errors = error));
  }

  @action.bound
  getMyDailyChecklists(date) {
    this.isLoading = true;
    makePromise(
      execute(useGraphQL(this.root.sessionStore.sessionKey), getDailyChecklists(date))
    )
      .then(({ data }) => {
        this.dailyChecklists = data.dailyChecklists;
        this.dailyChecklistsCount = this.dailyChecklists.length;
      })
      .catch((error) => (this.errors = error))
      .finally(() => this.isLoading = false)
  }
}
