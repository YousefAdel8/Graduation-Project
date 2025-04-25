import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.css";
import App from "./App";
import "antd/dist/reset.css";
import { UserContextProvider } from "./context/usercontext";
import { LanguageProvider } from "./context/LanguageContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<LanguageProvider>
  <UserContextProvider>
    <App />
  </UserContextProvider>
</LanguageProvider>
);
