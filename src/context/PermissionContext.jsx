import React, { createContext, useEffect, useState } from "react";
import { getTokenData } from "../components/TokenEncode/Token";
export const PermissionContext = createContext();
export const PermissionProvider = ({ children }) => {
	const tokenData = getTokenData();
	const [permissions, setPermissions] = useState(["dashboard"]);
	useEffect(() => {
		if (tokenData?.role === "Admin") {
			setPermissions([
				"dashboard",
				"feedback",
				"report",
				"social media",
				"users",
				"emergency",
			]);
		}
	}, [tokenData]);
	return (
		<PermissionContext.Provider value={{ permissions }}>
			{children}
		</PermissionContext.Provider>
	);
};
