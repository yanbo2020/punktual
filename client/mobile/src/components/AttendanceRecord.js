import React from "react";
import { Overlay } from "@rneui/themed";
import {
	Text,
	StyleSheet,
	TouchableOpacity,
	View,
	ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Divider } from "@rneui/base";
import { format } from "date-fns";
import COLORS from "../constants/colors";

const AttendanceRecord = ({ visible, toggleOverlay, records }) => {
	const getRate = () => {
		const present = records?.filter(
			(record) => record?.status === "Present"
		)?.length;
		const total = records?.length;
		const rate = (present / total) * 100;
		return records?.length === 0 ? "None" : `${rate}%`;
	};

	let content;

	const NoRecords = () => {
		return (
			<View style={styles.noRecords}>
				<Text style={styles.noRecordsText}>
					No records found for this course.
				</Text>
			</View>
		);
	};

	const RecordsList = () => {
		return (
			<ScrollView>
				{records.map((record) => (
					<View key={record?._id}>
						<View style={styles.recordItem}>
							<Text style={styles.recordDate}>
								{format(new Date(record?.date), "dd MMM")}
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

	content = records?.length === 0 ? <NoRecords /> : <RecordsList />;

	return (
		<Overlay
			overlayStyle={styles.container}
			isVisible={visible}
			onBackdropPress={toggleOverlay}
		>
			<View style={styles.header}>
				<Text style={[styles.headerText, { color: "white" }]}>
					Attendance Rate: {getRate()}
				</Text>
				<TouchableOpacity
					style={styles.closeButton}
					onPress={toggleOverlay}
				>
					<AntDesign name="close" size={24} color="white" />
				</TouchableOpacity>
			</View>
			<View style={styles.body}>{content}</View>
		</Overlay>
	);
};

export default AttendanceRecord;

const styles = StyleSheet.create({
	container: {
		width: "95%",
		height: "90%",
		borderRadius: 10,
		padding: 0,
		backgroundColor: COLORS.blue,
	},
	header: {
		width: "100%",
		height: 50,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		backgroundColor: COLORS.blue,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		paddingHorizontal: 10,
	},
	headerText: {
		fontSize: 16,
		fontWeight: "700",
		color: "white",
	},
	body: {
		flex: 1,
		backgroundColor: COLORS.white,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
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
