import React, { useContext, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, MaterialIcons, Fontisto } from "@expo/vector-icons";

import Home from "./Home";
import Courses from "./Courses";
import Profile from "./Profile";
import { AuthContext, TeacherDataContext } from "../../data/context";
import { teacherActions } from "../../data/reducers/TeacherDataReducer";
import axios from "../../axios/axios";
import Loader from "../../components/Loader";
import { View } from "react-native";

const Tabs = createBottomTabNavigator();

const TeacherNav = () => {
	const { teacherDataDispatch } = useContext(TeacherDataContext);
	const { authState } = useContext(AuthContext);
	const [appReady, setAppReady] = useState(false);

	useEffect(() => {
		async function getData() {
			try {
				const courses = await axios.get(
					`/v1/instructors/${authState?.auth?.user?._id}/courses`
				);

				teacherDataDispatch({
					type: teacherActions.RESTORE,
					courses: courses.data,
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
				tabBarActiveTintColor: "#009387",
				headerShown: false,
				tabBarStyle: [
					{
						display: "flex",
					},
					null,
				],
				tabBarHideOnKeyboard: true,
			}}
		>
			<Tabs.Screen
				name="TeacherHome"
				component={Home}
				options={{
					title: "Home",
					tabBarIcon: ({ color, size }) => (
						<FontAwesome name="home" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="TeacherCourses"
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
				name="TeacherProfile"
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

export default TeacherNav;
