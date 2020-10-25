import React, { useEffect, useMemo } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { StoreProvider } from "./src/stores/storesContext";
import RootStore from "./src/stores/RootStore";
import NavigationProvider from "./src/components/navigation/NavigationProvider";
import { theme } from "./src/constants/themeConfig";
import SessionProvider from "./src/components/SessionProvider"
import DataProvider from "./src/components/DataProvider"

const App = () => {
  const store = useMemo(() => new RootStore(), []);

  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <SessionProvider>
          <DataProvider>
            <NavigationProvider />
          </DataProvider>
        </SessionProvider>
      </PaperProvider>
    </StoreProvider>
  );
}

export default App;
