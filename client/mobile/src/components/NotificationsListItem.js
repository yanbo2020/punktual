import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card } from "@rneui/themed";
import { formatTime } from "../utils/utils";

const NotificationsListItem = ({ notification }) => {
	return (
		<Card containerStyle={styles.card}>
			<Text style={styles.infoTitle}>{notification.title}</Text>
			<View style={styles.infoRow}>
				<Text style={styles.infoBody}>
					{notification?.text?.slice(0, 30)}...
				</Text>

				<Text
					style={[
						styles.infoTime,
						{
							// color: notification.isRead ? "#999" : "red",
							color: "#999",
						},
					]}
				>
					{notification?.createdAt &&
						formatTime(notification?.createdAt, true)}{" "}
					ago
				</Text>
			</View>
		</Card>
	);
};

export default NotificationsListItem;

const styles = StyleSheet.create({
	card: {
		borderRadius: 10,
		marginVertical: 5,
	},
	infoTitle: {
		fontSize: 14,
		fontWeight: "bold",
	},
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 4,
	},
	infoBody: {
		fontSize: 13,
	},
	infoTime: {
		fontSize: 12,
		color: "#999",
		fontStyle: "italic",
	},
});
