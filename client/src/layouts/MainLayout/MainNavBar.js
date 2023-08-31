import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import Menu from "@material-ui/core/Menu";
import Tooltip from "@mui/material/Tooltip";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ConstructionIcon from "@mui/icons-material/Construction";
import DataObjectIcon from "@mui/icons-material/DataObject";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useSelector } from "react-redux";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DocDropDown from "../shared/DocDropDown";
import AppDropDown from "../shared/AppDropDown";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import HelpDropDown from "../shared/HelpDropDown";
import QuickSearch from "../../components/quickSearch";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
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
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#ffffff", // White background color
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "150px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "80%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    textAlign:"center"
  },
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
      <MenuItem>
        <QuickSearch
          onClick={()=>{console.log(mobileMoreAnchorEl)}}
        />
      </MenuItem>
      <MenuItem component={Link} to='/'>
        <IconButton aria-label='go home' color='inherit'>
          <Badge overlap="rectangular" badgeContent={0} color='secondary'>
            <HomeIcon />
          </Badge>
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem component={Link} to='/builder'>
        <IconButton aria-label='BioCompute Object builder' color='inherit'>
          <Badge overlap="rectangular" badgeContent={0} color='secondary'>
            <ConstructionIcon />
          </Badge>
        </IconButton>
        <p>BCO Builder</p>
      </MenuItem>
      <MenuItem component={Link} to="/prefix">
        <IconButton aria-label='prefix registry' color='inherit'>
          <Badge overlap="rectangular" badgeContent={0} color='secondary'>
            <AppRegistrationIcon />
          </Badge>
        </IconButton>
        <p>Prefix Registry</p>
      </MenuItem>
      <MenuItem component={Link} to='/bcodbs'>
        <IconButton aria-label='BCO DB' color='inherit'>
          <Badge overlap="rectangular" badgeContent={0} color='secondary'>
            <DataObjectIcon />
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
              <BugReportOutlinedIcon />
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
      <MenuItem component={Link} to='/builder'>
        <IconButton aria-label='BioCompute Object builder' color='inherit'>
          <Badge overlap="rectangular" badgeContent={0} color='secondary'>
            <ConstructionIcon />
          </Badge>
        </IconButton>
        <p>BCO Builder</p>
      </MenuItem>
      <MenuItem component={Link} to="/prefix">
        <IconButton aria-label='prefix registry' color='inherit'>
          <Badge overlap="rectangular" badgeContent={0} color='secondary'>
            <AppRegistrationIcon />
          </Badge>
        </IconButton>
        <p>Prefix Registry</p>
      </MenuItem>
      <MenuItem component={Link} to='/bcodbs'>
        <IconButton aria-label='BCO DB' color='inherit'>
          <Badge overlap="rectangular" badgeContent={0} color='secondary'>
            <DataObjectIcon />
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
              <BugReportOutlinedIcon />
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
            <a href="/" className="nav-link">BioCompute Object Portal </a>
          </Typography>
          <div className={classes.grow}>
            <QuickSearch />
          </div>
          <div className={classes.sectionDesktop}>
            {auth.user ? (
              <>
                <Tooltip title="Apps">
                  <><AppDropDown /></>
                </Tooltip>
                <Tooltip title="Documentation">
                  <><DocDropDown /></>
                </Tooltip>
                <Tooltip title="Help">
                  <><HelpDropDown /></>
                </Tooltip>
                <Tooltip title="About Us">
                  <><IconButton component={Link} to='/about' aria-label='show 0 new notifications' color='inherit'>
                    <Badge overlap="rectangular" badgeContent={0} color='secondary'>
                      <InfoOutlinedIcon />
                    </Badge>
                  </IconButton></>
                </Tooltip>
                <Tooltip title="Profile Page">
                  <><IconButton
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
                  </IconButton></>
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title="Apps">
                  <><AppDropDown /></>
                </Tooltip>
                <Tooltip title="Documentation">
                  <><DocDropDown /></>
                </Tooltip>
                <Tooltip title="Help">
                  <><HelpDropDown /></>
                </Tooltip>
                <Tooltip title="About Us">
                  <IconButton component={Link} to='/about' aria-label='show 0 new notifications' color='inherit'>
                    <Badge overlap="rectangular" badgeContent={0} color='secondary'>
                      <InfoOutlinedIcon className="hover-background white-icon" />
                    </Badge>
                  </IconButton>
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