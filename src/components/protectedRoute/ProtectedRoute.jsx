import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

function ProtectedRoute ({ isLoggedIn, children }){
    if (!isLoggedIn) {
        return <Navigate to="/sign-in" replace />;
    }
    return children;
}

ProtectedRoute.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
}
export default ProtectedRoute;
