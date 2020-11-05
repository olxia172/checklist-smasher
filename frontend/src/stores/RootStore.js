import ChecklistStore from "./ChecklistsStore";
import ItemStore from "./ItemStore";
import UserStore from "./UserStore";
import SessionStore from "./SessionStore";
import { saveToken, removeToken, getToken } from "../helpers/tokenHelpers";
import { tomorrowDate } from "../helpers/dateHelpers"
import AllChecklistsStore from "./DailyChecklists/AllChecklistsStore"

export default class RootStore {
  constructor() {
    this.sessionStore = new SessionStore(this);
    this.checklistsStore = new ChecklistStore(this);
    this.itemStore = new ItemStore(this);
    this.userStore = new UserStore(this);
    this.dailyChecklistsStore = new AllChecklistsStore(this);
  }

  getSession = async () => {
    await this.sessionStore.getSessionToken();
  }

  setup = async () => {
    try {
      const [data1, data2, data3, data4] = await Promise.all([
        this.userStore.getCurrentUser(),
        this.checklistsStore.getChecklists(),
        this.dailyChecklistsStore.newGetMyDailyChecklists(),
        this.dailyChecklistsStore.newGetMyDailyChecklists(tomorrowDate())
      ])

      return data1 && data2 && data3 && data4
    } catch (error) {
      console.log(error);
    }
  }

  refresh = async (date) => {
    try {
      const [data1, data2, data3, data4, data5] = await Promise.all([
        this.userStore.getCurrentUser(),
        this.checklistsStore.getChecklists(),
        this.dailyChecklistsStore.newGetMyDailyChecklists(),
        this.dailyChecklistsStore.newGetMyDailyChecklists(tomorrowDate()),
        this.dailyChecklistsStore.newGetMyDailyChecklists(date)
      ])

      return data1 && data2 && data3 && data4 && data5
    } catch (error) {
      console.log(error);
    }
  }
}
