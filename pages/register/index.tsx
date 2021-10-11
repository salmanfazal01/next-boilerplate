import GoogleIcon from "@mui/icons-material/Google";
import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "src/context/authContext";

const Register = () => {
  const { currentUser, signInWithGoogle, register } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e?.preventDefault?.();

    if (email && password) {
      register(email, password)
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
      <Typography
        variant="h4"
        sx={{ fontWeight: 600, my: 3, textAlign: "center" }}
      >
        Register
      </Typography>

      <Card variant="outlined">
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleRegister}>
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
              Create user
            </Button>

            {error && (
              <Typography sx={{ mb: 2 }} color="error">
                {error}
              </Typography>
            )}

            <Button fullWidth size="large">
              Login
            </Button>

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

export default Register;
