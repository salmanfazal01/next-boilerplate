import ThemeToggleButton from "@components/ThemeToggle";
import TranslateIcon from "@mui/icons-material/Translate";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { LANGUAGES } from "src/constants";
import { useAuth } from "src/context/authContext";

const LandingNavbar = () => {
  const [langAnchor, setLangAnchor] = useState(null);
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const { route, pathname } = router;

  const isLoggedIn = !!currentUser?.accessToken;

  const handleLanguageChange = (lang) => {
    router.replace(pathname, pathname, { locale: lang });
    // i18n.changeLanguage(lang);
    setLangAnchor(null);
  };

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="lg" sx={{ my: 1 }}>
          <Toolbar>
            <Link href="/">
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, cursor: "pointer" }}
              >
                Next Boilerplate
              </Typography>
            </Link>

            {isLoggedIn && (
              <Button color="inherit" onClick={logout}>
                Log Out
              </Button>
            )}

            {!isLoggedIn && (
              <>
                <Link href="/register">
                  <Button
                    color="inherit"
                    variant={route === "/register" ? "outlined" : "text"}
                  >
                    Register
                  </Button>
                </Link>

                <Link href="/login">
                  <Button
                    color="inherit"
                    variant={route === "/login" ? "outlined" : "text"}
                  >
                    Login
                  </Button>
                </Link>
              </>
            )}

            <ThemeToggleButton />

            <IconButton
              size="large"
              onClick={(e) => setLangAnchor(e.currentTarget)}
              color="inherit"
            >
              <TranslateIcon />
            </IconButton>

            <Menu
              anchorEl={langAnchor}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(langAnchor)}
              onClose={() => setLangAnchor(null)}
            >
              {LANGUAGES.map((item) => (
                <MenuItem
                  onClick={() => handleLanguageChange(item.code)}
                  key={item.code}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default LandingNavbar;
