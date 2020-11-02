import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';

const user = {
  avatar: 'data:image/png;base64,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',
  jobTitle: 'Administrator',
  name: 'Kento'
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
    icon: ShoppingBagIcon,
    title: 'Commands'
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
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
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
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
