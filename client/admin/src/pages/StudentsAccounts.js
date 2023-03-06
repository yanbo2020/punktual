import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb, Card, Button, Form, InputGroup } from "react-bootstrap";
import axios from "../api/axios";
import { StudentAccontsTable } from "./components/StudentAccountsTable";
import NewStudent from "./components/NewStudent";
import Preloader from "../components/Preloader";
import CustomPagination from "./components/CustomPagination";

function StudentsAccounts() {
	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showCreateDialog, setShowCreateDialog] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
	const [searchText, setSearchText ] = useState("");

	const handleClose = () => {
		setShowCreateDialog(false);
	};

	const appendStudent = (data) => {
		let studentsCopy = students;
		studentsCopy = [...studentsCopy, data];
		setStudents(studentsCopy);
	};

	const updateStudent = (id, data) => {
		let studentsCopy = currentRecords;
		let index = studentsCopy.findIndex((item) => item._id === id);
		let selected = studentsCopy[index];
		selected = { ...selected, ...data };
		studentsCopy[index] = selected;
		setStudents(studentsCopy);
	};

	const removeStudent = (id) => {
		let studentsCopy = students;
		const filtered = studentsCopy.filter((item) => item._id !== id);
		setStudents(filtered);
	};

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
						<Breadcrumb.Item active>All Students</Breadcrumb.Item>
					</Breadcrumb>
					<h4>All Students</h4>
					<p className="mb-0">The Student Accounts</p>
				</div>
				<div className="btn-toolbar mb-2 mb-md-0">
					<Button
						variant="outline-primary"
						className="m-1"
						onClick={() => setShowCreateDialog(true)}
					>
						<FontAwesomeIcon icon={faPlus} className="me-2" />
						New
					</Button>
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
					<StudentAccontsTable
						data={currentRecords}
						removeStudent={removeStudent}
						updateStudent={updateStudent}
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
			<NewStudent
				show={showCreateDialog}
				handleClose={handleClose}
				appendStudent={appendStudent}
			/>
		</>
	);
}

export default StudentsAccounts;
