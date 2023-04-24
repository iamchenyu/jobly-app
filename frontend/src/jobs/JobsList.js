import { useState, useEffect } from "react";
import { JoblyApi } from "../api";
import { Box, Typography } from "@mui/material";
import JobsItem from "./JobsItem";

function JobsList() {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    const fetchAllJobs = async () => {
      const jobs = await JoblyApi.getAllJobs();
      setJobs(jobs);
    };
    fetchAllJobs();
  }, []);

  const JobsListWrapper = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <Box component="div" sx={JobsListWrapper}>
      <Typography variant="h2" component="h1" sx={{ my: "30px" }}>
        All Jobs
      </Typography>
      {jobs ? jobs.map((job) => <JobsItem key={job.id} job={job} />) : null}
    </Box>
  );
}

export default JobsList;
