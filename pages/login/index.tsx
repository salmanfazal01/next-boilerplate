import GoogleIcon from "@mui/icons-material/Google";
import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "src/context/authContext";

const Login = () => {
  const { currentUser, signInWithGoogle, login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation("common");

  const handleSignIn = (e) => {
    e?.preventDefault?.();

    if (email && password) {
      login(email, password)
        .then((res) => {
          if (res.user.accessToken) {
            router.push("/");
          }
        })
        .catch((error: any) => {
          setError(error.message);
        });
    }
  };

  if (currentUser?.accessToken) {
    router.push("/");
  }

  return (
    <Container maxWidth="sm">
      <NextSeo title="Login" description="" />

      <Typography
        variant="h4"
        sx={{ fontWeight: 600, my: 3, textAlign: "center" }}
      >
        {t("login_page")}
      </Typography>

      <Card variant="outlined">
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSignIn}>
            <Typography sx={{ fontWeight: 500, mb: 1 }}>
              Email address
            </Typography>
            <TextField
              placeholder="abcde@xyz.com"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Typography sx={{ fontWeight: 500, mb: 1 }}>Password</Typography>
            <TextField
              placeholder="Enter a strong password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Button
              variant="contained"
              size="large"
              type="submit"
              fullWidth
              sx={{ mb: 2 }}
            >
              Sign In
            </Button>

            {error && (
              <Typography sx={{ mb: 2 }} color="error">
                {error}
              </Typography>
            )}

            <Grid
              container
              spacing={1}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Link href="/forgot-password">
                  <Button fullWidth size="large">
                    Forgot Password?
                  </Button>
                </Link>
              </Grid>

              <Grid item>
                <Link href="/register">
                  <Button fullWidth size="large">
                    Register
                  </Button>
                </Link>
              </Grid>
            </Grid>

            <Divider sx={{ mt: 2, mb: 3 }}>
              <Typography>OR</Typography>
            </Divider>

            <Button
              variant="outlined"
              size="large"
              onClick={signInWithGoogle}
              fullWidth
              color="error"
            >
              <GoogleIcon fontSize="small" sx={{ mr: 1 }} /> Sign in with Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Login;
