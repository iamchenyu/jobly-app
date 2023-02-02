import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
  Avatar,
  Button,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  Skeleton,
} from "@mui/material";
import { JoblyApi } from "../api";
import { useNavigate } from "react-router-dom";
import AuthContext from "../authContext";

const UserProfileEdit = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const { username } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await JoblyApi.getUser(username);
      setUser(user);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const cancelButtonHandler = () => {
    navigate("/jobly");
  };

  const UserProfileEditFormHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const editData = {
      password: formData.get("password"),
      firstName: formData.get("first_name"),
      lastName: formData.get("last_name"),
      email: formData.get("email"),
    };
    try {
      await JoblyApi.updateUser(username, editData);
      navigate("/jobly");
    } catch (e) {
      setAlert(e);
    }
  };

  const UserProfileWrapper = {
    width: "60%",
    margin: "auto",
  };

  const UserProfileButtonsGroup = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <>
      {alert ? (
        <Alert severity="error" onClose={() => setAlert(null)}>
          <AlertTitle>Error</AlertTitle>
          {alert.map((a) => a)}
        </Alert>
      ) : null}
      <Grid item component={Paper} sx={UserProfileWrapper} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {loading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          ) : (
            <Avatar sx={{ m: 1, bgcolor: "cornflowerBlue" }}>
              {username[0].toUpperCase()}
            </Avatar>
          )}

          <Typography component="h1" variant="h5">
            Edit My Profile
          </Typography>
          {loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            <Box
              component="form"
              onSubmit={UserProfileEditFormHandler}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                defaultValue={user.username}
                autoComplete="username"
                disabled
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
                autoFocus
                defaultValue={user.password}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                defaultValue={user.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="first_name"
                label="First Name"
                name="first_name"
                defaultValue={user.firstName}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                defaultValue={user.lastName}
              />
              <Box component="div" sx={UserProfileButtonsGroup}>
                <Button
                  type="button"
                  variant="contained"
                  onClick={cancelButtonHandler}
                  sx={{
                    mt: 3,
                    mb: 2,
                    mr: 5,
                    backgroundColor: "Crimson",
                    "&:hover": {
                      backgroundColor: "#B22222",
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "cornflowerBlue" }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Grid>
    </>
  );
};

export default UserProfileEdit;
