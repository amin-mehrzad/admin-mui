import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
// import AccountView from 'src/views/account/AccountView';
import ReportStatusView from 'src/views/reportStatus/ReportStatusView';
// import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import StatusListView from 'src/views/statusList/StatusListView';
import HubAssignment from 'src/views/hubAssignment/HubAssignmentView';
// import RegisterView from 'src/views/auth/RegisterView';
// import SettingsView from 'src/views/settings/SettingsView';

// const routeHandler = (user,permitedRoles)=>{
//  // if()

// }



const routes = (user) => [
  {
    path: 'app',
    element: Boolean(user) ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      // { path: 'account', element: <AccountView /> },
      // { path: 'customers', element: <ReportStatusView /> },
      // { path: 'dashboard', element: <DashboardView /> },
      {
        path: 'commands',
       // element: <ProductListView />
        element: user && [1].includes(user.roleId) ? <ProductListView /> : <Navigate to="/404" />,

      },
      {
        path: 'report',
       // element: <ReportStatusView />
        element: user && [1,2].includes(user.roleId) ? <ReportStatusView /> : <Navigate to="/404" />,

      },
      {
        path: 'status',
       // element: <StatusListView />
        element: user &&[1,2].includes(user.roleId) ? <StatusListView /> : <Navigate to="/404" />,
      },
      {
        path: 'hub-assignment',
        //element: <HubAssignment />
        element: user &&[1].includes(user.roleId) ? <HubAssignment /> : <Navigate to="/404" />,
      },
      // { path: 'settings', element: <SettingsView /> },
      {
        path: '*',
        element: <Navigate to="/404" />
      }
    ]
  },
  {
    path: '/',
    //element: !Boolean(user) ? <MainLayout /> : <Navigate to="/app/status" />,
     element: <MainLayout /> ,
    children: [
      { path: 'login',
      element: !Boolean(user) ? <LoginView /> : <Navigate to="/app/status" />,
      // element: <LoginView /> 
      },
      // { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
