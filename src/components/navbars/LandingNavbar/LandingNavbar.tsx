import LanguagePopover from "@components/menus/LanguageMenu";
import ThemeToggleButton from "@components/ThemeToggle";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "src/context/authContext";

const LandingNavbar = () => {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const { route } = router;

  const isLoggedIn = !!currentUser?.accessToken;

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
              <>
                <Link href="/dashboard">
                  <Button color="inherit">Dashboard</Button>
                </Link>
                <Button color="inherit" onClick={logout}>
                  Log Out
                </Button>
              </>
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

            <LanguagePopover />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default LandingNavbar;
