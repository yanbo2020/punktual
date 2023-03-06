import React from "react";
import { Routes, Route, Outlet, useLocation, Navigate } from "react-router-dom";
import { Links } from "../routes";

// pages
import DashboardOverview from "./dashboard/DashboardOverview";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import Lock from "./auth/Lock";
import NotFoundPage from "./auth/NotFound";
import ServerError from "./auth/ServerError";
import AuthLayout from "../components/layout/AuthLayout";
import MainLayout from "../components/layout/MainLayout";
import StudentsAccounts from "./StudentsAccounts";
import useAuth from "../hooks/useAuth";
import AdminAccounts from "./AdminAccounts";
import NotificationsPage from "./NotificationsPage";
import TeacherAccounts from "./TeacherAccounts";
import Courses from "./Courses";
import Settings from "./Settings";
import Attendance from "./Attendance";
import AttendanceRecords from "./AttendanceRecords";
import Buildings from "./Buildings";

const RouteWithLoader = () => {
	const { auth } = useAuth();
	const location = useLocation();

	return auth?.user ? (
		<Navigate
			to={Links.DashboardOverview.path}
			state={{ from: location }}
			replace
		/>
	) : (
		<Outlet />
	);
};

const RouteWithSidebar = () => {
	const authLocal = localStorage.getItem("adauth");
	const auth = JSON.parse(authLocal);

	const location = useLocation();
	if (auth?.admin) {
		return <Outlet />;
	} else {
		return (
			<Navigate
				to={Links.Signin.path}
				state={{ from: location }}
				replace
			/>
		);
	}
};

const HomePage = () => (
	<Routes>
		{/* pages */}
		<Route path="/" element={<MainLayout />}>
			<Route element={<RouteWithSidebar />}>
				<Route
					exact
					path={Links.DashboardOverview.path}
					element={<DashboardOverview />}
				/>
				<Route
					exact
					path={Links.Notifications.path}
					element={<NotificationsPage title="Notifications" show={false} />}
				/>
				<Route
					exact
					path={Links.StudentsAccounts.path}
					element={<StudentsAccounts />}
				/>
				<Route
					exact
					path={Links.StudentsAttendance.path}
					element={<Attendance />}
				/>
				<Route
					exact
					path={Links.Courses.path}
					element={<Courses/>}
				/>
				<Route
					exact
					path={Links.AdminAccounts.path}
					element={<AdminAccounts />}
				/>
				<Route
					exact
					path={Links.TeacherAccounts.path}
					element={<TeacherAccounts />}
				/>
				<Route
					exact
					path={Links.Settings.path}
					element={<Settings />}
				/>
				<Route
					exact
					path={Links.AttendanceRecords.path}
					element={<AttendanceRecords />}
				/>
				<Route
					exact
					path={Links.Buildings.path}
					element={<Buildings />}
				/>
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Route>

		<Route path="/" element={<AuthLayout />}>
			<Route element={<RouteWithLoader />}>
				<Route exact path={Links.Signin.path} element={<Signin />} />
				<Route exact path={Links.Signup.path} element={<Signup />} />
				<Route
					exact
					path={Links.ForgotPassword.path}
					element={<ForgotPassword />}
				/>
				<Route
					exact
					path={Links.ResetPassword.path}
					element={<ResetPassword />}
				/>
				<Route exact path={Links.Lock.path} element={<Lock />} />
				<Route
					exact
					path={Links.NotFound.path}
					element={<NotFoundPage />}
				/>
				<Route
					exact
					path={Links.ServerError.path}
					element={<ServerError />}
				/>
			</Route>
		</Route>
	</Routes>
);

export default HomePage;
