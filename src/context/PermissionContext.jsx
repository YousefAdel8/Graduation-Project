import React, { createContext, useEffect, useState } from "react";
import { getTokenData } from "../components/TokenEncode/Token";
export const PermissionContext = createContext();
export const PermissionProvider = ({ children }) => {
	const [permissions, setPermissions] = useState(["dashboard"]);
	useEffect(() => {
		const tokenData = getTokenData();
		if (tokenData?.role === "Admin") {
			setPermissions([
				"dashboard",
				"feedback",
				"report",
				"social media",
				"users",
				"emergency",
			]);
		} else {
			setPermissions(["dashboard"]);
		}
	}, []);
	return (
		<PermissionContext.Provider value={{ permissions }}>
			{children}
		</PermissionContext.Provider>
	);
};
