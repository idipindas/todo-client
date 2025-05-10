import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Link,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axiosInstance from "../axios/axiosInstance";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Signup successful!");
      navigate("/");
      // Optionally redirect to login or dashboard here
    } catch (err: any) {
      setError(err.response?.data?.msg || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper
        elevation={6}
        sx={{
          mt: 8,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 4,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Sign up for To-Do App
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" sx={{ width: "100%" }} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign Up"
            )}
          </Button>
          <Typography variant="body2" align="center">
            Already have an account?{" "}
            <Link component={RouterLink} to="/" variant="body2">
              Sign In
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
