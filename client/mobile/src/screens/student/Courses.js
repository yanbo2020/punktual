import { StyleSheet, TextInput, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tab } from "@rneui/base";
import { TabView } from "@rneui/themed";

import StudentCourseList from "../../components/StudentCourseList";
import CourseFilterOverlay from "../../components/CourseFilterOverlay";
import { StudentDataContext } from "../../data/context";

const Courses = () => {
	const { studentDataState } = useContext(StudentDataContext);
	const [index, setIndex] = useState(0);
	const [courses, setCourses] = useState([]);
	const [showOverlay, setShowOverlay] = useState(false);
	const [searchText, setSearchText] = useState("");

	const enrolledCourses = studentDataState?.enrolledCourses;
	const allCourses = studentDataState?.courses;

	const toggleOverlay = () => {
		setShowOverlay(!showOverlay);
	};

	useEffect(() => {
		setIndex(0);
		setCourses(enrolledCourses);
	}, []);

	const onTabChange = (index) => {
		setIndex(index);
		if (index === 0) {
			setCourses(enrolledCourses);
		} else {
			setCourses(allCourses);
		}
	};

	return (
		<View style={styles.container}>
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

				<View style={styles.headerTab}>
					<Tab
						indicatorStyle={{
							backgroundColor: "white",
							height: 3,
						}}
						value={index}
						onChange={onTabChange}
						dense
					>
						<Tab.Item
							title={`Enrolled Courses (${
								enrolledCourses?.length || 0
							})`}
							titleStyle={(active) => ({
								fontWeight: active ? "bold" : undefined,
								color: "#fff",
								fontSize: 15,
							})}
						/>
						<Tab.Item
							title={`All Courses (${allCourses?.length || 0})`}
							titleStyle={(active) => ({
								fontWeight: active ? "bold" : undefined,
								color: "#fff",
								fontSize: 15,
							})}
						/>
					</Tab>
				</View>
			</View>
			<View style={styles.body}>
				<TabView
					value={index}
					onChange={onTabChange}
					animationType="spring"
				>
					<TabView.Item style={styles.tabViewItem}>
						<StudentCourseList
							searchText={searchText}
							courses={courses}
						/>
					</TabView.Item>
					<TabView.Item style={styles.tabViewItem}>
						<StudentCourseList
							searchText={searchText}
							courses={courses}
						/>
					</TabView.Item>
				</TabView>
			</View>
			<CourseFilterOverlay
				visible={showOverlay}
				toggleOverlay={toggleOverlay}
			/>
		</View>
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
		height: "20%",
		backgroundColor: "#1C4652",
	},
	headerTab: {
		paddingHorizontal: 10,
	},
	headerFilterArea: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: 20,
		marginTop: 35,
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
		height: "80%",
		backgroundColor: "#fff",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	tabViewItem: {
		width: "100%",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
});
