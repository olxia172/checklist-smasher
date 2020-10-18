import ChecklistStore from "./ChecklistsStore";
import ItemStore from "./ItemStore";
import UserStore from "./UserStore";
import SessionStore from "./SessionStore";

export default class RootStore {
  constructor() {
    this.checklistsStore = new ChecklistStore(this);
    this.itemStore = new ItemStore(this);
    this.userStore = new UserStore(this);
    this.sessionStore = new SessionStore(this);
  }

  setup() {
    this.sessionStore.getSessionToken();
    this.userStore.getCurrentUser();
  }

  refresh() {
    this.checklistsStore.getChecklists();
    this.checklistsStore.getMyDailyChecklists();
  }
}
