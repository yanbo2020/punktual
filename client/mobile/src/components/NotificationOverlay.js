import { Overlay, Card } from "@rneui/themed";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { formatTime } from "../utils/utils";

const NotificationOverlay = ({ visible, toggleOverlay, notification }) => {
	return (
		<Overlay
			overlayStyle={{ width: "80%", borderRadius: 10, padding: 0 }}
			isVisible={visible}
		>
			<Card containerStyle={{ margin: 0, borderRadius: 10 }}>
				<View style={styles.header}>
					<Text style={styles.title}>{notification.title}</Text>
					<FontAwesome
						name="close"
						size={24}
						color="red"
						onPress={toggleOverlay}
					/>
				</View>

				<View style={styles.bodySection}>
					<Text style={styles.body}>{notification.text}</Text>
					<Text style={styles.date}>
						{notification?.createdAt &&
							formatTime(notification.createdAt, false)}
					</Text>
				</View>
			</Card>
		</Overlay>
	);
};

export default NotificationOverlay;

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 4,
	},
	bodySection: {
		marginVertical: 10,
		borderColor: "#ccc",
		borderWidth: 1,
		padding: 8,
		borderRadius: 5,
	},
	body: {
		fontSize: 13,
	},
	divider: {
		marginVertical: 10,
	},
	date: {
		marginTop: 8,
		fontSize: 12,
		color: "#999",
	},
});
