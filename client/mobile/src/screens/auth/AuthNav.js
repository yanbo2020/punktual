import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./SignIn";

const Stack = createNativeStackNavigator();

const AuthNav = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="SignIn" component={SignIn} />
		</Stack.Navigator>
	);
};

export default AuthNav;
