import PropTypes from 'prop-types';

import { Navigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';

const ProtectedRoute = ({ children, redirectTo }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  redirectTo: PropTypes.string
};
