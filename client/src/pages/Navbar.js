import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';

import NotificationButton from "./NotificationButton";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  logInNavbar: {
    backgroundColor: "transparent",
    boxShadow: "none",
    position: "fixed"
  },
  loggedInNavbar: {
    backgroundColor: "transparent",
    boxShadow: "none",
    position: "static"
  }
}));

export default function NavigationBar() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
 
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = event => {
    event.preventDefault();
    localStorage.clear();
    window.location.href = "/";
  };

  const token = localStorage.getItem('jwtToken');
  let buttons;

  if (token) {
    buttons = <div>
                <Button component={Link} to={"/profile"}>BECOME A SITTER</Button>
                <Button component={Link} to={"/sitter-search"}>My Sitters</Button>
                <NotificationButton></NotificationButton>
                <Button>Messages</Button>
                <IconButton aria-label="avatar" onClick={handleClick}>
                  <Avatar alt="Remy Sharp" src={require("../images/07cc6abd390ab904abbf31db5e6ea20357f8b127.png")} className={classes.bigAvatar}/>
                </IconButton>
                <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={open}
                      onClose={handleClose}
                      
                    >
                      {/* <MenuItem><a href="./profile">Profile</a></MenuItem> */}
                      <MenuItem className="center" component={Link} to={"/profile"}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </Menu>
              </div> 
  } else {
    buttons = <div>
                <Button className={classes.menuButton} color="inherit" component={Link} to={"/profile"}>BECOME A SITTER</Button>
                <Button className={classes.menuButton} variant="outlined" color="secondary" component={Link} to={"/login"}>Log In</Button>
                <Button variant="contained" color="secondary" component={Link} to={"/signup"}>Sign Up</Button>
              </div>
  }

  return (
    <div className={classes.root}>
      <AppBar className={ token ? classes.loggedInNavbar : classes.logInNavbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <img src={require("../images/loving-sitter-logo.png")} alt="logo of app"/>
          </Typography>
          { buttons }
        </Toolbar>
      </AppBar>
    </div>
  );
};
