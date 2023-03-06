import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb, Card, Form, InputGroup } from "react-bootstrap";
import axios from "../api/axios";
import Preloader from "../components/Preloader";
import CustomPagination from "./components/CustomPagination";
import { AttendanceTable } from "./components/AttendanceTable";

function StudentsAttendance() {
	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
	const [searchText, setSearchText ] = useState("");

	useEffect(() => {
		setLoading(true);
		const jwt = JSON.parse(localStorage.getItem("adauth"));
		const token = jwt.token;
		axios
			.get("v1/admin/students", { headers: {"Authorization" : `Bearer ${token}`}})
			.then((result) => {
				setLoading(false);
				setStudents(result.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = students.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(students.length / recordsPerPage);

	return (
		<>
			<Preloader show={loading ? true : false} />
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
				<div className="d-block mb-4 mb-md-0">
					<Breadcrumb
						className="d-none d-md-inline-block"
						listProps={{
							className: "breadcrumb-dark breadcrumb-transparent",
						}}
					>
						<Breadcrumb.Item>
							<FontAwesomeIcon icon={faHome} />
						</Breadcrumb.Item>
						<Breadcrumb.Item>Students</Breadcrumb.Item>
						<Breadcrumb.Item active>Attendance</Breadcrumb.Item>
					</Breadcrumb>
					<h4>Students Attendance Records</h4>
					<p className="mb-0">Click on one of the students to check the courses they are enrolled in</p>
				</div>
			</div>

			<Card
				border="light"
				className="table-wrapper table-responsive shadow-sm"
			>
				<Card.Body>
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>Search by student name</Form.Label>
							<InputGroup>
							<InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
							<Form.Control type="text" placeholder="Search" onChange={(e) => setSearchText(e.target.value)}/>
							</InputGroup>
						</Form.Group>
					</Form>
					<AttendanceTable
						data={currentRecords}
						searchText={searchText}
						allRecords={students}
					/>
					<CustomPagination
					nPages={nPages}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
				</Card.Body>
			</Card>
		</>
	);
}

export default StudentsAttendance;
