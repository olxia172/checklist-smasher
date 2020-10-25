import { observable, action } from "mobx";
import { execute, makePromise } from "apollo-link";
import { checklists } from "../api/queries/checklists";
import { getDailyChecklists } from "../api/queries/dailyChecklists";
import createChecklist from "../api/mutations/createChecklist";
import useGraphQL from "../hooks/useGraphQL";
import { toString } from "../helpers/dateHelpers"
import DailyChecklistStore from "./DailyChecklists/DailyChecklistStore"

export default class ChecklistsStore {
  constructor(root) {
    this.root = root;
  }

  @observable areChecklistsFetched = false;
  @observable areDailyChecklistsFetched = false;
  @observable checklists = [];
  @observable checklistsCount = 0;
  @observable errors = null;
  @observable dailyChecklists = []
  @observable newDailyChecklists = []

  @action.bound
  async getChecklists() {
    try {
      const { data } = await makePromise(
        execute(useGraphQL(this.root.sessionStore.sessionKey), checklists)
      )

      this.checklists = data.checklists;
      this.checklistsCount = this.checklists.length;
    } catch (error) {
      this.errors = error
    } finally {
      this.areChecklistsFetched = true;

      return this.areChecklistsFetched
    }
  }

  @action.bound
  async createChecklist(checklistName) {
    try {
      await makePromise(
        execute(
          useGraphQL(this.root.sessionStore.sessionKey),
          createChecklist(checklistName)
        )
      )

      await this.root.refresh()
    } catch (error) {
      this.errors = error
    }
  }

  // getMyDailyChecklists = flow(function * (date = toString(new Date())) {
  //   this.areDailyChecklistsFetched = false;
  //
  //   try {
  //     const { data } = yield makePromise(
  //       execute(useGraphQL(this.root.sessionStore.sessionKey), getDailyChecklists(date))
  //     )
  //
  //     this.dailyChecklists[date] = data.dailyChecklists;
  //     this.dailyChecklistsCount[date] = data.dailyChecklists.length;
  //     this.ticker += 1
  //     console.log('dailyChecklists.date', JSON.stringify(date))
  //     console.log('dailyChecklists', JSON.stringify(data.dailyChecklists))
  //   } catch (error) {
  //     this.errors = error
  //   } finally {
  //     this.areDailyChecklistsFetched = true
  //
  //     return this.dailyChecklists[date]
  //   }
  // }.bind(this))

  @action.bound
  async getMyDailyChecklists(date = toString(new Date())) {
    this.areDailyChecklistsFetched = false;

    try {
      const { data } = await makePromise(
        execute(useGraphQL(this.root.sessionStore.sessionKey), getDailyChecklists(date))
      )

      this.dailyChecklists = data.dailyChecklists;
    } catch (error) {
      this.errors = error
    } finally {
      this.areDailyChecklistsFetched = true
    }
  }


  @action.bound
  async newGetMyDailyChecklists(newDate = toString(new Date())) {
    try {
      let checklist = this.newDailyChecklists.find(({ date }) => date === newDate)

      if (!checklist) {
        checklist = new DailyChecklistStore(this.root, newDate)
      }
      await checklist.loadDailyChecklists()
      this.newDailyChecklists.push(checklist)
    } catch (error) {
      this.errors = error
    } finally {
      return this.newDailyChecklists
    }
  }
}
