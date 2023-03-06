import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb, Card, Button, Form, InputGroup } from "react-bootstrap";
import axios from "../api/axios";
import { TeacherAccontsTable } from "./components/TeacherAccountsTable";
import NewTeacher from "./components/NewTeacher";
import Preloader from "../components/Preloader";
import CustomPagination from "./components/CustomPagination";

function TeacherAccounts() {
	const [ teachers, setTeachers ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ showCreateDialog, setShowCreateDialog ] = useState(false);
	const jwt = JSON.parse(localStorage.getItem("adauth"));
	const token = jwt.token;
	const [ currentPage, setCurrentPage ] = useState(1);
    const [ recordsPerPage ] = useState(10);
	const [ searchText, setSearchText ] = useState("");

	const handleClose = () => {
		setShowCreateDialog(false);
	};

	const appendTeacher = (data) => {
		let teachersCopy = teachers;
		teachersCopy = [...teachersCopy, data];
		setTeachers(teachersCopy);
	};

	const updateTeacher = (id, data) => {
		let teachersCopy = currentRecords;
		let index = teachersCopy.findIndex((item) => item._id === id);
		let selected = teachersCopy[index];
		selected = { ...selected, ...data };

		teachersCopy[index] = selected;
		setTeachers(teachersCopy);
	};

	const removeTeacher = (id) => {
		let teachersCopy = teachers;
		const filtered = teachersCopy.filter((item) => item._id !== id);
		setTeachers(filtered);
	};

	useEffect(() => {
		setLoading(true);
		axios
			.get("v1/admin/teachers", { headers: {"Authorization" : `Bearer ${token}`}})
			.then((result) => {
				setLoading(false);
				setTeachers(result.data);
			})
			.catch((error) => {
				console.log("Here lies the error.")
				console.log(error);
			});
	}, []);

	const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = teachers.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(teachers.length / recordsPerPage);

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
						<Breadcrumb.Item>Staff</Breadcrumb.Item>
						<Breadcrumb.Item active>Teachers</Breadcrumb.Item>
					</Breadcrumb>
					<h4>Staff</h4>
					<p className="mb-0">The Teacher Accounts</p>
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
							<Form.Label>Search by teacher name</Form.Label>
							<InputGroup>
							<InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
							<Form.Control type="text" placeholder="Search" onChange={(e) => setSearchText(e.target.value)}/>
							</InputGroup>
						</Form.Group>
					</Form>
					<TeacherAccontsTable
						data={currentRecords}
						removeTeacher={removeTeacher}
						updateTeacher={updateTeacher}
						searchText={searchText}
						allRecords={teachers}
					/>
					<CustomPagination
						nPages={nPages}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
				</Card.Body>
			</Card>
			<NewTeacher
				show={showCreateDialog}
				handleClose={handleClose}
				appendTeacher={appendTeacher}
			/>
		</>
	);
}

export default TeacherAccounts;
