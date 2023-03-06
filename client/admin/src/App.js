import React, { useEffect } from "react";
import HomePage from "./pages/HomePage";
import ScrollToTop from "./pages/components/ScrollToTop";
import { BrowserRouter } from "react-router-dom";

import useAuth from "./hooks/useAuth";

function App() {
	const { setAuth } = useAuth();

	useEffect(() => {
		getToken();
	}, []);

	const getToken = () => {
		let authLocal;

		try {
			authLocal = localStorage.getItem("adauth");
			setAuth(JSON.parse(authLocal));
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<BrowserRouter>
			<ScrollToTop />
			<HomePage />
		</BrowserRouter>
	);
}

export default App;
