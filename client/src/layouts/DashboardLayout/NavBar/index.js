import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { cargaMenuAccion } from 'src/redux/generalDucks'
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
  ListSubheader
} from '@material-ui/core';
import {
  Settings as SettingsIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  Home as HomeIcon,
  List as ListIcon,
  Map,
  PhoneCall
} from 'react-feather';
import NavItem from './NavItem';


const items1 = [
  {
    _id: 1,
    grupo: 'Encuestas',
    items: [
      {
        href: '/app/contacto',
        icon: PhoneCall,
        title: 'Contacto'
      },
      {
        href: '/app/encuestas',
        icon: ListIcon,
        title: 'Encuestas'
      }
    ]
  },
  {
    _id: 2,
    grupo: 'Padrón',
    items: [
      {
        href: '/app/apoyos',
        icon: UsersIcon,
        title: 'Padrón'
      },
      {
        href: '/app/mapa',
        icon: Map,
        title: 'Mapa'
      }
    ]
  },
  {
    _id: 3,
    grupo: 'Administración',
    items: [
      {
        href: '/app/usuarios',
        icon: UserPlusIcon,
        title: 'Usuarios'
      },
      {
        href: '/app/settings',
        icon: SettingsIcon,
        title: 'Ajustes'
      },
      {
        href: '/app/account',
        icon: UserIcon,
        title: 'Perfil'
      }
    ]
  }
];

const items2 = [
  {
    _id: 1,
    grupo: 'Encuestas',
    items: [
      {
        href: '/app/contacto',
        icon: PhoneCall,
        title: 'Contacto'
      }
    ]
  },
]
const items3 = [
  {
    _id: 1,
    grupo: 'Encuestas',
    items: [
      {
        href: '/app/contacto',
        icon: PhoneCall,
        title: 'Contacto'
      },
      {
        href: '/app/encuestas',
        icon: ListIcon,
        title: 'Encuestas'
      }
    ]
  },
]


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

const NavBar = ({ onMobileClose, openMobile, auth }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const [menu, setMenu] = useState([]);
  const [user, setUser] = useState({
    avatar: '',
    title: '',
    name: ''
  });

  useEffect(() => {
    if (auth.usuario !== null) {
      if (openMobile && onMobileClose) {
        onMobileClose();
      }
      setMenu(auth.usuario.rol === 1 ? items1 : auth.usuario.rol === 2 ? items2 : items3)
      setUser({
        name: auth.usuario.nombre,
        title: auth.usuario.rol === 1 ? "Administrador" : auth.usuario.rol === 2 ? "Agente" : "Editor"
      })
      dispatch(cargaMenuAccion(auth.usuario.rol === 1 ? items1 : auth.usuario.rol === 2 ? items2 : items3))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, auth, dispatch]);

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
          {user.title}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          <NavItem
            href='/app/home'
            title='Home'
            icon={HomeIcon}
          />
        </List>

        {menu.map((item) => (
          <List
            key={item._id}
            subheader={
              <ListSubheader
                disableGutters
                disableSticky
              >
                {item.grupo}
              </ListSubheader>
            }
          >
            {
              item.items.map((orale) => (
                <NavItem
                  href={orale.href}
                  key={orale.title}
                  title={orale.title}
                  icon={orale.icon}
                />

              ))
            }

          </List>
        ))}

      </Box>

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
