import { observable, action } from "mobx";
import { execute, makePromise } from "apollo-link";
import { getCurrentUser as getCurrentEnjoyer } from "../api/queries/getCurrentUser";
import { logoutEnjoyer } from "../api/queries/logoutEnjoyer";
import useGraphQL from "../hooks/useGraphQL";
import { saveToken, removeToken, getToken } from "../helpers/tokenHelpers";

export default class UserStore {
  constructor(root) {
    this.root = root;
  }

  @observable isLoading = true;
  @observable isUserFetched = false;
  @observable isUserLoggedIn = false;
  @observable userName = "";
  @observable userEmail = "";
  @observable errors = null;

  @action.bound
  async getCurrentUser() {
    this.isLoading = true
    try {
      const { data } = await makePromise(execute(useGraphQL(this.root.sessionStore.sessionKey), getCurrentEnjoyer))
      const { currentUser: { name, email } } = data

      this.userName = name;
      this.userEmail = email;
      this.isUserLoggedIn = true;
    } catch (error) {
      await this.cleanSession();
      this.errors = error;
      this.isUserLoggedIn = false;
    } finally {
      this.isLoading = false
      this.isUserFetched = true

      return this.isUserLoggedIn
    }
  }

  @action.bound
  async logoutUser() {
    this.isLoading = true

    try {
      const key = await getToken();
      await makePromise(execute(useGraphQL(key), logoutEnjoyer))
    } catch (error) {
      this.errors = error
    } finally {
      this.userName = null;
      this.userEmail = null;
      this.isUserLoggedIn = false;
      await this.cleanSession();
      this.isLoading = false
    }
  }

  @action.bound
  async cleanSession() {
    await removeToken();
  }
}
