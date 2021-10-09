import { ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import { themeCreator } from "../config/theme";
import { LIGHT_MODE, THEME_NAME } from "../constants/theme";

export const ThemeContext = React.createContext((themeName: string): any => ({
  currentTheme: LIGHT_MODE,
  setTheme: null,
}));

const CustomThemeProvider: React.FC = (props) => {
  // Read current theme from localStorage or maybe from an api
  const curThemeName =
    typeof window !== "undefined"
      ? window?.localStorage?.getItem(THEME_NAME) || LIGHT_MODE
      : LIGHT_MODE;

  // State to hold the selected theme name
  const [themeName, _setThemeName] = useState(curThemeName);

  // Get the theme object by theme name
  const theme = themeCreator(themeName);

  const setThemeName = (themeName: string): void => {
    localStorage.setItem(THEME_NAME, themeName);
    _setThemeName(themeName);
  };

  return (
    <ThemeContext.Provider value={setThemeName}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default CustomThemeProvider;
