import { ScrollView } from "react-native";
import React from "react";
import StudentCourseItem from "./StudentCourseItem";

const StudentCourseList = ({ courses, searchText }) => {
	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			{courses &&
				courses
					.filter((course) => {
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
						<StudentCourseItem key={course._id} course={course} />
					))}
		</ScrollView>
	);
};

export default StudentCourseList;
