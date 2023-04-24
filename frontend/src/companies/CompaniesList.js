import { useState, useEffect } from "react";
import { JoblyApi } from "../api";
import { Box, Typography } from "@mui/material";
import CompaniesItem from "./CompaniesItem";

function CompaniesList() {
  const [companies, setCompanies] = useState(null);

  useEffect(() => {
    const fetchAllCompanies = async () => {
      const companies = await JoblyApi.getAllCompanies();
      setCompanies(companies);
    };
    fetchAllCompanies();
  }, []);

  const CompaniesListWrapper = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <Box component="div" sx={CompaniesListWrapper}>
      <Typography variant="h2" component="h1" sx={{ my: "30px" }}>
        All Companies
      </Typography>
      {companies
        ? companies.map((company) => (
            <CompaniesItem key={company.handle} company={company} />
          ))
        : null}
    </Box>
  );
}

export default CompaniesList;
