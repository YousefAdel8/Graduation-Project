import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import components
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import FeedbackPage from "./components/FeedbackPage/FeedbackPage.jsx";
import ReportPage from "./components/ReportPage/ReportPage.jsx";
import SocialMedia from "./components/SocialMedia/SocialMedia.jsx";
import Loading from "./components/LoadingPage/LoadingPage.jsx";
import UserManagment from "./components/UserManagment/UserManagment.jsx";
import NewUserPage from "./components/NewUser/NewUserPage.jsx";
import Profile from "./components/Profile/Profile.jsx";
//Auth
import RequireAuth from "./components/Auth/RequireAuth.jsx";
//Auth Permissions
import { PermissionProvider } from "./context/PermissionContext.jsx";
import UnAuthorized from "./components/UnAuthorized/UnAuthorized.jsx";
import RequirePermission from "./components/Auth/RequirePermission.jsx";
function App() {
	const routers = createBrowserRouter([
		{
			path: "/",
			element: <RequireAuth />,
			children: [
				{
					path: "/",
					element: (
						<RequirePermission permission="dashboard">
							<Dashboard />
						</RequirePermission>
					),
				},
				{
					path: "/feedback",
					element: (
						<RequirePermission permission="feedback">
							<FeedbackPage />
						</RequirePermission>
					),
				},
				{
					path: "/report",
					element: (
						<RequirePermission permission="report">
							<ReportPage />
						</RequirePermission>
					),
				},
				{
					path: "/socialmedia",
					element: (
						<RequirePermission permission="social media">
							<SocialMedia />
						</RequirePermission>
					),
				},
				{
					path: "/users",
					element: (
						<RequirePermission permission="users">
							<UserManagment />
						</RequirePermission>
					),
				},
				{
					path: "/users/new",
					element: (
						<RequirePermission permission="users">
							<NewUserPage />
						</RequirePermission>
					),
				},
				{
					path: "/profile",
					element: (
						<RequirePermission permission="dashboard">
							<Profile />
						</RequirePermission>
					),
				},
				{
					path: "/unauthorized",
					element: <UnAuthorized />,
				},
			],
		},
		{
			path: "*",
			element: <Loading />,
		},
	]);

	return (
		<PermissionProvider>
			<RouterProvider router={routers} />
		</PermissionProvider>
	);
}

export default App;
