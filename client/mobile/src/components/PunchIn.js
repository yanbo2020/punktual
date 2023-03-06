import React, { useContext, useEffect, useRef, useState } from "react";
import { Overlay } from "@rneui/themed";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import * as FaceDetector from "expo-face-detector";
import { AuthContext } from "../data/context";
import axios from "../axios/axios";
import Loader from "./Loader";
import mime from "mime";

const PunchIn = ({ visible, toggleOverlay, course, updateRecords }) => {
	const { authState } = useContext(AuthContext);
	const [hasPermission, setHasPermission] = useState(null);
	const [type, setType] = useState(CameraType.front);
	const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
	const [loading, setLoading] = useState(false);
	const cameraRef = useRef(null);

	const student = authState?.auth?.user;

	const reset = () => {
		setType(CameraType.front);
		setFlash(Camera.Constants.FlashMode.off);
	};

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

	const handleFacesDetected = ({ faces }) => {
		if (faces.length > 0) {
			handleTakePicture()
				.then(() => {
					reset();
					toggleOverlay();
				})
				.catch((err) => Alert.alert("Error", err.message));
		}
	};

	const handleTakePicture = async () => {
		if (cameraRef.current && !loading) {
			const data = await cameraRef.current.takePictureAsync(null);

			const formData = new FormData();
			formData.append("image", {
				uri: data.uri,
				type: mime.getType(data.uri),
				name: data.uri.split("/").pop(),
			});
			setLoading(true);
			try {
				const response = await axios.patch(
					`/v1/student-courses/students/${student?._id}/courses/${course?._id}/punch-in`,
					formData,
					{
						headers: {
							"content-type": "multipart/form-data",
						},
					}
				);
				Alert.alert("Success", "Punch in successful");
				updateRecords(response.data);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				Alert.alert(
					"Verification failed",
					error?.response?.data?.error
				);
			}
		}
	};

	return (
		<Overlay
			overlayStyle={{
				width: "100%",
				height: "95%",
				borderRadius: 10,
			}}
			isVisible={visible}
		>
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.headerIcons}>
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
								name={flash ? "flash-sharp" : "flash-off-sharp"}
								size={25}
								color="black"
							/>
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						style={styles.closeButton}
						onPress={toggleOverlay}
					>
						<AntDesign name="close" size={24} color="red" />
					</TouchableOpacity>
				</View>
				{loading ? (
					<Loader visible={true} />
				) : (
					<Camera
						ref={cameraRef}
						style={styles.body}
						type={type}
						onFacesDetected={handleFacesDetected}
						faceDetectorSettings={{
							mode: FaceDetector.FaceDetectorMode.fast,
							detectLandmarks:
								FaceDetector.FaceDetectorLandmarks.none,
							runClassifications:
								FaceDetector.FaceDetectorClassifications.none,
							minDetectionInterval: 1000,
							tracking: true,
						}}
					/>
				)}
			</View>
		</Overlay>
	);
};

export default PunchIn;

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
});
