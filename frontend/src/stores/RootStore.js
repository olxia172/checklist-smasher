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

  getSession = async () => {
    await this.sessionStore.getSessionToken();
  }

  setup = async () => {
    try {
      const [data1, data2, data3, data4] = await Promise.all([
        this.userStore.getCurrentUser(),
        this.checklistsStore.getChecklists(),
        this.checklistsStore.getMyDailyChecklists(),
        this.checklistsStore.getMyDailyChecklists(tomorrowDate())
      ])

      return data1 && data2 && data3 && data4
    } catch (error) {
      console.log(error);
    }
  }

  refresh = async () => {
    try {
      const [data1, data2, data3, data4] = await Promise.all([
        this.userStore.getCurrentUser(),
        this.checklistsStore.getChecklists(),
        this.checklistsStore.getMyDailyChecklists(),
        this.checklistsStore.getMyDailyChecklists(tomorrowDate())
      ])

      return data1 && data2 && data3 && data4
    } catch (error) {
      console.log(error);
    }
  }

  async refresh2() {
    console.log("refresh2");
    try {
      const [data1, data2, data3, data4] = await Promise.all([
        this.userStore.getCurrentUser(),
        this.checklistsStore.getChecklists(),
        this.checklistsStore.getMyDailyChecklists()
      ])

      return data1 && data2 && data3 && data4
    } catch (error) {
      console.log(error);
    }
  }
}
