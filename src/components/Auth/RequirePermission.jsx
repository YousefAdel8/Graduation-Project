import React, { useContext } from "react";
import { PermissionContext } from "../../context/PermissionContext.jsx";
import { Navigate } from "react-router-dom";
import Loading from "../LoadingPage/LoadingPage.jsx";

export const RequirePermission = ({ permission, children }) => {
  const { permissions, isLoading } = useContext(PermissionContext);

  if (isLoading) {
    return <Loading />;  
  }

  if (!permissions.includes(permission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RequirePermission;
