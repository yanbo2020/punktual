import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useContext, useState } from "react";
import NotificationsListItem from "../../components/NotificationsListItem";
import NotificationOverlay from "../../components/NotificationOverlay";
import { StudentDataContext } from "../../data/context";

const Notifications = () => {
	const { studentDataState } = useContext(StudentDataContext);
	const notifications = studentDataState?.notifications;

	const [showNotification, setShowNotification] = useState(false);
	const [notification, setNotification] = useState({});

	const toggleNotification = () => {
		setShowNotification(!showNotification);
	};

	const onNotificationPress = (notification) => {
		setNotification(notification);
		setShowNotification(true);
	};

	return (
		<View style={styles.contailer}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Notifications</Text>
			</View>
			<View style={styles.body}>
				<ScrollView showsVerticalScrollIndicator={false}>
					{notifications?.map((notification) => (
						<TouchableOpacity
							onPress={() => onNotificationPress(notification)}
							key={notification?._id}
						>
							<NotificationsListItem
								notification={notification}
							/>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>
			<NotificationOverlay
				visible={showNotification}
				toggleOverlay={toggleNotification}
				notification={notification}
			/>
		</View>
	);
};

export default Notifications;

const styles = StyleSheet.create({
	contailer: {
		flex: 1,
		backgroundColor: "#1C4652",
	},
	header: {
		height: "15%",
		backgroundColor: "#1C4652",
		alignItems: "center",
		justifyContent: "center",
	},
	headerText: {
		fontSize: 18,
		color: "#fff",
		marginTop: 30,
	},
	body: {
		height: "85%",
		backgroundColor: "#fff",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
});
