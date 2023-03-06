import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	TextInput,
	View,
} from "react-native";
import React, { useContext, useState } from "react";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TeacherDataContext } from "../../data/context";
import TeacherCourseItem from "../../components/TeacherCourseItem";

const Courses = () => {
	const [searchText, setSearchText] = useState("");
	const { teacherDataState } = useContext(TeacherDataContext);

	const courses = teacherDataState?.courses;

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={-200}
			style={styles.container}
		>
			<View style={styles.header}>
				<View style={styles.headerFilterArea}>
					<View style={styles.headerSearch}>
						<TextInput
							placeholder="Search Classes"
							placeholderTextColor="#345c74"
							style={styles.textInput}
							value={searchText}
							onChangeText={(text) => setSearchText(text)}
						/>
						{searchText !== "" && (
							<MaterialIcons
								name="cancel"
								size={20}
								color="#345c74"
								onPress={() => setSearchText("")}
							/>
						)}
					</View>
				</View>
			</View>
			<View style={styles.body}>
				<ScrollView>
					{courses
						?.filter((course) => {
							// filter courses by name and day of the week
							return searchText === ""
								? course
								: course.name
										.toLowerCase()
										.includes(searchText.toLowerCase())
								? course
								: course?.time.day
										.toLowerCase()
										.includes(searchText.toLowerCase())
								? course
								: null;
						})
						.map((course) => (
							<TeacherCourseItem
								key={course?._id}
								course={course}
							/>
						))}
				</ScrollView>
			</View>
		</KeyboardAvoidingView>
	);
};

export default Courses;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1C4652",
	},
	header: {
		display: "flex",
		height: "15%",
		backgroundColor: "#1C4652",
	},
	headerFilterArea: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: 20,
		marginTop: 50,
		marginBottom: 10,
	},
	headerSearch: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFF",
		padding: 10,
		borderRadius: 8,
		width: "100%",
		height: 40,
	},
	textInput: {
		fontSize: 12,
		width: "90%",
		paddingHorizontal: 12,
	},
	body: {
		height: "85%",
		backgroundColor: "#fff",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
});
