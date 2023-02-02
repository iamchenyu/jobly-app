import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

function CompaniesItem({ company }) {
  return (
    <List sx={{ width: "80%", bgcolor: "background.paper" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          {company.logoUrl ? (
            <Avatar
              alt={`company logo for ${company.name}`}
              src={company.logoUrl}
            />
          ) : (
            <Avatar sx={{ bgcolor: "cornflowerBlue" }}>
              {company.name[0]}
            </Avatar>
          )}
        </ListItemAvatar>
        <ListItemText
          primary={
            <Link
              to={`/companies/${company.handle}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                sx={{ fontWeight: "bold", fontSize: "1rem" }}
                component="p"
                variant="body2"
              >
                {company.name}
              </Typography>
            </Link>
          }
          secondary={
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
            >
              {company.description}
            </Typography>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}

export default CompaniesItem;
