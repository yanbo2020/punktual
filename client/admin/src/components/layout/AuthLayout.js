import React, { useEffect, useState } from "react";
import Preloader from "../Preloader";
import { Outlet } from "react-router-dom";

function AuthLayout() {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setLoaded(true), 1000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			<Preloader show={loaded ? false : true} />
			<Outlet />
		</>
	);
}

export default AuthLayout;
