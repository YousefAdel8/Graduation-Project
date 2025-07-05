import React, { createContext, useContext, useEffect, useState } from "react";
import { getTokenData } from "../components/TokenEncode/Token";
import { UserContext } from "./usercontext";

export const PermissionContext = createContext();

export const PermissionProvider = ({ children }) => {
	const [permissions, setPermissions] = useState([]);
	const [isLoading, setIsLoading] = useState(true); 
	const clearPermissions = () => setPermissions(["dashboard"]); 
	 const { userToken, isTokenChecked } = useContext(UserContext);
	useEffect(() => {
		if (!isTokenChecked) return;
		console.log("PermissionProvider mounted");
		const fetchPermissions = async () => {
			if (!userToken) {
        console.log("userToken is null, skipping permissions");
        return;
      }
			const tokenData = await getTokenData(userToken);
			if (!tokenData) {
				console.log("tokenData is null, skipping permissions");
				setIsLoading(false);
				return;
			}
			console.log("Token Data:", tokenData);
			const roles = tokenData.role || [];
			
			if (roles.includes("Admin")) {
				setPermissions(["dashboard", "feedback", "report", "social media", "users", "emergency"]);
				console.log("permissions set to admin permissions");
			} else if (roles.includes("Manager")) {
				setPermissions(["dashboard", "feedback", "social media", "emergency"]);
				console.log("permissions set to manager permissions");
			} else {
				const perms = [];
				if (roles.includes("Dashboard")) perms.push("dashboard");
				if (roles.includes("Emergency")) perms.push("emergency");
				setPermissions(perms);
				console.log("permissions set to:", perms);
			}
			setIsLoading(false);
		};

		fetchPermissions();
	}, [userToken, isTokenChecked]);

	return (
		<PermissionContext.Provider value={{ permissions, clearPermissions, isLoading }}>
			{children}
		</PermissionContext.Provider>
	);
};