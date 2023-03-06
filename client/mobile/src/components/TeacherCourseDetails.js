import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Overlay, Card } from "@rneui/themed";
import {
	Fontisto,
	MaterialCommunityIcons,
	MaterialIcons,
	SimpleLineIcons,
} from "@expo/vector-icons";
import COLORS from "../constants/colors";

const TeacherCourseDetails = ({ show, toggleShow, course, students }) => {
	return (
		<Overlay
			overlayStyle={styles.overlay}
			isVisible={show}
			onBackdropPress={toggleShow}
		>
			<Card containerStyle={styles.card}>
				<Card.Title style={styles.cardTitle}>{course.name}</Card.Title>
				<View>
					<View style={styles.row}>
						<Fontisto
							name="person"
							size={24}
							color={COLORS.blue}
							style={{ marginRight: 10 }}
						/>
						<Text>{`${course?.instructor.firstName} ${course?.instructor.lastName}`}</Text>
					</View>
					<View style={styles.row}>
						<MaterialCommunityIcons
							name="calendar-month-outline"
							color={COLORS.blue}
							size={24}
							style={{ marginRight: 10 }}
						/>
						<Text>{`${course?.period.semester} (${course?.period.year})`}</Text>
					</View>
					<View style={styles.row}>
						<MaterialCommunityIcons
							name="clock-time-eight"
							color={COLORS.blue}
							size={24}
							style={{ marginRight: 10 }}
						/>
						<Text>
							{`${course?.time.day} (${course?.time.startTime} - ${course?.time.endTime})`}
						</Text>
					</View>
					<View style={styles.row}>
						<MaterialIcons
							name="location-on"
							color={COLORS.blue}
							size={24}
							style={{ marginRight: 10 }}
						/>
						<Text>
							{`${course?.location.building.buildingNumber} - ${course?.location.room}`}
						</Text>
					</View>
					<View style={styles.row}>
						<SimpleLineIcons
							name="people"
							size={24}
							color={COLORS.blue}
							style={{ marginRight: 10 }}
						/>
						<Text>{`${students?.length} Enrolled Student(s)`}</Text>
					</View>
				</View>
			</Card>
		</Overlay>
	);
};

export default TeacherCourseDetails;

const styles = StyleSheet.create({
	overlay: {
		width: "90%",
		borderRadius: 8,
		padding: 0,
	},
	card: {
		borderRadius: 8,
		margin: 0,
	},
	cardTitle: {
		alignSelf: "flex-start",
		fontSize: 18,
	},
	row: {
		flexDirection: "row",
		marginBottom: 20,
		alignItems: "center",
	},
	textRight: {
		alignSelf: "flex-start",
		color: "black",
	},
});
