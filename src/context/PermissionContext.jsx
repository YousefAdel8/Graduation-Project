import React, { createContext, useEffect, useState } from "react";
import { getTokenData } from "../components/TokenEncode/Token";

export const PermissionContext = createContext();

export const PermissionProvider = ({ children }) => {
	const [permissions, setPermissions] = useState(["dashboard"]);

	useEffect(() => {
		const tokenData = getTokenData();
		const roles = tokenData?.role || [];

		if (roles.includes("Admin")) {
			setPermissions([
				"dashboard",
				"feedback",
				"report",
				"social media",
				"users",
				"emergency",
			]);
		} else if (roles.includes("Manager")) {
			setPermissions([
				"dashboard",
				"feedback",
				"social media",
				"emergency"
			]);
		} else {
			const perms = [];
			if (roles.includes("Dashboard")) {
				perms.push("dashboard");
			}
			if (roles.includes("Emergency")) {
				perms.push("emergency");
			}
			setPermissions(perms);
		}
	}, []);

	return (
		<PermissionContext.Provider value={{ permissions }}>
			{children}
		</PermissionContext.Provider>
	);
};
