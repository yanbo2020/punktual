import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { Button, Card, Header as HeaderRNE } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
	Ionicons,
	FontAwesome5,
	Fontisto,
	MaterialCommunityIcons,
	MaterialIcons,
} from "@expo/vector-icons";
import { format } from "date-fns";
import * as Location from "expo-location";
import COLORS from "../../constants/colors";
import { AuthContext, StudentDataContext } from "../../data/context";
import axios from "../../axios/axios";
import { studentActions } from "../../data/reducers/StudentDataReducer";
import Loader from "../../components/Loader";
import AttendanceRecord from "../../components/AttendanceRecord";
import PunchIn from "../../components/PunchIn";
import { calculateDistance } from "../../utils/utils";

const isEnrolled = (enrolled, course) => {
	return enrolled?.some((item) => item._id === course._id);
};

const CourseDetails = ({ route, navigation }) => {
	const today = format(new Date(), "yyyy-MM-dd");
	const [loading, setLoading] = useState(false);
	const [showRecord, setShowRecord] = useState(false);
	const [punchIn, setPunchIn] = useState(false);
	const [attendanceRecords, setAttendanceRecords] = useState([]);
	const { studentDataState, studentDataDispatch } =
		useContext(StudentDataContext);
	const { authState } = useContext(AuthContext);

	const enrolledCourses = studentDataState?.enrolledCourses;
	const student = authState?.auth?.user;
	const course = route.params.course;

	const isEnrolledCourse = isEnrolled(enrolledCourses, course);

	const isPunchedIn = () => {
		const record = attendanceRecords?.find((item) => item.date === today);
		return record?.status === "Present";
	};

	const isAbsent = () => {
		const record = attendanceRecords?.find((item) => item.date === today);
		return record?.status === "Absent";
	};

	useEffect(() => {
		Location.requestForegroundPermissionsAsync()
			.then((status) => {
				if (!status.granted) {
					Alert.alert(
						"Location Permission",
						"Location permission is required to use this app"
					);
				}
			})
			.catch((err) => {
				Alert.alert(
					"Error",
					`Something went wrong while requesting for location permission ${err}`
				);
			});

		if (isEnrolledCourse) {
			getAttendanceRecords();
		}
	}, [isEnrolledCourse, course]);

	const toggleShowRecord = () => {
		setShowRecord(!showRecord);
	};

	const togglePunchIn = () => {
		setPunchIn(!punchIn);
	};

	const handlePress = async () => {
		const location = await Location.getCurrentPositionAsync({});
		const { lat, lng } = course.location.building.coordinates;
		const { latitude, longitude } = location.coords;

		const classLocation = {
			latitude: lat,
			longitude: lng,
		};

		const currentLocation = {
			latitude,
			longitude,
		};

		const distance = calculateDistance(classLocation, currentLocation);

		if (distance > 100) {
			Alert.alert(
				"Out of range",
				"You are not in the class location. Please try again"
			);
			return;
		}

		togglePunchIn();
	};

	const canPunchIn = () => {
		const today = new Date();
		const day = format(today, "EEEE");
		const time = today.getHours() * 60 + today.getMinutes();
		const start = course?.time?.startTime.split(":");
		const end = course?.time?.endTime.split(":");
		const startTime = parseInt(start[0]) * 60 + parseInt(start[1]);
		const endTime = parseInt(end[0]) * 60 + parseInt(end[1]);
		return (
			day === course?.time?.day && time >= startTime && time <= endTime
		);
	};

	const getAttendanceRecords = async () => {
		setLoading(true);
		try {
			const records = await axios.get(
				`/v1/student-courses/students/${student?._id}/courses/${course?._id}/attendance-records`
			);
			setLoading(false);
			setAttendanceRecords(records.data);
		} catch (err) {
			setLoading(false);
			Alert.alert(
				"Error",
				`Something went wrong ${err?.response?.data?.error}`
			);
		}
	};

	const handleEnroll = async () => {
		setLoading(true);
		try {
			await axios.post(`/v1/student-courses/student/${student?._id}`, {
				course: course._id,
			});
			studentDataDispatch({
				type: studentActions.ENROLL,
				course: course,
			});
		} catch (error) {
			Alert.alert(
				"Error",
				`Something went wrong ${error?.response?.data?.error}`
			);
		}
		setLoading(false);
	};

	const updateRecords = (studentCourse) => {
		const record = studentCourse.attendance.find(
			(item) => item.date === today
		);
		setAttendanceRecords((prev) => [...prev, record]);
	};

	const PunchInButton = () => {
		return (
			<Button
				icon={
					<FontAwesome5
						name="clipboard-list"
						size={18}
						color="white"
						style={{ marginRight: 5 }}
					/>
				}
				title={
					isPunchedIn()
						? "Punched In"
						: isAbsent()
						? "Marked Absent"
						: "Punch In"
				}
				color={COLORS.blue}
				onPress={handlePress}
				disabled={!canPunchIn() || isPunchedIn() || isAbsent()}
			/>
		);
	};

	return (
		<SafeAreaProvider style={{ backgroundColor: COLORS.blue }}>
			<Loader visible={loading} />
			<HeaderRNE
				containerStyle={styles.headerContainer}
				leftComponent={
					<TouchableOpacity
						onPress={() => {
							navigation.goBack();
						}}
					>
						<Ionicons
							name="ios-arrow-back-circle-sharp"
							size={28}
							color="white"
						/>
					</TouchableOpacity>
				}
				rightComponent={
					isEnrolledCourse && (
						<View style={styles.headerRight}>
							<TouchableOpacity onPress={toggleShowRecord}>
								<FontAwesome5
									name="clipboard-list"
									size={24}
									color="white"
								/>
							</TouchableOpacity>
						</View>
					)
				}
				centerComponent={{ text: "Details", style: styles.heading }}
			/>
			<View style={styles.body}>
				<Card containerStyle={styles.card}>
					<Card.Title style={styles.cardTitle}>
						{course.name}
					</Card.Title>
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
					</View>
					{isEnrolledCourse ? (
						<PunchInButton />
					) : (
						<Button
							icon={
								<MaterialIcons
									name="post-add"
									size={20}
									color="white"
									style={{ marginRight: 5 }}
								/>
							}
							title="Enroll"
							color={COLORS.blue}
							onPress={handleEnroll}
						/>
					)}
				</Card>
			</View>
			<AttendanceRecord
				visible={showRecord}
				toggleOverlay={toggleShowRecord}
				course={course}
				records={attendanceRecords}
			/>
			<PunchIn
				visible={punchIn}
				toggleOverlay={togglePunchIn}
				course={course}
				updateRecords={updateRecords}
			/>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.blue,
		width: "100%",
		paddingVertical: 10,
		borderBottomWidth: 0,
	},
	heading: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
	headerRight: {
		display: "flex",
		flexDirection: "row",
		marginTop: 5,
		marginRight: 8,
	},
	body: {
		flex: 1,
		backgroundColor: COLORS.white,
		borderTopEndRadius: 8,
		borderTopStartRadius: 8,
	},
	card: {},
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

export default CourseDetails;
