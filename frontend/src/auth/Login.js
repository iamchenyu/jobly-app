import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { JoblyApi } from "../api";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Handcrafted by "}
      <a href="https://github.com/iamchenyu" style={{ color: "inherit" }}>
        CHENYU/WANG
      </a>{" "}
      <br />
      {"© "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

const Login = ({ updateUser }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);
    const formData = new FormData(event.currentTarget);
    const loginData = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    try {
      const { token, username } = await JoblyApi.login(loginData);
      navigate("/jobly");
      // JoblyApi.token = token;
      updateUser({ token, username });
    } catch (e) {
      setErrors(e);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random/?city,night)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "cornflowerBlue" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {errors.length === 0 ? (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </>
              ) : (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    error
                    id="username-error"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    error
                    name="password"
                    label="Password"
                    type="password"
                    id="password-error"
                    autoComplete="current-password"
                    helperText={errors.map((error) => error)}
                  />
                </>
              )}

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "cornflowerBlue" }}
              >
                Log In
              </Button>
              <Grid container sx={{ justifyContent: "center" }}>
                <Grid item>
                  <Link to="/register" style={{ textDecoration: "none" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "DimGrey",
                        margin: "auto",
                        fontStyle: "italic",
                      }}
                    >
                      {"Don't have an account? Sign Up"}
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
