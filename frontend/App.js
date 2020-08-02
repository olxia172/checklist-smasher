import React, { useEffect, useMemo } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { StoreProvider } from "./src/stores/storesContext";
import RootStore from "./src/stores/RootStore";
import NavigationProvider from "./src/components/navigation/NavigationProvider";
import { theme } from "./src/constants/themeConfig";

function App() {
  const store = useMemo(() => new RootStore(), []);

  useEffect(() => {
    store.setup();
  });

  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <NavigationProvider />
      </PaperProvider>
    </StoreProvider>
  );
}

export default App;
