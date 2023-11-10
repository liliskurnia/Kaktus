import PropTypes from 'prop-types';

import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children, redirectTo }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const previllage = user.previllage;
  return previllage === ('System Admin' || 'User Admin') ? children : <Navigate to={redirectTo} />;
};

export default AdminRoute;

AdminRoute.propTypes = {
  children: PropTypes.node,
  redirectTo: PropTypes.string
};
