import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import {
	MaterialCommunityIcons,
	MaterialIcons as Icon,
} from "@expo/vector-icons";
const Input = ({
	label,
	iconName,
	error,
	password,
	onFocus = () => {},
	...props
}) => {
	const [hidePassword, setHidePassword] = useState(password);
	const [isFocused, setIsFocused] = useState(false);
	return (
		<View style={{ marginBottom: 20 }}>
			<Text style={style.label}>{label}</Text>
			<View
				style={[
					style.inputContainer,
					{
						borderColor: error
							? COLORS.red
							: isFocused
							? COLORS.darkBlue
							: COLORS.light,
						alignItems: "center",
					},
				]}
			>
				<Icon
					name={iconName}
					style={{
						color: COLORS.darkBlue,
						fontSize: 22,
						marginRight: 10,
					}}
				/>
				<TextInput
					autoCorrect={false}
					onFocus={() => {
						onFocus();
						setIsFocused(true);
					}}
					onBlur={() => setIsFocused(false)}
					keyboardType={
						label === "Email"
							? "email-address"
							: label === "Phone Number"
							? "phone-pad"
							: "default"
					}
					secureTextEntry={hidePassword}
					style={{ color: COLORS.darkBlue, flex: 1 }}
					{...props}
				/>
				{password && (
					<MaterialCommunityIcons
						onPress={() => setHidePassword(!hidePassword)}
						name={hidePassword ? "eye-outline" : "eye-off-outline"}
						style={{ color: COLORS.darkBlue, fontSize: 22 }}
					/>
				)}
			</View>
			{error && (
				<Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12 }}>
					{error}
				</Text>
			)}
		</View>
	);
};

const style = StyleSheet.create({
	label: {
		marginVertical: 5,
		fontSize: 14,
		color: COLORS.grey,
	},
	inputContainer: {
		height: 55,
		backgroundColor: COLORS.light,
		flexDirection: "row",
		paddingHorizontal: 15,
		borderWidth: 0.5,
		borderRadius: 4,
	},
});

export default Input;
