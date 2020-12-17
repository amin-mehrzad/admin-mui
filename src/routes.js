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
// import StatusListView from 'src/views/statusList/StatusListView';
import HubAssignment from 'src/views/hubAssignment/HubAssignmentView';
// import RegisterView from 'src/views/auth/RegisterView';
// import SettingsView from 'src/views/settings/SettingsView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      // { path: 'account', element: <AccountView /> },
      // { path: 'customers', element: <ReportStatusView /> },
      // { path: 'dashboard', element: <DashboardView /> },
      { path: 'commands', element: <ProductListView /> },
      { path: 'report', element: <ReportStatusView /> },
      // { path: 'status', element: <StatusListView /> },
      { path: 'hub-assignment', element: <HubAssignment /> },
      // { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      // { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
