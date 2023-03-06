import React from "react";
import { createRoot } from "react-dom/client";

// core styles
import "./scss/volt.scss";

import App from "./App";
import { AuthProvider } from "./context/AuthProvider";

const root = createRoot(document.getElementById("root"));

root.render(
	<AuthProvider>
		<App />
	</AuthProvider>
);
