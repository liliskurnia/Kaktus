import { lazy } from 'react';

import AppLayout from 'layout/MainLayout/AppLayout';
import ProtectedRoute from 'layout/Protected/ProtectedRoute';
import Loadable from '../components/UI/Loading/Loadable';

const Dashboard = Loadable(lazy(() => import('views/Dashboard')));
const ManageUser = Loadable(lazy(() => import('views/Admin/userManager')));
const ManageRole = Loadable(lazy(() => import('views/Admin/roleManager')));
const ManageAccess = Loadable(lazy(() => import('views/Admin/accessManager')));

const Mainlinks = {
  path: '/',
  element: (
    <ProtectedRoute redirectTo="/auth/login">
      <AppLayout />
    </ProtectedRoute>
  ),

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
          path: 'manage-users',
          element: <ManageUser />
        },
        {
          path: 'manage-roles',
          element: <ManageRole />
        },
        {
          path: 'manage-access',
          element: <ManageAccess />
        }
      ]
    },
    {
      path: 'operator',
      children: [
        {
          path: 'admin',
          children: [
            {
              path: 'overview',
              element: <Dashboard />
            },
            {
              path: 'manage-operator',
              element: <Dashboard />
            },
            {
              path: 'manage-tps',
              element: <Dashboard />
            }
          ]
        },
        {
          path: 'manage-sampah',
          element: <Dashboard />
        },
        {
          path: 'manage-schedule',
          element: <Dashboard />
        },
        {
          path: 'manage-request',
          children: [
            {
              path: 'overview',
              element: <Dashboard />
            },
            {
              path: 'tracking',
              element: <Dashboard />
            },
            {
              path: 'history',
              element: <Dashboard />
            }
          ]
        }
      ]
    },
    {
      path: 'customer',
      children: [
        {
          path: 'request'
        },
        {
          path: 'history'
        },
        {
          path: 'track'
        },
        {
          path: 'voucher'
        },
        {
          path: 'profile'
        }
      ]
    }
  ]
};

export default Mainlinks;
