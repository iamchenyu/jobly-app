import React, { useContext, useState } from "react";
import AuthContext from "./authContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ updateUser }) => {
  const pages = ["Companies", "Jobs"];
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { username } = useContext(AuthContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    updateUser({ token: null, username: null });
    navigate("/login");
  };

  const NavbarWrapper = {
    backgroundColor: "lavender",
    color: "cornflowerBlue",
  };

  const NavbarMenu = {
    textDecoration: "none",
    fontFamily: "Roboto",
    color: "cornflowerBlue",
  };

  return (
    <AppBar position="static" sx={NavbarWrapper}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            to="/jobly"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                mb: 0.5,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              JOBLY
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="navbar menus"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <NavLink
                  to={`/${page.toLocaleLowerCase()}`}
                  style={NavbarMenu}
                  key={page}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                </NavLink>
              ))}
            </Menu>
          </Box>
          <Link
            to="/jobly"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              JOBLY
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLink
                to={`/${page.toLowerCase()}`}
                style={NavbarMenu}
                key={page}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block" }}
                >
                  {page}
                </Button>
              </NavLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="" sx={{ bgcolor: "cornflowerBlue" }}>
                  {username[0].toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <NavLink
                to={`/users/${username}/applications`}
                style={NavbarMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">My Applications</Typography>
                </MenuItem>
              </NavLink>
              <NavLink to={`/users/${username}/edit`} style={NavbarMenu}>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Edit Profile</Typography>
                </MenuItem>
              </NavLink>
              <NavLink onClick={logoutHandler} style={NavbarMenu}>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
              </NavLink>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
