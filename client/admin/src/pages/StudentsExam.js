import React, { useEffect } from "react";
import { useState } from "react";
import Exam from "./components/Exam";
import axios from "../api/axios";
import Preloader from "../components/Preloader";

function StudentsExam() {
	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(true);
	const jwt = JSON.parse(localStorage.getItem("adauth"));
	const token = jwt.token;

	useEffect(() => {
		// TODO: Change the request when exam api is available
		axios
			.get("v1/admin/students", { headers: {"Authorization" : `Bearer ${token}`}})
			.then((response) => {
				setLoading(false);
				setStudents(response.data);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	}, []);

	return (
		<>
			<Preloader show={loading ? true : false} />
			<Exam
				text="Exams"
				desc="Students exams status"
				data={students}
			/>
		</>
	);
}

export default StudentsExam;
