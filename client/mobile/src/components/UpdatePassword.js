import {
	Alert,
	Keyboard,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Input from "./Input";
import Button from "./Button";
import Loader from "./Loader";
import axios from "../axios/axios";
import COLORS from "../constants/colors";

const UpdatePassword = ({ show, toggleShow, url }) => {
	const [values, setValues] = useState({
		oldPass: "",
		password: "",
		confirmPassword: "",
		error: null,
		loading: false,
	});
	const [errors, setErrors] = useState({});

	const handleOnchange = (text, name) => {
		setValues((prevState) => ({ ...prevState, [name]: text }));
	};

	const handleError = (error, input) => {
		setErrors((prevState) => ({ ...prevState, [input]: error }));
	};

	const validate = () => {
		setValues((prevState) => ({ ...prevState, error: null }));
		Keyboard.dismiss();
		let isValid = true;
		if (!values.oldPass) {
			handleError("Old Password is required", "oldPass");
			isValid = false;
		}
		if (!values.password) {
			handleError("Password is required", "password");
			isValid = false;
		}
		if (!values.confirmPassword) {
			handleError("Password confirmation is required", "confirmPassword");
			isValid = false;
		}
		if (values.password !== values.confirmPassword) {
			handleError("Passwords do not match", "confirmPassword");
			isValid = false;
		}
		if (isValid) {
			handleUpdate();
		}
	};

	const handleUpdate = () => {
		const data = {
			oldPass: values.oldPass,
			password: values.password,
		};
		setValues((prevState) => ({ ...prevState, loading: true }));
		axios
			.put(url, data)
			.then((response) => {
				setValues((prevState) => ({ ...prevState, loading: false }));
				toggleShow();
			})
			.catch((err) => {
				setValues((prevState) => ({
					...prevState,
					loading: false,
					error: err?.response?.data?.error,
				}));
			});
	};
	return (
		<Modal
			transparent
			animationType="slide"
			visible={show}
			onRequestClose={toggleShow}
		>
			<Loader visible={values.loading} />
			<View style={styles.container}>
				<View style={styles.top}>
					<Text></Text>
					<Text style={styles.title}>Update Password</Text>
					<TouchableOpacity onPress={toggleShow}>
						<Ionicons
							name="ios-close-circle"
							size={24}
							color="white"
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.body}>
					<Input
						onChangeText={(text) => handleOnchange(text, "oldPass")}
						onFocus={() => handleError(null, "oldPass")}
						iconName="lock"
						label="Old Password"
						error={errors.oldPass}
						password
					/>
					<Input
						onChangeText={(text) =>
							handleOnchange(text, "password")
						}
						onFocus={() => handleError(null, "password")}
						iconName="lock"
						label="New Password"
						error={errors.password}
						password
					/>
					<Input
						onChangeText={(text) =>
							handleOnchange(text, "confirmPassword")
						}
						onFocus={() => handleError(null, "confirmPassword")}
						iconName="lock"
						label="Confirm Password"
						error={errors.confirmPassword}
						password
					/>
					{values.error && (
						<View>
							<Text style={{ color: COLORS.red }}>
								{values.error}
							</Text>
						</View>
					)}
					<Button title="Update" onPress={validate} />
				</View>
			</View>
		</Modal>
	);
};

export default UpdatePassword;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 40,
		backgroundColor: "#B7C8D7",
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
	},
	top: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 10,
		paddingHorizontal: 8,
	},
	title: {
		fontSize: 16,
		fontWeight: "500",
	},
	body: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: 15,
		paddingVertical: 10,
	},
});
