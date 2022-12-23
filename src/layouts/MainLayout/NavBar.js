import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import Menu from '@material-ui/core/Menu';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ConstructionIcon from '@mui/icons-material/Construction';
import DataObjectIcon from '@mui/icons-material/DataObject';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BugReportIcon from '@mui/icons-material/BugReport';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Switch from '@material-ui/core/Switch';
import { useDispatch, useSelector } from 'react-redux';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  nav: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  themeToggle: {
    [theme.breakpoints.up('sm')]: {
      padding: 0
    }
  },
  imageContainer: {
    maxWidth: '100%',
    height: 'auto',
    '& img': {
      width: '2em'
    }
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
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

  const mobileMenuId = 'menu-mobile';
  /*Need to add switch in here */
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label='go home' color='inherit'>
          <Badge overlap="rectangular" badgeContent={0} color='secondary'>
            <HomeIcon />
          </Badge>
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label='BioCompute Object builder' color='inherit'>
          <Badge overlap="rectangular" badgeContent={0} color='secondary'>
            <ConstructionIcon />
          </Badge>
        </IconButton>
        <p>BCO Builder</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label='prefix registry' color='inherit'>
          <Badge overlap="rectangular" badgeContent={0} color='secondary'>
            <AppRegistrationIcon />
          </Badge>
        </IconButton>
        <p>Prefix Registry</p>
      </MenuItem>
      <MenuItem>
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
                <Tooltip title="BCO Builder">
                  <IconButton component={Link} to='/builder' aria-label='BCO builder' color='inherit'>
                    <Badge overlap="rectangular" badgeContent={0} color='secondary'>
                      <ConstructionIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Prefix registry">
                  <IconButton aria-label='prefix registry' color='inherit'>
                    <Badge overlap="rectangular" badgeContent={0} color='secondary'>
                      <AppRegistrationIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="BioCompute Object DB">
                  <IconButton aria-label='show 0 new notifications' color='inherit'>
                    <Badge overlap="rectangular" badgeContent={0} color='secondary'>
                      <DataObjectIcon />
                    </Badge>
                  </IconButton>
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
                        ? (<img src={auth.user.imageUrl}/>)
                        : (<div>{auth.user.username}</div>)
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
                <Tooltip title="BCO Builder">
                  <IconButton component={Link} to='/builder' aria-label='BCO builder' color='inherit'>
                    <Badge overlap="rectangular" badgeContent={0} color='secondary'>
                      <ConstructionIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Prefix registry">
                  <IconButton aria-label='prefix registry' color='inherit'>
                    <Badge overlap="rectangular" badgeContent={0} color='secondary'>
                      <AppRegistrationIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="BioCompute Object DB">
                  <IconButton aria-label='show 0 new notifications' color='inherit'>
                    <Badge overlap="rectangular" badgeContent={0} color='secondary'>
                      <DataObjectIcon />
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
              <Typography variant='h6' component='h6'>
                Not Logged in
              </Typography>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </header>
  );
};

export default NavBar;