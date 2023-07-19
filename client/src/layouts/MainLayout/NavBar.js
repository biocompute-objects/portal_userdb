import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import Menu from "@material-ui/core/Menu";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import LoginIcon from '@mui/icons-material/Login';
import AccountCircle from "@material-ui/icons/AccountCircle";
// import EditOutlinedIcon from "@mui/icons-material/Construction";
// import SearchIcon from "@mui/icons-material/DataObject";
import BugReportIcon from "@mui/icons-material/BugReport";
// import GroupIcon from "@mui/icons-material/AppRegistration";
import { useSelector } from "react-redux";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
// import SettingsInputAntennaIcon from "@mui/icons-material/MiscellaneousServices";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Info } from "@mui/icons-material";
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
// import SearchIcon from '@mui/icons-material/Storage';
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  nav: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  themeToggle: {
    [theme.breakpoints.up("sm")]: {
      padding: 0
    }
  },
  imageContainer: {
    maxWidth: "100%",
    height: "auto",
    "& img": {
      width: "2em"
    }
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  }
}));

const NavBar = () => {
  const classes = useStyles();
  /* Should hold reference to DOM element, set anchorEl when
  menu is clicked open.*/
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const auth = useSelector((state) => state.account);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  /*The anchor pieces of state need to either be null or have a DOM element */
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const mobileMenuId = "menu-mobile";
  /*Need to add switch in here */
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={Link} to='/'>
        <IconButton aria-label='go home' color='inherit'>
          <Badge overlap="rectangular" badgeContent={0} color='secondary'>
            <HomeIcon />
          </Badge>
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem component={Link} to='/resources'>
        <IconButton aria-label='BioCompute Object builder' color='inherit'>
          <Badge overlap="rectangular" badgeContent={0} color='secondary'>
            <SettingsInputAntennaIcon />
          </Badge>
        </IconButton>
        <p>BCO Resources</p>
      </MenuItem>
      <MenuItem component={Link} to='/builder'>
        <IconButton aria-label='BioCompute Object builder' color='inherit'>
          <Badge overlap="rectangular" badgeContent={0} color='secondary'>
            <EditOutlinedIcon />
          </Badge>
        </IconButton>
        <p>BCO Builder</p>
      </MenuItem>
      <MenuItem component={Link} to="/prefix">
        <IconButton aria-label='prefix registry' color='inherit'>
          <Badge overlap="rectangular" badgeContent={0} color='secondary'>
            <GroupIcon />
          </Badge>
        </IconButton>
        <p>Prefix Registry</p>
      </MenuItem>
      <MenuItem component={Link} to='/bcodbs'>
        <IconButton aria-label='BCO DB' color='inherit'>
          <Badge overlap="rectangular" badgeContent={0} color='secondary'>
            <SearchIcon />
          </Badge>
        </IconButton>
        <p>BCO DB</p>
      </MenuItem>
      <MenuItem component={Link} to='/about'>
        <IconButton aria-label='About Us' color='inherit'>
          <Badge overlap="rectangular" badgeContent={0} color='secondary'>
            <InfoOutlinedIcon />
          </Badge>
        </IconButton>
        <p>About Us</p>
      </MenuItem>
      <a href='https://github.com/biocompute-objects/portal_userdb/issues/new/choose' target='_blank' rel="noreferrer" >
        <MenuItem>
          <IconButton aria-label='BioCompute Object builder' color='inherit'>
            <Badge overlap="rectangular" badgeContent={0} color='secondary'>
              <BugReportIcon />
            </Badge>
          </IconButton>
          <p>Bug Report</p>
        </MenuItem>
      </a>
      <a href='https://docs.biocomputeobject.org/contact'>
        <MenuItem>
          <IconButton aria-label='BioCompute Object builder' color='inherit'>
            <Badge overlap="rectangular" badgeContent={0} color='secondary'>
              <ContactPageIcon />
            </Badge>
          </IconButton>
          <p>Contact Us</p>
        </MenuItem>
      </a>
      <MenuItem component={Link} to='/profile'>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const mobileMenuNoLogIn = "menu-mobile";
  /*Need to add switch in here */
  const renderMenuNoLogIn = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={Link} to='/'>
        <IconButton aria-label='go home' color='inherit'>
          <Badge overlap="rectangular" badgeContent={0} color='secondary'>
            <HomeIcon />
          </Badge>
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem component={Link} to='/resources'>
        <IconButton aria-label='BioCompute Object builder' color='inherit'>
          <Badge overlap="rectangular" badgeContent={0} color='secondary'>
            <SettingsInputAntennaIcon />
          </Badge>
        </IconButton>
        <p>BCO Resources</p>
      </MenuItem>
      <MenuItem component={Link} to='/builder'>
        <IconButton aria-label='BioCompute Object builder' color='inherit'>
          <Badge overlap="rectangular" badgeContent={0} color='secondary'>
            <EditOutlinedIcon />
          </Badge>
        </IconButton>
        <p>BCO Builder</p>
      </MenuItem>
      <MenuItem component={Link} to="/prefix">
        <IconButton aria-label='prefix registry' color='inherit'>
          <Badge overlap="rectangular" badgeContent={0} color='secondary'>
            <GroupIcon />
          </Badge>
        </IconButton>
        <p>Prefix Registry</p>
      </MenuItem>
      <MenuItem component={Link} to='/bcodbs'>
        <IconButton aria-label='BCO DB' color='inherit'>
          <Badge overlap="rectangular" badgeContent={0} color='secondary'>
            <SearchIcon />
          </Badge>
        </IconButton>
        <p>BCO DB</p>
      </MenuItem>
      <MenuItem component={Link} to='/about'>
        <IconButton aria-label='About Us' color='inherit'>
          <Badge overlap="rectangular" badgeContent={0} color='secondary'>
            <InfoOutlinedIcon />
          </Badge>
        </IconButton>
        <p>About Us</p>
      </MenuItem>
      <a href='https://github.com/biocompute-objects/portal_userdb/issues/new/choose' target='_blank' rel="noreferrer" >
        <MenuItem>
          <IconButton aria-label='BioCompute Object builder' color='inherit'>
            <Badge overlap="rectangular" badgeContent={0} color='secondary'>
              <BugReportIcon />
            </Badge>
          </IconButton>
          <p>Bug Report</p>
        </MenuItem>
      </a>
      <a href='https://docs.biocomputeobject.org/contact'>
        <MenuItem>
          <IconButton aria-label='BioCompute Object builder' color='inherit'>
            <Badge overlap="rectangular" badgeContent={0} color='secondary'>
              <ContactPageIcon />
            </Badge>
          </IconButton>
          <p>Contact Us</p>
        </MenuItem>
      </a>
      <MenuItem component={Link} to='/login'>
        <IconButton
          aria-label='log in'
          aria-controls='primary-search-account-menu'
          color='inherit'
        >
          <LoginIcon />
        </IconButton>
        <p>Login</p>
      </MenuItem>
    </Menu>
  );
  
  return (
    <header className={classes.grow}>
      <AppBar position='static' component='div'>
        <Toolbar component='nav' className={classes.nav}>
          <Typography className={classes.title} variant='h6' noWrap>
            BioCompute Object Portal
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {auth.user ? (
              <>
                <Tooltip title="Home">
                  <IconButton component={Link} to='/' aria-label='go home' color='inherit'>
                    <HomeIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="BCO Resources">
                  <IconButton component={Link} to='/resources' aria-label='BCO builder' color='inherit'>
                    <Badge overlap="rectangular" badgeContent={0} color='secondary'>
                      <SettingsInputAntennaIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="BCO Builder">
                  <IconButton component={Link} to='/builder' aria-label='BCO builder' color='inherit'>
                    <Badge overlap="rectangular" badgeContent={0} color='secondary'>
                      <EditOutlinedIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Prefix registry">
                  <IconButton component={Link} to="/prefix" aria-label='prefix registry' color='inherit'>
                    <Badge overlap="rectangular" badgeContent={0} color='secondary'>
                      <GroupIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="BioCompute Object DB">
                  <IconButton component={Link} to='/bcodbs' aria-label='show 0 new notifications' color='inherit'>
                    <Badge overlap="rectangular" badgeContent={0} color='secondary'>
                      <SearchIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="About Us">
                  <IconButton component={Link} to='/about' aria-label='show 0 new notifications' color='inherit'>
                    <Badge overlap="rectangular" badgeContent={0} color='secondary'>
                      <InfoOutlinedIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Bug Report">
                  <a href='https://github.com/biocompute-objects/portal_userdb/issues/new/choose' target='_blank' rel="noreferrer" >
                    <IconButton aria-label='BCO builder' color='inherit'>
                      <Badge overlap="rectangular" badgeContent={0} color='secondary'>
                        <BugReportIcon />
                      </Badge>
                    </IconButton>
                  </a>
                </Tooltip>
                <Tooltip title="Contact us">
                  <a href='https://docs.biocomputeobject.org/contact' target='_blank' rel="noreferrer">
                    <IconButton aria-label='BCO builder' color='inherit'>
                      <Badge overlap="rectangular" badgeContent={0} color='secondary'>
                        <ContactPageIcon />
                      </Badge>
                    </IconButton>
                  </a>
                </Tooltip>
                <Tooltip title="Profile Page">
                  <IconButton
                    component={Link} to='/profile'
                    edge='end'
                    aria-label='account of current user'
                    aria-haspopup='true'
                    color='inherit'
                  >
                    <div className={classes.imageContainer}>
                      {
                        (auth.user.imageUrl)
                          ? (<img src={auth.user.imageUrl} alt="user profile"/>)
                          : (<div>{auth.user.userinfo.username}</div>)
                      }
                    </div>
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title="Home">
                  <IconButton component={Link} to='/' aria-label='go home' color='inherit'>
                    <HomeIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="BCO Resources">
                  <IconButton component={Link} to='/resources' aria-label='BCO builder' color='inherit'>
                    <Badge overlap="rectangular" badgeContent={0} color='secondary'>
                      <SettingsInputAntennaIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="BCO Builder">
                  <IconButton component={Link} to='/builder' aria-label='BCO builder' color='inherit'>
                    <Badge overlap="rectangular" badgeContent={0} color='secondary'>
                      <EditOutlinedIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Prefix registry">
                  <IconButton component={Link} to="/prefix" aria-label='prefix registry' color='inherit'>
                    <Badge overlap="rectangular" badgeContent={0} color='secondary'>
                      <GroupIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="BioCompute Object DB">
                  <IconButton component={Link} to='/bcodbs' aria-label='show 0 new notifications' color='inherit'>
                    <Badge overlap="rectangular" badgeContent={0} color='secondary'>
                      <SearchIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="About Us">
                  <IconButton component={Link} to='/about' aria-label='show 0 new notifications' color='inherit'>
                    <Badge overlap="rectangular" badgeContent={0} color='secondary'>
                      <InfoOutlinedIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Bug Report">
                  <a href='https://github.com/biocompute-objects/portal_userdb/issues/new/choose' target='_blank' rel="noreferrer">
                    <IconButton aria-label='BCO builder' color='inherit'>
                      <Badge overlap="rectangular" badgeContent={0} color='secondary'>
                        <BugReportIcon />
                      </Badge>
                    </IconButton>
                  </a>
                </Tooltip>
                <Tooltip title="Contact us">
                  <a href='https://docs.biocomputeobject.org/contact' target='_blank' rel="noreferrer">
                    <IconButton aria-label='BCO builder' color='inherit'>
                      <Badge overlap="rectangular" badgeContent={0} color='secondary'>
                        <ContactPageIcon />
                      </Badge>
                    </IconButton>
                  </a>
                </Tooltip>
                <IconButton component={Link} to='/login' aria-label='log in' color='inherit'>
                  <Typography variant='h6' component='h6'>
                    Log in
                  </Typography>
                </IconButton>
              </>
            )}
          </div>
          <div className={classes.sectionMobile}>
            {auth.user ? (
              <>
                <IconButton
                  aria-label='show more'
                  aria-controls={mobileMenuId}
                  aria-haspopup='true'
                  onClick={handleMobileMenuOpen}
                  color='inherit'
                >
                  <MoreIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  aria-label='show more'
                  aria-controls={mobileMenuNoLogIn}
                  aria-haspopup='true'
                  onClick={handleMobileMenuOpen}
                  color='inherit'
                >
                  <MoreIcon />
                </IconButton>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {auth.user ? renderMobileMenu : renderMenuNoLogIn}
    </header>
  );
};

export default NavBar;