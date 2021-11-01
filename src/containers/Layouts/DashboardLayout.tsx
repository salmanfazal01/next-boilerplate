import React, { useContext } from "react";
import DashboardNavbar from "@components/navbars/DashboardNavbar";
import DashboardSidebar from "@components/sidebars/DashboardSidebar";
import { withProtected } from "src/hoc/routes";
import { Box, Theme, useTheme } from "@mui/material";
import { APPBAR_DESKTOP, DRAWER_WIDTH } from "src/constants";
import { makeStyles } from "@mui/styles";
import { CommonContext } from "src/context/commonContext";

const useStyles = (theme: Theme) =>
  makeStyles({
    main: {
      height: "100%",
      padding: theme.spacing(2, 3),
      marginTop: APPBAR_DESKTOP,
      [theme.breakpoints.up("lg")]: {
        padding: theme.spacing(2, 7),
        width: ({ drawerMenuOpen }) =>
          drawerMenuOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%",
        marginLeft: ({ drawerMenuOpen }) => (drawerMenuOpen ? DRAWER_WIDTH : 0),
      },
    },
  });

const DashboardLayout = (props: any) => {
  const { commonState } = useContext(CommonContext);
  const { drawerMenuOpen } = commonState;

  const theme = useTheme();
  const classes = useStyles(theme)({ drawerMenuOpen });

  return (
    <div>
      <DashboardNavbar />
      <DashboardSidebar />
      <Box className={classes.main}>{props.children}</Box>
    </div>
  );
};

export default withProtected(DashboardLayout);
