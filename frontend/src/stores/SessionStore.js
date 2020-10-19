import { observable, action } from "mobx";
import { getToken } from "../helpers/tokenHelpers";

export default class SessionStore {
  constructor(root) {
    this.root = root;
  }

  @observable sessionKey = null;
  @observable errors = null
  @observable sessionKeyFetched = false

  @action.bound
  async getSessionToken() {
    try {
      const key = await getToken();
      this.sessionKey = key;
    } catch (error) {
      this.errors = error;
    } finally {
      this.sessionKeyFetched = true
    }
  }
}
