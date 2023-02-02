import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { Link } from "react-router-dom";

function JobsItem({ job }) {
  return (
    <List sx={{ width: "80%", bgcolor: "background.paper" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          {job.companyName ? (
            <Avatar sx={{ bgcolor: "cornflowerBlue" }}>
              {job.companyName[0]}
            </Avatar>
          ) : job.company ? (
            <Avatar sx={{ bgcolor: "cornflowerBlue" }}>
              {job.company.name[0]}
            </Avatar>
          ) : (
            <WorkOutlineIcon />
          )}
        </ListItemAvatar>

        <ListItemText
          primary={
            <Link
              to={`/jobs/${job.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                sx={{ fontWeight: "bold", fontSize: "1rem" }}
                component="p"
                variant="body2"
              >
                {job.title}
              </Typography>
            </Link>
          }
          secondary=<Typography
            sx={{ display: "inline" }}
            component="span"
            variant="body2"
          >
            {job.companyName
              ? "Company: " + job.companyName
              : job.company
              ? "Company: " + job.company.name
              : null}
          </Typography>
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}

export default JobsItem;
