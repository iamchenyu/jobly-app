import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { JoblyApi } from "../api";
import { randomDate } from "../helper";
import {
  Box,
  Button,
  Skeleton,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Alert,
  AlertTitle,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AuthContext from "../authContext";

const JobCard = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState(null);
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState(null);
  const [isApplied, setIsApplied] = useState(null);
  const { username } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobAndUser = async (id, username) => {
      const job = await JoblyApi.getJob(id);
      const { user } = await JoblyApi.getUser(username);
      const { data } = await JoblyApi.getImages();
      if (user.applications.includes(+id)) {
        setIsApplied(true);
      } else {
        setIsApplied(false);
      }
      setJob({ ...job, images: { url: data.urls, alt: data.alt_description } });
      setUser(user);
      setLoading(false);
    };
    fetchJobAndUser(id, username);
  }, []);

  const applyToJobHandler = async () => {
    try {
      await JoblyApi.apply(user.username, id);
      setIsApplied(true);
    } catch (e) {
      setAlert(e);
    }
  };

  const cancelButtonHandler = () => {
    navigate(-1);
  };

  const JobCardWrapper = {
    width: "80%",
    margin: "20px auto",
  };

  const JobCardContent = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };

  const JobCardDetails = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
  };

  const JobCardButton = {
    mt: 3,
    mb: 2,
    backgroundColor: "cornflowerBlue",
    color: "white",
    "&:hover": {
      backgroundColor: "#1E90FF",
    },
  };

  const UserProfileButtonsGroup = {
    display: "flex",
    justifyContent: "space-evenly",
    width: "100%",
  };

  return (
    <>
      {alert ? (
        <Alert severity="error" onClose={setAlert(null)}>
          <AlertTitle>Error</AlertTitle>
          {alert}
        </Alert>
      ) : null}
      <Card sx={JobCardWrapper}>
        <CardHeader
          avatar={
            loading ? (
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            ) : job.company.logoUrl ? (
              <Link
                to={`/companies/${job.company.handle}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Avatar aria-label="recipe" src={job.company.logoUrl} />
              </Link>
            ) : (
              <Link
                to={`/companies/${job.company.handle}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Avatar sx={{ bgcolor: "cornflowerBlue" }}>
                  {job.company.name[0]}
                </Avatar>
              </Link>
            )
          }
          title={
            loading ? (
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            ) : (
              <Link
                to={`/companies/${job.company.handle}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {job.company.name}
              </Link>
            )
          }
          subheader={
            loading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              randomDate(new Date(2012, 0, 1), new Date())
                .toLocaleDateString("en-US")
                .toString()
            )
          }
        />
        <Box sx={JobCardContent}>
          {loading ? (
            <Skeleton
              sx={{ height: 500 }}
              animation="wave"
              variant="rectangular"
            />
          ) : (
            <CardMedia
              component="img"
              height="400px"
              sx={{ width: "50%", padding: "0 10px 10px 15px" }}
              image={job.images.url.raw}
              alt={job.images.alt}
            />
          )}

          <CardContent sx={JobCardDetails}>
            {loading ? (
              <Skeleton animation="wave" height={10} />
            ) : (
              <>
                <TableContainer component={Paper}>
                  <Table aria-label="job details table">
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Title
                        </TableCell>
                        <TableCell align="right">{job.title}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Company
                        </TableCell>
                        <TableCell align="right">{job.company.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Salary
                        </TableCell>
                        <TableCell align="right">
                          {job.salary ? "$" + job.salary : "N/A"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Equity
                        </TableCell>
                        <TableCell align="right">
                          {job.equity || "N/A"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box component="div" sx={UserProfileButtonsGroup}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={cancelButtonHandler}
                    sx={{
                      mt: 3,
                      mb: 2,
                      width: "100px",
                      backgroundColor: "Crimson",
                      "&:hover": {
                        backgroundColor: "#B22222",
                      },
                    }}
                  >
                    Go Back
                  </Button>
                  {isApplied ? (
                    <Button
                      color="success"
                      variant="contained"
                      sx={{
                        mt: 3,
                        mb: 2,
                        cursor: "not-allowed",
                        "&:hover": {
                          backgroundColor: "#2e7d32",
                          boxShadow:
                            "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
                        },
                      }}
                    >
                      <CheckCircleIcon sx={{ margin: "auto 10px auto 0px" }} />
                      Applied
                    </Button>
                  ) : (
                    <Button sx={JobCardButton} onClick={applyToJobHandler}>
                      Apply Now
                    </Button>
                  )}
                </Box>
              </>
            )}
          </CardContent>
        </Box>
      </Card>
    </>
  );
};

export default JobCard;
