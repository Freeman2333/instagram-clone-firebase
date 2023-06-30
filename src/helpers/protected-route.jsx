import React from "react";
import {  Navigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";


const ProtectedRoute = ({ user, children }) => {
  if (user) {
    return React.cloneElement(children, { user });
  } else {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }
};

export default ProtectedRoute