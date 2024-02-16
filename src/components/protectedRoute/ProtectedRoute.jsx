import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector(state => state.common.isLoggedIn);

  return isLoggedIn ? children : <Navigate to="/sign-in" replace />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
