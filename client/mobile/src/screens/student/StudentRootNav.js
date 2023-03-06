import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StudentMainNav from "./StudentMainNav";
import CourseDetails from "./CourseDetails";
import GetStarted from "./GetStarted";

const Stack = createNativeStackNavigator();

const StudentRootNav = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Tabs" component={StudentMainNav} />
			<Stack.Screen name="CourseDetails" component={CourseDetails} />
			<Stack.Screen name="GetStarted" component={GetStarted} />
		</Stack.Navigator>
	);
};

export default StudentRootNav;
