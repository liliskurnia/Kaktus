// import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
// import ProtectedRoute from 'layout/Protected/ProtectedRoute';
import { useAuth } from 'hooks/useAuth';
// import Customization from '../Customization';

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <Navigate to="/dashboard/default" />
  ) : (
    <>
      <Outlet />

      {/* <Customization /> */}
    </>
  );
};

export default AuthLayout;
