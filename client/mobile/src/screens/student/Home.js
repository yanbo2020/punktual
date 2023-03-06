import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Image,
} from "react-native";
import React, { useContext } from "react";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";

import AuthContext from "../../data/context/AuthContext";
import StudentCourseItem from "../../components/StudentCourseItem";
import { StudentDataContext } from "../../data/context";

const Home = () => {
	const navigation = useNavigation();
	const today = format(new Date(), "EEEE");
	const { authState } = useContext(AuthContext);
	const { studentDataState } = useContext(StudentDataContext);

	const user = authState?.auth?.user;
	const enrolledCourses = studentDataState?.enrolledCourses;

	const todayCourses = enrolledCourses?.filter((course) => {
		return course?.time?.day === today;
	});

	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<View>
					<Text style={styles.welcomeText}>
						{`Welcome ${user?.firstName}`}
					</Text>
					<View style={styles.getstartedContainer}>
						{user?.image == null ? (
							<TouchableOpacity
								onPress={() =>
									navigation.navigate("GetStarted")
								}
								style={styles.getstarted}
							>
								<Text style={styles.getstartedText}>
									Get Started
								</Text>
								<Image
									source={require("../../../assets/images/a3.png")}
									style={{
										marginLeft: 20,
										width: 8,
										height: 8,
									}}
								/>
							</TouchableOpacity>
						) : (
							<Text style={styles.mainText}>
								Use Punktual to track your attendance in your
								classes.
							</Text>
						)}
					</View>
				</View>
				<Image
					source={require("../../../assets/images/undraw.png")}
					style={{
						marginLeft: -80,
						marginTop: 15,
					}}
				/>
			</View>
			<View style={styles.bottom}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Text style={styles.todayText}>Today's Classes</Text>

					{todayCourses?.map((course) => (
						<StudentCourseItem key={course?._id} course={course} />
					))}
				</ScrollView>
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
		width: 250,
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
		fontSize: 12,
		textAlign: "justify",
		lineHeight: 18,
		paddingHorizontal: 10,
	},
	top: {
		height: "25%",
		backgroundColor: "#1C4652",
		flexDirection: "row",
		paddingTop: 40,
		paddingBottom: 30,
		paddingLeft: 30,
	},
	bottom: {
		height: "75%",
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		backgroundColor: "#fff",
	},
	todayText: {
		color: "#345c74",
		fontSize: 20,
		paddingHorizontal: 20,
		marginTop: 20,
		marginBottom: 10,
	},
});
