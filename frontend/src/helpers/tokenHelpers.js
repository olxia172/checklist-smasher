import { AsyncStorage } from "react-native";
import { SESSION_KEY } from "../constants/keys";

export async function saveToken(sessionKey) {
  await AsyncStorage.setItem(SESSION_KEY, sessionKey);
}

export async function removeToken() {
  await AsyncStorage.removeItem(SESSION_KEY);
}

export async function getToken() {
  const token = await AsyncStorage.getItem(SESSION_KEY);

  if (token) {
    return token;
  } else {
    return "";
  }
}
