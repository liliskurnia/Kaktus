import PropTypes from 'prop-types';

import { Navigate } from 'react-router-dom';

const OperatorRoute = ({ children, redirectTo }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const previllage = user.previllage;
  return previllage === ('Customer Admin' || 'Customer') ? children : <Navigate to={redirectTo} />;
};

export default OperatorRoute;

OperatorRoute.propTypes = {
  children: PropTypes.node,
  redirectTo: PropTypes.string
};
