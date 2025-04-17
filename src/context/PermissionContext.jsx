import React, { createContext, useState } from "react";
export const PermissionContext = createContext();
export const PermissionProvider = ({ children }) => {
	//const permissions = ['dashboard', 'feedback', 'report', 'users', 'social media'];
	const [permissions, setPermissions] = useState([
        "dashboard",
        "feedback",
        "report",
        "users",
      ]);
	return (
		<PermissionContext.Provider value={{ permissions }}>
			{children}
		</PermissionContext.Provider>
	);
};
