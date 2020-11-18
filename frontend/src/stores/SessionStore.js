import { observable, action } from "mobx";
import { getToken, saveToken } from "../helpers/tokenHelpers";
import useGraphQL from "../hooks/useGraphQL";
import { loginEnjoyer } from "../api/mutations/loginEnjoyer";
import { execute, makePromise } from "apollo-link";

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

  @action.bound
  async loginUser(email, password) {
    this.isLoading = true

    try {
      const { data } = await makePromise(execute(useGraphQL(null), loginEnjoyer(email, password)))

      await this.save(data.login.key)
      this.sessionKey = data.login.key
    } catch (error) {
      this.errors = error
    } finally {
      this.isLoading = false;
    }
  }

  @action.bound
  async save(token) {
    await saveToken(token);
  }
}
