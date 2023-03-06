import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Preloader from "../Preloader";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Footer from "../Footer";

function MainLayout() {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setLoaded(true), 1000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			<Preloader show={loaded ? false : true} />
			<Sidebar />

			<main className="content">
				<Navbar />
				<Outlet />
				<Footer />
			</main>
		</>
	);
}

export default MainLayout;
