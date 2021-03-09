import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
//import DashboardView from 'src/views/reports/DashboardView';
import Home from 'src/views/home'
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import SettingsView from 'src/views/settings/SettingsView';
import ApoyosListView from './views/apoyos/ApoyosView';
import AgregarApoyo from './views/apoyos/ApoyosView/Agregar';
import Mapa from './views/mapa/MapaView';
import ContactosView from './views/contactos/ContactosView';
import EncuestaAgente from './views/contactos/ContactosView/Encuesta';
import UsuariosView from './views/usuarios/UsuariosView/';
import EncuestasView from './views/encuestas/EncuestasView';
import EncuestaDetalle from './views/encuestas/EncuestasView/EncuestaDetalle'
import AgregaEncuesta from './views/encuestas/EncuestasView/AgregaEncuesta'

//objeto de la Versión 6 en lugar de usar el elemento react como <Route>
const routes = (auth) => [
  {
    path: 'app',
    //    element: auth.isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />,
    element: !auth.isAuthenticated && !auth.loading ? <Navigate to="/login" /> : <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'usuarios', element: <UsuariosView /> },
      { path: 'home', element: <Home /> },
      { path: 'encuestas', element: <EncuestasView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: 'apoyos', element: <ApoyosListView /> },
      { path: 'agregarapoyo', element: <AgregarApoyo /> },
      { path: 'mapa', element: <Mapa /> },
      { path: 'contacto', element: <ContactosView /> },
      { path: 'encuestagente', element: <EncuestaAgente /> },
      { path: 'encuestadetalle', element: <EncuestaDetalle /> },
      { path: 'agregaencuesta', element: <AgregaEncuesta /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/home" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
