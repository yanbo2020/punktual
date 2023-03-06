import {
	StyleSheet,
	Text,
	View,
	Image,
	KeyboardAvoidingView,
	ScrollView,
	Keyboard,
	Platform,
} from "react-native";
import React, { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from "@rneui/themed";
import logo from "../../../assets/logo-circ.png";

import axios from "../../axios/axios";
import AuthContext from "../../data/context/AuthContext";
import { AUTH_ACTIONS } from "../../data/reducers/AuthReducer";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import COLORS from "../../constants/colors";

const SignIn = () => {
	const { authDispatch } = useContext(AuthContext);
	const [values, setValues] = useState({
		email: "",
		password: "",
		error: "",
		loading: false,
	});

	const [errors, setErrors] = useState({});

	const handleOnchange = (text, input) => {
		setValues((prevState) => ({ ...prevState, [input]: text }));
	};

	const handleError = (error, input) => {
		setErrors((prevState) => ({ ...prevState, [input]: error }));
	};

	const validate = async () => {
		setValues((prevState) => ({ ...prevState, error: "" }));
		Keyboard.dismiss();
		let isValid = true;
		if (!values.email) {
			handleError("Student ID or Email is required", "email");
			isValid = false;
		}
		if (!values.password) {
			handleError("Password is required", "password");
			isValid = false;
		}
		if (isValid) {
			handleSignIn();
		}
	};

	const handleSignIn = () => {
		const data = {
			email: values.email,
			password: values.password,
		};
		setValues({ ...values, error: "", loading: true });
		axios
			.post("/v1/auth/login", data)
			.then((res) => {
				AsyncStorage.setItem("auth", JSON.stringify(res.data)).then(
					() => {
						setValues({ ...values, error: "", loading: false });
						authDispatch({
							type: AUTH_ACTIONS.SIGNIN,
							auth: res.data,
						});
					}
				);
			})
			.catch((err) => {
				setValues({ ...values, error: err.response.data });
			});
	};

	return (
		<View style={styles.container}>
			<Loader visible={values.loading} />
			<View style={styles.topView}>
				<Image style={styles.imageStyle} source={logo} />
			</View>
			<KeyboardAvoidingView
				enabled
				behavior={Platform.OS === "ios" ? "padding" : null}
				keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -500}
				showsVerticalScrollIndicator={false}
				style={styles.bottomView}
			>
				<Card containerStyle={styles.card}>
					<ScrollView
						vertical
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
					>
						<Text style={styles.heading}>Sign In</Text>
						<View style={styles.formView}>
							<Input
								onChangeText={(text) =>
									handleOnchange(text, "email")
								}
								onFocus={() => handleError(null, "email")}
								iconName="email"
								label="Student ID or Email"
								placeholder="Enter your Student ID or Email"
								error={errors.email}
							/>
							<Input
								onChangeText={(text) =>
									handleOnchange(text, "password")
								}
								onFocus={() => handleError(null, "password")}
								iconName="lock"
								label="Password"
								placeholder="Enter your password"
								error={errors.password}
								password
							/>
							{values.error && (
								<View>
									<Text style={{ color: COLORS.red }}>
										{values.error.error}
									</Text>
								</View>
							)}
							<Button title="Log In" onPress={validate} />
						</View>
					</ScrollView>
				</Card>
			</KeyboardAvoidingView>
		</View>
	);
};

export default SignIn;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: COLORS.blue,
		alignItems: "center",
		justifyContent: "center",
	},
	topView: {
		width: "100%",
		height: "30%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	imageStyle: {
		width: 100,
		height: 100,
		padding: 10,
		resizeMode: "contain",
		borderWidth: 1,
		borderColor: COLORS.blue,
		borderRadius: 100,
	},
	bottomView: {
		width: "98%",
		height: "70%",
		borderRadius: 15,
		marginBottom: 10,
	},
	card: {
		borderRadius: 4,
	},
	heading: {
		color: COLORS.blue,
		fontSize: 30,
		fontWeight: "bold",
		marginTop: 16,
	},
	formView: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		marginTop: 15,
	},
});
