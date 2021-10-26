import MenuItems from "@components/sidebars/DashboardSidebar/MenuItems";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  Hidden,
  Link,
  Stack,
  Theme,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React, { useContext } from "react";
import { DRAWER_WIDTH } from "src/constants";
import { useAuth } from "src/context/authContext";
import { CommonContext } from "src/context/commonContext";
import withAppConfig from "src/hoc/withAppConfig";

// ---------- STYLES ----------
const useStyles = (theme: Theme) =>
  makeStyles({
    root: {
      [theme.breakpoints.up("lg")]: {
        flexShrink: 0,
        width: ({ drawerMenuOpen }) => (drawerMenuOpen ? DRAWER_WIDTH : 0),
      },
    },

    accountBox: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(2, 2.5),
      borderRadius: 12,
      backgroundColor: theme.palette.grey[200],
    },

    logo: {
      maxHeight: "50px",
      width: "100%",
      objectFit: "contain",
    },
  });

// ---------- STYLES ----------

const DashboardSidebar = ({ appConfig = {} }) => {
  const { commonState, setCommonValues } = useContext(CommonContext);
  const { drawerMenuOpen } = commonState;

  const theme = useTheme();
  const classes = useStyles(theme)({ drawerMenuOpen });

  const isLightMode = theme.palette.mode === "light";

  const { currentUser = {}, userProfile = {} } = useAuth();

  const handleDrawerToggle = () => {
    setCommonValues({ drawerMenuOpen: !drawerMenuOpen });
  };

  const UpgradeBox = () => (
    <Box sx={{ px: 2.5, pb: 3 }}>
      <Stack
        alignItems="center"
        spacing={2}
        sx={{
          p: 2.5,
          borderRadius: 2,
          position: "relative",
          bgcolor: "grey.200",
        }}
      >
        <Typography variant="h6">Get more?</Typography>
        <Typography>From only $69</Typography>
        <Button variant="contained">Upgrade to pro</Button>
      </Stack>
    </Box>
  );

  const Content = () => {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Logo */}
        <Link href="/">
          <Box sx={{ px: 2.5, py: 3 }}>
            <img
              src={isLightMode ? appConfig.logoLight : appConfig.logoDark}
              className={classes.logo}
            />
          </Box>
        </Link>

        {/* Account */}
        <Box sx={{ mb: 5, mx: 2.5 }}>
          <Link href="#" style={{ textDecoration: "none" }}>
            <Box className={classes.accountBox}>
              <Avatar src={currentUser?.photoURL} alt="photoURL" />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                  {userProfile?.firstName} {userProfile?.lastName}
                </Typography>
                <Typography variant="subtitle2">
                  Status: {userProfile?.clientStatus}
                </Typography>
              </Box>
            </Box>
          </Link>
        </Box>

        {/* Menu Items */}
        <MenuItems items={appConfig.dashboard.menuItems} />

        <Box sx={{ flexGrow: 1 }} />

        {/* Upgrade */}
        <UpgradeBox />
      </Box>
    );
  };

  return (
    <div className={classes.root}>
      <Hidden lgUp>
        <Drawer
          open={drawerMenuOpen}
          onClose={handleDrawerToggle}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          <Content />
        </Drawer>
      </Hidden>

      <Hidden lgDown>
        <Drawer
          open={drawerMenuOpen}
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
            },
          }}
        >
          <Content />
        </Drawer>
      </Hidden>
    </div>
  );
};

export default withAppConfig(DashboardSidebar);
