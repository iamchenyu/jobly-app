import React, { useContext } from "react";
import { Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import AuthContext from "./authContext";

const Homepage = () => {
  const { username } = useContext(AuthContext);

  const HomepageWrapper = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    height: "100%",
  };

  const HomepageButton = {
    backgroundColor: "cornflowerBlue",
    marginTop: "30px",
  };

  const HomepageH1 = {
    fontSize: "5rem",
    textAlign: "center",
  };

  return (
    <Box sx={HomepageWrapper}>
      <Typography variant="h4" component="h2" sx={{ textAlign: "center" }}>
        Hi {username},
      </Typography>
      <Typography variant="h1" component="h1" sx={HomepageH1}>
        Welcome to jobly!
      </Typography>
      <Typography variant="h6" style={{ fontStyle: "italic" }}>
        help you land your dream job effortlessly
      </Typography>
      <Link to="/jobs" style={{ textDecoration: "none" }}>
        <Button variant="contained" sx={HomepageButton}>
          apply for jobs
        </Button>
      </Link>
    </Box>
  );
};

export default Homepage;
