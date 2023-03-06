import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns";

import AuthContext from "../../data/context/AuthContext";
import DefaultProfile from "../../../assets/images/profile-default.png";
import { Divider } from "@rneui/base";
import { TeacherDataContext } from "../../data/context";
import UpdatePassword from "../../components/UpdatePassword";

const Profile = () => {
	const today = format(new Date(), "EEEE");
	const [showUpdatePassword, setShowUpdatePassword] = useState(false);
	const { authState, authDispatch } = useContext(AuthContext);
	const { teacherDataState } = useContext(TeacherDataContext);

	const courses = teacherDataState?.courses;

	const user = authState?.auth?.user;
	const UPDATE_URL = `/v1/instructors/${user?._id}/password`;

	const todayCourses = courses?.filter((course) => {
		return course?.time?.day === today;
	});

	const toggleUpdatePassword = () => {
		setShowUpdatePassword(!showUpdatePassword);
	};

	const handleSignOut = () => {
		AsyncStorage.removeItem("auth").then(() => {
			authDispatch({ type: "SIGNOUT" });
		});
	};

	return (
		<View style={styles.container}>
			<View style={styles.topSection}>
				<View style={styles.userInfoSection}>
					<View style={{ flexDirection: "row", marginTop: 15 }}>
						<Image source={DefaultProfile} style={styles.image} />
						<View style={{ marginLeft: 20 }}>
							<Text
								style={[
									styles.title,
									{
										marginTop: 15,
										marginBottom: 10,
									},
								]}
							>
								{user?.firstName} {user?.lastName}
							</Text>
							<Text style={styles.caption}>{user?.idNumber}</Text>
						</View>
					</View>
					<View style={styles.userDetails}>
						<View style={styles.row}>
							<Icon name="phone" color="#fff" size={20} />
							<Text style={{ color: "#fff", marginLeft: 20 }}>
								+86 19816986574
							</Text>
						</View>
						<View style={styles.row}>
							<Icon name="email" color="#fff" size={20} />
							<Text style={{ color: "#fff", marginLeft: 20 }}>
								{user?.email}
							</Text>
						</View>
					</View>
				</View>
			</View>

			<View style={styles.bottomSection}>
				<View style={styles.infoBoxWrapper}>
					<View
						style={[
							styles.infoBox,
							{
								borderRightColor: "#dddddd",
								borderRightWidth: 1,
							},
						]}
					>
						<Text style={styles.numText}>
							{courses?.length || 0}
						</Text>
						<Text>Total Classes</Text>
					</View>
					<View style={styles.infoBox}>
						<Text style={styles.numText}>
							{todayCourses?.length || 0}
						</Text>
						<Text>Classes Today</Text>
					</View>
				</View>

				<View style={styles.menuWrapper}>
					<TouchableOpacity onPress={toggleUpdatePassword}>
						<View style={styles.menuItem}>
							<Ionicons
								name="lock-closed-outline"
								size={25}
								color="#f58084"
							/>
							<Text style={styles.menuItemText}>
								Update Password
							</Text>
						</View>
					</TouchableOpacity>
					<Divider inset={true} />
					<TouchableOpacity onPress={handleSignOut}>
						<View style={styles.menuItem}>
							<MaterialIcons
								name="logout"
								size={25}
								color="#f58084"
							/>

							<Text style={styles.menuItemText}>Log Out</Text>
						</View>
					</TouchableOpacity>
					<Divider />
				</View>
			</View>
			<UpdatePassword
				show={showUpdatePassword}
				toggleShow={toggleUpdatePassword}
				url={UPDATE_URL}
			/>
		</View>
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1C4652",
	},
	topSection: {
		height: "40%",
		backgroundColor: "#1C4652",
	},
	userInfoSection: {
		paddingHorizontal: 30,
		marginBottom: 25,
		marginTop: 20,
	},
	userDetails: {
		marginTop: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#fff",
	},
	image: {
		width: 90,
		height: 90,
		borderRadius: 10,
	},
	caption: {
		fontSize: 14,
		lineHeight: 14,
		fontWeight: "600",
		color: "#fff",
	},
	row: {
		flexDirection: "row",
		marginBottom: 10,
	},
	bottomSection: {
		height: "60%",
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		backgroundColor: "#fff",
	},
	infoBoxWrapper: {
		borderBottomColor: "#dddddd",
		borderBottomWidth: 1,
		flexDirection: "row",
		height: 100,
	},
	infoBox: {
		width: "50%",
		alignItems: "center",
		justifyContent: "center",
	},
	numText: {
		fontSize: 20,
		fontWeight: "600",
	},
	menuWrapper: {
		marginTop: 10,
	},
	menuItem: {
		flexDirection: "row",
		paddingVertical: 15,
		paddingHorizontal: 30,
	},
	menuItemText: {
		color: "#777777",
		marginLeft: 20,
		fontWeight: "600",
		fontSize: 16,
		lineHeight: 26,
	},
});
