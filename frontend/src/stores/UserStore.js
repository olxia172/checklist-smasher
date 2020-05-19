import { observable, action } from "mobx";
import { execute, makePromise } from "apollo-link";
import { getCurrentUser as getCurrentEnjoyer } from "../api/queries/getCurrentUser";
import { loginEnjoyer } from "../api/queries/loginEnjoyer";
import { AsyncStorage } from "react-native";
import { SESSION_KEY } from "../constants/keys";
import useGraphQL from "../hooks/useGraphQL";

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
  getCurrentUser() {
    const key = AsyncStorage.getItem(SESSION_KEY);
    console.log(key);

    if (key !== null) {
      makePromise(execute(useGraphQL(key), getCurrentEnjoyer))
        .then(({ data }) => {
          console.log(data);
          console.log("HERE2");

          this.userName = data.currentUser.name;
          this.userEmail = data.currentUser.email;
          this.isUserLoggedIn = true;
        })
        .catch((error) => (this.errors = error))
        .finally(() => this.root.refresh());
    }
  }

  @action.bound
  loginUser(email, password) {
    makePromise(execute(useGraphQL(null), loginEnjoyer(email, password)))
      .then(({ data }) => {
        console.log("HERE");

        console.log(data);

        AsyncStorage.setItem(SESSION_KEY, data.login);
        this.getCurrentUser();
      })
      .catch((error) => (this.errors = error));

    console.log(this.errors);
  }

  logoutUser() {}
}
