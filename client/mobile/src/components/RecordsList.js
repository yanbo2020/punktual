import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Divider } from "@rneui/base";
import { AntDesign } from "@expo/vector-icons";
import { format } from "date-fns";
import COLORS from "../constants/colors";

const RecordsList = ({ records }) => {
	return (
		<ScrollView>
			{records?.map((record) => (
				<View key={record?._id}>
					<View style={styles.recordItem}>
						<Text style={styles.recordDate}>
							{record?.date &&
								format(new Date(record?.date), "dd MMM")}
						</Text>
						<AntDesign
							name={
								record?.status === "Present"
									? "checkcircle"
									: "closecircle"
							}
							size={18}
							color={
								record?.status === "Present"
									? COLORS.green
									: COLORS.red
							}
						/>
					</View>
					<Divider />
				</View>
			))}
		</ScrollView>
	);
};

export default RecordsList;

const styles = StyleSheet.create({
	recordItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 10,
	},
	recordDate: {
		fontSize: 16,
		fontWeight: "600",
	},
});
