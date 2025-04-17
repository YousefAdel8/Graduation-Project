import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BeatLoader } from "react-spinners";

// Import components
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import FeedbackPage from "./components/FeedbackPage/FeedbackPage.jsx";
import ReportPage from "./components/ReportPage/ReportPage.jsx";
import SocialMedia from "./components/SocialMedia/SocialMedia.jsx";

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
          path: "/unauthorized",
          element: <UnAuthorized />,
        },
			],
		},
		{
			path: "*",
			element: (
				<div className="vh-100 d-flex justify-content-center align-items-center">
					<BeatLoader color="#36d7b7" size={60} />
				</div>
			),
		},
	]);

	return (
		<PermissionProvider>
			<RouterProvider router={routers} />
		</PermissionProvider>
	);
}

export default App;
