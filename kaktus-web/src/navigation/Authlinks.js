import { lazy } from 'react';

import Loadable from '../components/UI/Loading/Loadable';
import AuthLayout from '../layout/AuthLayout/AuthLayout';

const Login = Loadable(lazy(() => import('views/Authentication/Login')));
const Register = Loadable(lazy(() => import('views/Authentication/Register')));

const Authlinks = {
  path: '/auth',
  element: <AuthLayout />,
  children: [
    {
      path: 'login',
      element: <Login />
    },
    {
      path: 'register',
      element: <Register />
    }
  ]
};

export default Authlinks;
