import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.css";
import App from "./App";
import "antd/dist/reset.css";
import { UserContextProvider } from "./context/usercontext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<UserContextProvider>
		<App />
	</UserContextProvider>
);
