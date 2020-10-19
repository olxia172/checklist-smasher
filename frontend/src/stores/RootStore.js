import ChecklistStore from "./ChecklistsStore";
import ItemStore from "./ItemStore";
import UserStore from "./UserStore";
import SessionStore from "./SessionStore";
import { saveToken, removeToken, getToken } from "../helpers/tokenHelpers";
import { tomorrowDate } from "../helpers/dateHelpers"

export default class RootStore {
  constructor() {
    this.checklistsStore = new ChecklistStore(this);
    this.itemStore = new ItemStore(this);
    this.userStore = new UserStore(this);
    this.sessionStore = new SessionStore(this);
  }

  async getSession() {
    await this.sessionStore.getSessionToken();
  }

  async setup() {
    console.log("Here setup");
console.log("this", this.checklistsStore);
    try {
      console.log("this", this.checklistsStore);
      await Promise.all([
        this.checklistsStore.getChecklists(),
        this.checklistsStore.getMyDailyChecklists(),
        this.checklistsStore.getMyDailyChecklists(tomorrowDate())
      ])

      const success = this.checklistStore.areChecklistsFetched && this.checklistStore.areDailyChecklistsFetched
      console.log("success setup", success);
      return success
    } catch (error) {
      console.log(error);
    }
  }

  async refresh() {
    try {
      await Promise.all([
        this.checklistsStore.getChecklists(),
        this.checklistsStore.getMyDailyChecklists(),
        this.checklistsStore.getMyDailyChecklists(tomorrowDate())
      ])

      const success = this.checklistStore.areChecklistsFetched && this.checklistStore.areDailyChecklistsFetched
      console.log("success refresh", success);
      return success
    } catch (error) {
      console.log(error);
    }
  }
}
