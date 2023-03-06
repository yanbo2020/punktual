import React, { useContext, useState } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Header as HeaderRNE } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5, Entypo } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { useEffect } from "react";
import { AuthContext } from "../../data/context";
import axios from "../../axios/axios";
import Loader from "../../components/Loader";
import StudentListItem from "../../components/StudentListItem";
import TeacherCourseDetails from "../../components/TeacherCourseDetails";
import TeacherStudentRecords from "../../components/TeacherStudentRecords";
import NoData from "../../components/NoData";

const CourseInfo = ({ navigation, route }) => {
	const { authState } = useContext(AuthContext);
	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showDetails, setShowDetails] = useState(false);
	const [showStudentRecords, setShowStudentRecords] = useState(false);
	const [selectedStudent, setSelectedStudent] = useState(null);

	const teacher = authState?.auth?.user;

	const course = route.params.course;

	const toggleShowDetails = () => {
		setShowDetails(!showDetails);
	};

	const toggleShowStudentRecords = () => {
		setShowStudentRecords(!showStudentRecords);
	};

	const handleStudentSelect = (student) => {
		setSelectedStudent(student);
		toggleShowStudentRecords();
	};

	useEffect(() => {
		async function fetchStudents() {
			setLoading(true);
			try {
				const response = await axios.get(
					`/v1/instructors/${teacher?._id}/courses/${course?._id}/students`
				);
				setStudents(response.data);
			} catch (err) {
				console.error(err);
			}
			setLoading(false);
		}
		fetchStudents();
	}, [course._id, teacher._id]);

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
					<View style={styles.headerRight}>
						<TouchableOpacity onPress={toggleShowDetails}>
							<Entypo
								name="info-with-circle"
								size={22}
								color="white"
							/>
						</TouchableOpacity>
						<TouchableOpacity
							style={{ marginLeft: 20 }}
							onPress={() =>
								navigation.navigate("Attendance", { course })
							}
						>
							<FontAwesome5
								name="clipboard-list"
								size={22}
								color="white"
							/>
						</TouchableOpacity>
					</View>
				}
				centerComponent={{
					text: "Students",
					style: styles.heading,
				}}
			/>
			<View style={styles.body}>
				{students.length ? (
					<ScrollView>
						{students?.map((student) => (
							<TouchableOpacity
								key={student?._id}
								onPress={() => {
									handleStudentSelect(student);
								}}
							>
								<StudentListItem student={student} />
							</TouchableOpacity>
						))}
					</ScrollView>
				) : (
					<NoData text="No enrolled student found" />
				)}
			</View>
			<TeacherCourseDetails
				show={showDetails}
				toggleShow={toggleShowDetails}
				course={course}
				students={students}
			/>
			<TeacherStudentRecords
				visible={showStudentRecords}
				toggleOverlay={toggleShowStudentRecords}
				student={selectedStudent}
				course={course}
			/>
		</SafeAreaProvider>
	);
};

export default CourseInfo;

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
		marginTop: 5,
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
	header: { height: 45, backgroundColor: "#537791" },
	text: { textAlign: "center", fontWeight: "300", color: "white" },
});
