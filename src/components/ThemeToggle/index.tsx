import { Brightness4, Brightness7 } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "src/context/themeContext";

const ThemeToggleButton = () => {
  const theme = useTheme();
  const setThemeName = useContext(ThemeContext);

  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={() =>
        setThemeName(theme.palette.mode === "dark" ? "light" : "dark")
      }
      color="inherit"
    >
      {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ThemeToggleButton;
