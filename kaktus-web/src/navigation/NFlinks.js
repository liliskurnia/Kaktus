import { lazy } from 'react';

import Loadable from '../components/UI/Loading/Loadable';
import AuthLayout from '../layout/AuthLayout/AuthLayout';

const NotFound = Loadable(lazy(() => import('views/NotFound')));
const AccessDenied = Loadable(lazy(() => import('views/AccessDenied')));

const NFlinks = {
  path: '/',
  element: <AuthLayout />,
  children: [
    {
      path: '*',
      element: <NotFound />
    },
    {
      path: 'access-denied',
      element: <AccessDenied />
    }
  ]
};

export default NFlinks;
