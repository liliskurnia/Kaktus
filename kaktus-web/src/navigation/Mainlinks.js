import { lazy } from 'react';

import AppLayout from 'layout/MainLayout/AppLayout';
import Loadable from '../components/UI/Loading/Loadable';

const Dashboard = Loadable(lazy(() => import('views/Dashboard')));

const Mainlinks = {
  path: '/',
  element: <AppLayout />,
  children: [
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <Dashboard />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: 'manage-users'
        },
        {
          path: 'manage-roles'
        },
        {
          path: 'manage-access'
        }
      ]
    },
    {
      path: 'operator'
    }
    // {
    //   path: '*',
    //   element: <NotFound />
    // }
  ]
};

export default Mainlinks;
