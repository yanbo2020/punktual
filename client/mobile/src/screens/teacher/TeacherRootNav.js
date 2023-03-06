import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CourseAttendance from "./CourseAttendance";
import CourseInfo from "./CourseInfo";
import TeacherNav from "./TeacherMainNav";

const Stack = createNativeStackNavigator();

const TeacherRootNav = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Tabs" component={TeacherNav} />
			<Stack.Screen name="CourseInfo" component={CourseInfo} />
			<Stack.Screen name="Attendance" component={CourseAttendance} />
		</Stack.Navigator>
	);
};

export default TeacherRootNav;
