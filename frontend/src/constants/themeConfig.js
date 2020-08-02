import { basicColors } from "./colors";
import { DefaultTheme } from "react-native-paper";

const headerStyles = {
  headerStyle: {
    backgroundColor: basicColors.primary,
  },
  headerTintColor: basicColors.white,
  headerTitleStyle: {
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
  },
};

const theme = {
  ...DefaultTheme,
  roundness: 0,
  colors: {
    ...DefaultTheme.colors,
    primary: basicColors.primary,
    accent: basicColors.primaryLight,
  },
};

export { headerStyles, theme };
