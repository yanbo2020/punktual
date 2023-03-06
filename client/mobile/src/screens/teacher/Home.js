import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { format } from "date-fns";
import { AuthContext, TeacherDataContext } from "../../data/context";
import TeacherCourseItem from "../../components/TeacherCourseItem";
import NoData from "../../components/NoData";

const Home = () => {
	const today = format(new Date(), "EEEE");
	const { authState } = useContext(AuthContext);
	const { teacherDataState } = useContext(TeacherDataContext);

	const user = authState?.auth?.user;
	const courses = teacherDataState?.courses;

	const todayCourses = courses?.filter((course) => {
		return course?.time?.day === today;
	});

	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<View>
					<Text style={styles.welcomeText}>Welcome 老师</Text>
					<View style={styles.getstartedContainer}>
						<Text style={styles.mainText}>
							Use Punktual to track your students' attendance.
						</Text>
					</View>
				</View>
				<Image
					source={require("../../../assets/images/undraw.png")}
					style={{
						marginLeft: -20,
						marginTop: 15,
					}}
				/>
			</View>
			<View style={styles.bottom}>
				<Text
					style={{
						color: "#345c74",

						fontSize: 20,
						paddingHorizontal: 20,
						marginTop: 20,
						marginBottom: 10,
					}}
				>
					Today's Classes
				</Text>
				{todayCourses?.length ? (
					<ScrollView showsVerticalScrollIndicator={false}>
						{todayCourses?.map((course) => (
							<TeacherCourseItem
								key={course?._id}
								course={course}
							/>
						))}
					</ScrollView>
				) : (
					<NoData text="No classes today" />
				)}
			</View>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1C4652",
	},
	welcomeText: {
		color: "#fff",
		fontSize: 20,
		paddingRight: 100,
	},
	getstartedContainer: {
		marginTop: 20,
		width: 150,
	},
	getstarted: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "#f58084",
		alignItems: "center",
		paddingVertical: 10,
		borderRadius: 14,
		paddingHorizontal: 10,
	},
	getstartedText: {
		color: "#FFF",
		fontSize: 12,
	},
	mainText: {
		color: "#fff",
		fontSize: 14,
		textAlign: "left",
		lineHeight: 18,
	},
	top: {
		height: "30%",
		backgroundColor: "#1C4652",
		flexDirection: "row",
		paddingTop: 70,
		paddingBottom: 30,
		paddingLeft: 30,
	},
	bottom: {
		height: "70%",
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		backgroundColor: "#fff",
	},
});
