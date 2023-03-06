import React, { useContext, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	FontAwesome,
	MaterialIcons,
	Fontisto,
	Ionicons,
} from "@expo/vector-icons";

import Home from "./Home";
import Courses from "./Courses";
import Profile from "./Profile";
import Notifications from "./Notifications";
import axios from "../../axios/axios";
import { AuthContext, StudentDataContext } from "../../data/context";
import { studentActions } from "../../data/reducers/StudentDataReducer";
import Loader from "../../components/Loader";
import { View } from "react-native";

const Tabs = createBottomTabNavigator();

const StudentMainNav = () => {
	const { studentDataState, studentDataDispatch } =
		useContext(StudentDataContext);
	const { authState } = useContext(AuthContext);
	const [appReady, setAppReady] = useState(false);

	const notifications = studentDataState?.notifications;

	useEffect(() => {
		async function getData() {
			try {
				const courses = await axios.get("/v1/courses");
				const notifications = await axios.get("/v1/notifications");
				const enrolledCourses = await axios.get(
					`/v1/student-courses/student/${authState?.auth?.user?._id}`
				);

				studentDataDispatch({
					type: studentActions.RESTORE,
					courses: courses.data,
					enrolledCourses: enrolledCourses.data,
					notifications: notifications.data,
				});
				setAppReady(true);
			} catch (err) {
				console.warn(err);
			}
		}
		getData();
	}, []);

	if (!appReady) {
		return (
			<View style={{ flex: 1 }}>
				<Loader visible />
			</View>
		);
	}

	return (
		<Tabs.Navigator
			screenOptions={{
				tabBarActiveTintColor: "#1C4652",
				headerShown: false,
				tabBarStyle: [
					{
						display: "flex",
					},
					null,
				],
			}}
		>
			<Tabs.Screen
				name="StudentHome"
				component={Home}
				options={{
					title: "Home",
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<FontAwesome name="home" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="StudentCourses"
				component={Courses}
				options={{
					title: "Classes",
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons
							name="library-books"
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="StudentNotifications"
				component={Notifications}
				options={{
					title: "Notifications",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="notifications"
							size={size}
							color={color}
						/>
					),
					tabBarBadge:
						notifications?.length > 0
							? notifications?.length
							: null,
				}}
			/>
			<Tabs.Screen
				name="StudentProfile"
				component={Profile}
				options={{
					title: "Profile",
					tabBarIcon: ({ color, size }) => (
						<Fontisto name="person" size={size} color={color} />
					),
				}}
			/>
		</Tabs.Navigator>
	);
};

export default StudentMainNav;
