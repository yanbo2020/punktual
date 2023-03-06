import { StyleSheet, Text, View } from "react-native";
import React from "react";

const NoData = ({ text }) => {
	return (
		<View style={styles.noRecords}>
			<Text style={styles.noRecordsText}>
				{text || "No records found"}
			</Text>
		</View>
	);
};

export default NoData;

const styles = StyleSheet.create({
	noRecords: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	noRecordsText: {
		fontSize: 16,
		fontWeight: "600",
	},
});
