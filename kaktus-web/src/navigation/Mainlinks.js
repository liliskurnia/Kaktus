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
      path: 'operator'
    }
  ]
};

export default Mainlinks;
