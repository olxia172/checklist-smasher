import ChecklistStore from "./ChecklistsStore";
import ItemStore from "./ItemStore";
import UserStore from "./UserStore";

export default class RootStore {
  constructor() {
    this.checklistsStore = new ChecklistStore(this);
    this.itemStore = new ItemStore(this);
    this.userStore = new UserStore(this);
  }

  setup() {
    this.userStore.getCurrentUser();
  }

  refresh() {
    this.checklistsStore.getChecklists();
  }
}
