import React, { useContext, useEffect, useState } from "react";
import { JoblyApi } from "../api";
import AuthContext from "../authContext";
import JobsItem from "../jobs/JobsItem";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const UserJobApplications = () => {
  const { username } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const { user } = await JoblyApi.getUser(username);
      Promise.all(
        user.applications.map(async (jobId) => {
          return await JoblyApi.getJob(jobId);
        })
      ).then((applications) => setApplications(applications));
    };
    fetchApplications();
  }, []);

  const ApplicationsListWrapper = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <Box component="div" sx={ApplicationsListWrapper}>
      <Typography variant="h2" component="h1" sx={{ my: "30px" }}>
        My Job Applications
      </Typography>
      {applications.length === 0 ? (
        <>
          <Typography variant="overline" display="block" gutterBottom>
            No applications yet
          </Typography>
          <Link
            to="/jobs"
            style={{
              textDecoration: "none",
              marginTop: "20px",
            }}
          >
            <Button
              variant="contained"
              sx={{ backgroundColor: "cornflowerblue" }}
            >
              Start My Application Today
            </Button>
          </Link>
        </>
      ) : (
        applications.map((app) => <JobsItem job={app} key={app.id} />)
      )}
    </Box>
  );
};

export default UserJobApplications;
