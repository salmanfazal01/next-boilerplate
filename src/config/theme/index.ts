import { Theme } from "@mui/material";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";

export function themeCreator(theme: string): Theme {
  return themeMap[theme];
}

const themeMap: { [key: string]: Theme } = {
  light: lightTheme,
  dark: darkTheme,
};

export default themeCreator("light");
