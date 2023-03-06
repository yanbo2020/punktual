import React, { useContext, useEffect, useRef, useState } from "react";
import { Overlay } from "@rneui/themed";
import { StyleSheet, View, TouchableOpacity, Alert, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
import {
	AntDesign,
	MaterialIcons,
	Ionicons,
	MaterialCommunityIcons,
	Entypo,
} from "@expo/vector-icons";
import mime from "mime";
import { AuthContext } from "../data/context";
import axios from "../axios/axios";
import Loader from "./Loader";
import { AUTH_ACTIONS } from "../data/reducers/AuthReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TakePhoto = ({ visible, toggleOverlay }) => {
	const { authState, authDispatch } = useContext(AuthContext);
	const [hasPermission, setHasPermission] = useState(null);
	const [type, setType] = useState(CameraType.front);
	const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
	const [loading, setLoading] = useState(false);
	const cameraRef = useRef(null);
	const [imageUri, setImageUri] = useState(null);
	const [showPreview, setShowPreview] = useState(false);

	const auth = authState?.auth;

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	if (hasPermission === false) {
		return Alert.alert("Error", "Camera permission is required");
	}

	const toggleCamera = () => {
		setType(type === CameraType.back ? CameraType.front : CameraType.back);
	};

	const toggleFlash = () => {
		setFlash(
			flash === Camera.Constants.FlashMode.off
				? Camera.Constants.FlashMode.on
				: Camera.Constants.FlashMode.off
		);
	};

	const togglePreview = () => {
		setShowPreview(!showPreview);
	};
	const reset = () => {
		setType(CameraType.front);
		setFlash(Camera.Constants.FlashMode.off);
		setImageUri(null);
		setShowPreview(false);
	};

	const takePicture = async () => {
		if (cameraRef.current) {
			const data = await cameraRef.current.takePictureAsync(null);
			setImageUri(data.uri);
			togglePreview();
		}
	};

	const handleUpload = async () => {
		const formData = new FormData();
		formData.append("image", {
			uri: imageUri,
			type: mime.getType(imageUri),
			name: imageUri.split("/").pop(),
		});
		setLoading(true);
		try {
			const response = await axios.put(
				`/v1/students/${auth?.user?._id}/photo`,
				formData,
				{
					headers: {
						"content-type": "multipart/form-data",
					},
				}
			);

			auth.user = response.data;
			AsyncStorage.setItem("auth", JSON.stringify(auth)).then(() => {
				authDispatch({
					type: AUTH_ACTIONS.UPDATEPROFILE,
					user: response.data,
				});
			});
			setLoading(false);
			reset();
			toggleOverlay();
		} catch (error) {
			setLoading(false);
			Alert.alert("Error", error.message);
		}
	};

	const PhotoPreview = () => {
		return (
			<View style={styles.preview}>
				<Image
					source={{ uri: imageUri }}
					style={{ width: "100%", height: "100%" }}
				/>
			</View>
		);
	};

	return (
		<Overlay
			overlayStyle={{ width: "95%", height: "95%", borderRadius: 10 }}
			isVisible={visible}
		>
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.headerIcons}>
						{showPreview ? (
							<TouchableOpacity onPress={togglePreview}>
								<MaterialCommunityIcons
									name="camera-retake"
									size={25}
									color="black"
								/>
							</TouchableOpacity>
						) : (
							<>
								<TouchableOpacity
									style={styles.flipButton}
									onPress={toggleCamera}
								>
									<MaterialIcons
										name="flip-camera-ios"
										size={25}
										color="black"
									/>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.flashButton}
									onPress={toggleFlash}
								>
									<Ionicons
										name={
											flash
												? "flash-sharp"
												: "flash-off-sharp"
										}
										size={25}
										color="black"
									/>
								</TouchableOpacity>
							</>
						)}
					</View>
					{showPreview ? (
						<TouchableOpacity
							style={styles.closeButton}
							onPress={handleUpload}
						>
							<Entypo
								name="upload-to-cloud"
								size={25}
								color="black"
							/>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							style={styles.closeButton}
							onPress={toggleOverlay}
						>
							<AntDesign name="close" size={25} color="red" />
						</TouchableOpacity>
					)}
				</View>
				<Loader visible={loading} />
				{showPreview ? (
					<PhotoPreview />
				) : (
					<Camera ref={cameraRef} style={styles.body} type={type}>
						<View style={styles.captureButtonContainer}>
							<TouchableOpacity
								onPress={takePicture}
								style={styles.captureButton}
							></TouchableOpacity>
						</View>
					</Camera>
				)}
			</View>
		</Overlay>
	);
};

export default TakePhoto;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		width: "100%",
		height: 35,
		justifyContent: "space-between",
		marginBottom: 10,
		flexDirection: "row",
	},
	headerIcons: {
		flexDirection: "row",
		alignItems: "center",
	},
	closeButton: {
		alignSelf: "flex-end",
		marginRight: 10,
	},
	closeButtonText: {
		fontSize: 15,
		color: "#1C4652",
		fontWeight: "600",
	},
	body: {
		flex: 1,
		height: "100%",
	},
	flipButton: {
		marginLeft: 10,
	},
	flashButton: {
		marginLeft: 20,
	},
	captureButtonContainer: {
		alignSelf: "center",
		padding: 10,
		position: "absolute",
		bottom: 10,
		width: 60,
		height: 60,
		borderRadius: 30,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	captureButton: {
		backgroundColor: "white",
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	preview: {
		flex: 1,
	},
});
