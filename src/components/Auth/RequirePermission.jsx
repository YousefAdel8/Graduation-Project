import React, { useContext } from "react";
import { PermissionContext } from "../../context/PermissionContext.jsx";
import { Navigate } from "react-router-dom";
export const RequirePermission = ({ permission, children }) => {
	const { permissions } = useContext(PermissionContext);
	if (!permissions.includes(permission)) {
		return <Navigate to="/unauthorized" replace />;
	}
	return children;
};
export default RequirePermission;
