import React from "react";
import {  Navigate, useLocation } from "react-router-dom";
import * as ROUTES from "../constants/routes";


const ProtectedRoute = ({ user, children }) => {
  const location = useLocation()
  if (user) {
    return React.cloneElement(children, { user });
  } else {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }
};

export default ProtectedRoute