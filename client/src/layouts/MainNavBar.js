import React, {useEffect, useState} from "react";
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
import DocDropDown from "./shared/DocDropDown";
import AppDropDown from "./shared/AppDropDown";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import HelpDropDown from "./shared/HelpDropDown";
import QuickSearch from "../components/quickSearch";

const NavBar = () => {
  const auth = useSelector((state) => state.account);
  const [windowWidth, setWindowWidth] = useState(global.window.innerWidth);
  
  
  /* Should hold reference to DOM element, set anchorEl when
  menu is clicked open.*/
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  /*The anchor pieces of state need to either be null or have a DOM element */
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  useEffect(() => {
    // Update window width when the component mounts and on window resize
    const handleResize = () => {
      setWindowWidth(global.window.innerWidth);
    };

    global.window.addEventListener("resize", handleResize);

    return () => {
      // Clean up the event listener when the component unmounts
      global.window.removeEventListener("resize", handleResize);
    };
  }, []);

  const mobileMenuId = "menu-mobile";
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
          <Badge className="white-icon hover-background" overlap="rectangular" badgeContent={0}>
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
      {auth.user ? (
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
      ) : (
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
      )}
    </Menu>
  );
  
  return (
    <header className="grow">
      <AppBar component='div'>
        <Toolbar component='nav' >
          <Tooltip title="Home">
            <Typography  variant='h6' noWrap>
              <a href="/" className="nav-link">
                <HomeIcon />{" "}
                {windowWidth > 820 ? (
                  "BioCompute Object Portal"
                ) : (
                  "BCO Portal"
                )}
              </a>
            </Typography>
          </Tooltip>
          <div className="grow" />
          <QuickSearch />
          <div className="grow" />
          <div className="section-desktop">
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
              <IconButton component={Link} to='/about' aria-label='show 0 new notifications' className="nav-link">
                <Badge overlap="rectangular" badgeContent={0} color='secondary'>
                  <InfoOutlinedIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            {auth.user ? (
              <>
                <Tooltip title="Profile Page">
                  <IconButton
                    component={Link} to='/profile'
                    edge='end'
                    aria-label='account of current user'
                    aria-haspopup='true'
                    color='inherit'
                  >
                    <div className="image-container">
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
                <IconButton 
                  component={Link} 
                  to='/login' 
                  aria-label='log in' 
                  className="nav-link"
                >
                  <Typography variant='h6' component='h6'>
                    Log in
                  </Typography>
                </IconButton>
              </>
            )}
          </div>

          <div className="section-mobile">
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              className="nav-link"
            >
              <MoreIcon />
            </IconButton>
            
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </header>
  );
};

export default NavBar;