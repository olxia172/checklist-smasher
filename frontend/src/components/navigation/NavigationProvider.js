import React from "react";
import { useStoreData } from "../../hooks/useStoreData";
import GuestUserNav from "./GuestUserNav";
import LoggedUserNav from "./LoggedUserNav";

function useData() {
  return useStoreData(({ userStore}) => ({
    isUserLoggedIn: userStore.isUserLoggedIn,
  }));
}

const NavigationProvider = () => {
  const { isUserLoggedIn } = useData();

  return isUserLoggedIn ? <LoggedUserNav /> : <GuestUserNav />;
};

export default NavigationProvider;
