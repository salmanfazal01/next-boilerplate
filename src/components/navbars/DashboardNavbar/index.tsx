import AccountMenu from "@components/menus/AccountMenu";
import LanguageMenu from "@components/menus/LanguageMenu";
import ThemeToggleButton from "@components/ThemeToggle";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Theme,
  Toolbar,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext } from "react";
import { APPBAR_DESKTOP, APPBAR_MOBILE, DRAWER_WIDTH } from "src/constants";
import { CommonContext } from "src/context/commonContext";

// ---------- STYLES ----------
const useStyles = (theme: Theme) =>
  makeStyles({
    root: {
      borderBottom: "1px",
      [theme.breakpoints.up("lg")]: {
        width: ({ drawerMenuOpen }) =>
          drawerMenuOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%",
      },
    },

    toolbar: {
      minHeight: APPBAR_MOBILE,
      padding: theme.spacing(0, 3),
      [theme.breakpoints.up("lg")]: {
        minHeight: APPBAR_DESKTOP,
        padding: theme.spacing(0, 7),
      },
    },
  });
// ---------- STYLES ----------

const DashboardNavbar = () => {
  const { commonState, setCommonValues } = useContext(CommonContext);
  const { drawerMenuOpen } = commonState;

  const theme = useTheme();
  const classes = useStyles(theme)({ drawerMenuOpen });

  const handleDrawerToggle = () => {
    setCommonValues({ drawerMenuOpen: !drawerMenuOpen });
  };

  return (
    <AppBar className={classes.root} color="transparent" elevation={0}>
      <Toolbar className={classes.toolbar}>
        <IconButton onClick={handleDrawerToggle} sx={{ mr: 1 }}>
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          <ThemeToggleButton />
          <LanguageMenu />
          {/* <NotificationsPopover /> */}
          <AccountMenu />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;
