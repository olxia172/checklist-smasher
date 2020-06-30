import { observable, action } from "mobx";
import { execute, makePromise } from "apollo-link";
import { getCurrentUser as getCurrentEnjoyer } from "../api/queries/getCurrentUser";
import { loginEnjoyer } from "../api/queries/loginEnjoyer";
import { logoutEnjoyer } from "../api/queries/logoutEnjoyer";
import useGraphQL from "../hooks/useGraphQL";
import { saveToken, getToken } from "../helpers/tokenHelpers";

export default class UserStore {
  constructor(root) {
    this.root = root;
  }

  @observable isLoading = true;
  @observable isUserLoggedIn = false;
  @observable userName = "";
  @observable userEmail = "";
  @observable errors = null;

  @action.bound
  async getCurrentUser() {
    const key = await getToken();

    if (key !== null) {
      makePromise(execute(useGraphQL(key), getCurrentEnjoyer))
        .then(({ data: { currentUser: { name, email } } }) => {
          this.userName = name;
          this.userEmail = email;
          this.isUserLoggedIn = true;
        })
        .then(() => this.root.refresh())
        .catch((error) => {
          this.errors = error;
          this.save(null);
          this.isUserLoggedIn = false;
        });
    }
  }

  @action.bound
  loginUser(email, password) {
    makePromise(execute(useGraphQL(null), loginEnjoyer(email, password)))
      .then(({ data }) => {
        this.save(data.login);
      })
      .catch((error) => (this.errors = error))
      .finally(() => this.getCurrentUser());

    console.log(this.errors);
  }

  @action.bound
  async logoutUser() {
    const key = await getToken();

    if (key !== null) {
      makePromise(execute(useGraphQL(key), logoutEnjoyer))
        .then(() => {
          this.userName = null;
          this.userEmail = null;
          this.isUserLoggedIn = false;
          this.save(null);
        })
        .catch((error) => (this.errors = error))
        .finally(() => this.getCurrentUser());
    }
  }

  @action.bound
  async save(token) {
    await saveToken(token);
  }
}
