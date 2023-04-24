import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { JoblyApi } from "../api";
import { randomDate } from "../helper";
import JobsItem from "../jobs/JobsItem";
import {
  styled,
  Skeleton,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CompanyCard = () => {
  const { handle } = useParams();
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchCompany = async (handle) => {
      const company = await JoblyApi.getCompany(handle);
      const { data } = await JoblyApi.getImages();
      setCompany({
        ...company,
        images: { url: data.urls, alt: data.alt_description },
      });
      setLoading(false);
    };
    fetchCompany(handle);
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const CompanyCardWrapper = {
    width: "60%",
    margin: "20px auto",
  };

  return (
    <Card sx={CompanyCardWrapper}>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          ) : company.logoUrl ? (
            <Avatar aria-label="recipe" src={company.logoUrl} />
          ) : (
            <Avatar sx={{ bgcolor: "cornflowerBlue" }}>
              {company.name[0]}
            </Avatar>
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
            company.name
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
      {loading ? (
        <Skeleton sx={{ height: 500 }} animation="wave" variant="rectangular" />
      ) : (
        <CardMedia
          component="img"
          height="500px"
          image={company.images.url.raw}
          alt={company.images.alt}
        />
      )}

      <CardContent sx={{ padding: "16px 16px 10px 16px" }}>
        {loading ? (
          <Skeleton animation="wave" height={10} />
        ) : (
          <Typography variant="body1" color="text.secondary">
            {company.description}
          </Typography>
        )}
      </CardContent>
      {/********************TBD***********************************/}
      <CardActions disableSpacing sx={{ paddingTop: "0px" }}>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        {loading ? (
          <>
            <Skeleton
              animation="wave"
              variant="circular"
              width={20}
              height={20}
            />
            <Skeleton animation="wave" height={10} width="10%" />
          </>
        ) : (
          <>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              sx={{ marginLeft: "0" }}
            >
              <ExpandMoreIcon />
            </ExpandMore>
            <Typography variant="button">apply for jobs</Typography>
          </>
        )}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ padding: "0" }}>
          {loading ? (
            <>
              <Skeleton animation="wave" height={10} />
              <Skeleton animation="wave" height={10} />
              <Skeleton animation="wave" height={10} />
            </>
          ) : (
            company.jobs.map((job) => <JobsItem key={job.id} job={job} />)
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CompanyCard;
