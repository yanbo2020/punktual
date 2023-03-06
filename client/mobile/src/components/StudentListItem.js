import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card } from "@rneui/themed";
import COLORS from "../constants/colors";

const StudentListItem = ({ student }) => {
	return (
		<Card containerStyle={styles.card}>
			<View style={styles.infoRow}>
				<Text
					style={styles.infoTitle}
				>{`${student?.firstName} ${student?.lastName}`}</Text>

				<Text style={styles.infoId}>{student?.idNumber}</Text>
			</View>
		</Card>
	);
};

export default StudentListItem;

const styles = StyleSheet.create({
	card: {
		borderRadius: 4,
		marginVertical: 5,
		borderWidth: 0.5,
		borderColor: COLORS.blue,
	},
	infoTitle: {
		fontSize: 14,
		fontWeight: "bold",
	},
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	infoId: {
		fontSize: 13,
	},
});
