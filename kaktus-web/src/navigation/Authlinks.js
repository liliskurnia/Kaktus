import { lazy } from 'react';

import Loadable from '../components/UI/Loading/Loadable';
import AuthLayout from '../layout/AuthLayout/AuthLayout';

const AuthLogin = Loadable(lazy(() => import('views/Authentication/pages/Login')));
const AuthRegister = Loadable(lazy(() => import('views/Authentication/pages/Register')));

const Authlinks = {
  path: '/auth',
  element: <AuthLayout />,
  children: [
    {
      path: 'login',
      element: <AuthLogin />
    },
    {
      path: 'register',
      element: <AuthRegister />
    }
  ]
};

export default Authlinks;
