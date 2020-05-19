import { observable, action } from "mobx";
import { getToken } from "../helpers/tokenHelpers";

export default class SessionStore {
  constructor(root) {
    this.root = root;
  }

  @observable sessionKey = null;

  @action.bound
  async getSessionToken(token) {
    const key = await getToken();
    if (key) {
      this.sessionKey = key;
    }
  }
}
