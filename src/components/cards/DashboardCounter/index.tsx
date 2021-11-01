import { AndroidOutlined } from "@mui/icons-material";
import { Card, Theme, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = (theme: Theme) =>
  makeStyles({
    root: {
      boxShadow: "none",
      textAlign: "center",
      padding: theme.spacing(5, 0),
      color: theme.palette.text.primary,
      backgroundColor: "rgb(200, 250, 205)",
      borderRadius: 16,
    },

    iconWrapper: {
      margin: "auto",
      display: "flex",
      borderRadius: "50%",
      alignItems: "center",
      width: theme.spacing(8),
      height: theme.spacing(8),
      justifyContent: "center",
      marginBottom: theme.spacing(3),
      color: theme.palette.primary.dark,
      backgroundImage: `linear-gradient(135deg, ${alpha(
        theme.palette.primary.dark,
        0,
      )} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`,
    },
  });

const DashboardCounter = ({ icon, count, text, color }) => {
  const theme = useTheme();
  const classes = useStyles(theme)();

  return (
    <Card className={classes.root}>
      <div className={classes.iconWrapper}>
        <AndroidOutlined width={24} height={24} />
      </div>
      <Typography variant="h3">{count}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {text}
      </Typography>
    </Card>
  );
};

export default DashboardCounter;
