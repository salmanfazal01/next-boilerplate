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
import React, { useEffect, useState } from "react";
import { useAuth } from "src/context/authContext";
import Link from "next/link";

const ForgotPassword = () => {
  const { currentUser, forgotPassword } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e?.preventDefault?.();

    if (email) {
      try {
        await forgotPassword(email);
        setError("");
        setSuccess(
          `An email is sent to ${email} for password reset instructions.`,
        );
      } catch (error) {
        setSuccess("");
        setError(error.message);
      }
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
        Forgot Password
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

            <Button
              variant="contained"
              size="large"
              type="submit"
              fullWidth
              sx={{ mb: 2 }}
            >
              Submit
            </Button>

            {error && (
              <Typography sx={{ mb: 2 }} color="error">
                {error}
              </Typography>
            )}

            {success && (
              <Typography sx={{ mb: 2 }} color="success">
                {success}
              </Typography>
            )}

            <Divider sx={{ mt: 2, mb: 3 }}>
              <Typography>OR</Typography>
            </Divider>

            <Link href="/login">
              <Button size="large" fullWidth>
                Login
              </Button>
            </Link>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
