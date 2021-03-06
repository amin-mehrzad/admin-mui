import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  // Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  // AlertCircle as AlertCircleIcon,
  // BarChart as BarChartIcon,
  // Lock as LockIcon,
  // Settings as SettingsIcon,
  // ShoppingBag as ShoppingBagIcon,
  // User as UserIcon,
  // UserPlus as UserPlusIcon,
  Code,
  Clipboard,
  Monitor,
  //Assignment,
  BookOpen as Book,
  // Users as UsersIcon
  Edit,
  Loader
} from 'react-feather';
import NavItem from './NavItem';
//import tooshlightLogo from '../../../images/tooshlight_logo.png';

import AuthService from "../../../services/auth.service";

const user = {
avatar: '/static/images/admin-icon-.png',
jobTitle: 'Admin',
name: 'Tooshlights'
};

const items = [
  // {
  //   href: '/app/dashboard',
  //   icon: BarChartIcon,
  //   title: 'Dashboard'
  // },
  // {
  //   href: '/app/customers',
  //   icon: UsersIcon,
  //   title: 'Customers'
  // },
  {
    href: '/app/commands',
    icon: Code,
    title: 'Hub Commands',
    roles: [1]
  },
  {
    href: '/app/display',
    icon: Monitor,
    title: 'Display',
    roles: [1,2]
  },
  {
    href: '/app/report',
    icon: Book,
    title: 'Report',
    roles: [1,2,3]
  },
  {
    href: '/app/status',
    icon: Loader,
    title: 'Live Occupancy Display',
    roles: [1,2,3]
  },
  {
    href: '/app/hub-assignment',
    icon: Edit,
    title: 'Hub Assignment',
    roles: [1]
  },
  {
    href: '/app/logs',
    icon: Clipboard,
    title: 'Live Logs',
    roles: [1]
  },
  // {
  //   href: '/app/account',
  //   icon: UserIcon,
  //   title: 'Account'
  // },
  // {
  //   href: '/app/settings',
  //   icon: SettingsIcon,
  //   title: 'Settings'
  // },
  // {
  //   href: '/login',
  //   icon: LockIcon,
  //   title: 'Login'
  // },
  // {
  //   href: '/register',
  //   icon: UserPlusIcon,
  //   title: 'Register'
  // },
  // {
  //   href: '/404',
  //   icon: AlertCircleIcon,
  //   title: 'Error'
  // }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  const currentUser = AuthService.getCurrentUser()

  console.log(currentUser)

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {/* {user.jobTitle} */}
          {[1,2].includes(currentUser.roleId)?'Admin':'Installer'}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            item.roles.includes(currentUser.roleId)?
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />:null
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
      {/* <Box
        p={2}
        m={2}
        bgcolor="background.dark"
      >
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          Need more?
        </Typography>
        <Typography
          align="center"
          variant="body2"
        >
          Upgrade to PRO version and access 20 more screens
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          <Button
            color="primary"
            component="a"
            href="https://react-material-kit.devias.io"
            variant="contained"
          >
            See PRO version
          </Button>
        </Box> 
      </Box>*/}
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default NavBar;
