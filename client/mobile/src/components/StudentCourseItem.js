import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const StudentCourseItem = ({ course }) => {
	const navigation = useNavigation();
	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("CourseDetails", { course })}
			style={styles.cardBody}
		>
			<View>
				<Text style={styles.title}>{course?.name}</Text>

				<View style={styles.viewItem}>
					<Ionicons
						name="ios-time-outline"
						size={18}
						color="#1C4652"
					/>
					<Text
						style={styles.viewItemText}
					>{`${course?.time.day} (${course?.time.startTime} - ${course?.time.endTime})`}</Text>
				</View>
				<View style={styles.viewItem}>
					<EvilIcons name="location" size={20} color="#1C4652" />
					<Text style={styles.viewItemText}>
						{`${course?.location.building.buildingNumber} - ${course?.location.room}`}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default StudentCourseItem;

const styles = StyleSheet.create({
	cardBody: {
		flexDirection: "row",
		padding: 10,
		marginHorizontal: 20,
		borderRadius: 10,
		alignItems: "center",
		marginTop: 10,
		borderWidth: 1,
		borderColor: "#1C4652",
	},
	viewItem: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginTop: 5,
		marginHorizontal: 10,
	},
	viewItemText: {
		color: "#f58084",
		fontSize: 12,
		paddingHorizontal: 10,
	},
	title: {
		color: "#345c74",
		fontSize: 14,
		paddingHorizontal: 10,
		fontWeight: "bold",
	},
});
