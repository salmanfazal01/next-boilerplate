import {
  Avatar,
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useAuth } from "src/context/authContext";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";

const useStyles = (theme: Theme) => makeStyles({});

const AccountMenu = () => {
  const [accountAnchor, setAccountAnchor] = useState(null);

  const theme = useTheme();
  const classes = useStyles(theme)();

  const { currentUser = {}, userProfile = {}, logout } = useAuth();

  console.log(currentUser);

  return (
    <>
      <Avatar
        sx={{ width: 32, height: 32, cursor: "pointer" }}
        onClick={(e) => setAccountAnchor(e.currentTarget)}
        src={currentUser?.photoURL}
      />

      <Menu
        anchorEl={accountAnchor}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(accountAnchor)}
        onClose={() => setAccountAnchor(null)}
      >
        <Box sx={{ px: 1 }}>
          <Typography sx={{ fontWeight: 500 }}>
            {userProfile?.firstName} {userProfile?.lastName}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 300 }}>
            {userProfile?.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <MenuItem>
          <HomeIcon sx={{ mr: 1 }} /> Home
        </MenuItem>
        <MenuItem>
          <PersonIcon sx={{ mr: 1 }} /> Profile
        </MenuItem>
        <MenuItem>
          <SettingsIcon sx={{ mr: 1 }} /> Settings
        </MenuItem>

        <Box sx={{ p: 1 }}>
          <Button variant="outlined" fullWidth onClick={logout}>
            Logout
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default AccountMenu;
