import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb, Card, Button, Form, InputGroup } from "react-bootstrap";
import axios from "../api/axios";
import { CoursesTable } from "./components/CoursesTable";
import NewCourse from "./components/NewCourse";
import Preloader from "../components/Preloader";
import CustomPagination from "./components/CustomPagination";

function Courses() {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showCreateDialog, setShowCreateDialog] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
	const [ searchText, setSearchText ] = useState("");

	const handleClose = () => {
		setShowCreateDialog(false);
	};

	const appendCourse = (data) => {
		let coursesCopy = courses;
		coursesCopy = [...coursesCopy, data];
		setCourses(coursesCopy);
	};

	const updateCourse = (id, data) => {
		let coursesCopy = currentRecords;
		let index = coursesCopy.findIndex((item) => item._id === id);
		let selected = coursesCopy[index];
		selected = { ...selected, ...data };

		coursesCopy[index] = selected;
		setCourses(coursesCopy);
	};

	const removeCourse = (id) => {
		let coursesCopy = courses;
		const filtered = coursesCopy.filter((item) => item._id !== id);
		setCourses(filtered);
	};

	useEffect(() => {
		setLoading(true);
		const jwt = JSON.parse(localStorage.getItem("adauth"));
		const token = jwt.token;
		axios
			.get("v1/admin/courses", { headers: {"Authorization" : `Bearer ${token}`}})
			.then((result) => {
				setLoading(false);
				setCourses(result.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = courses.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(courses.length / recordsPerPage);

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
						<Breadcrumb.Item>Course</Breadcrumb.Item>
						<Breadcrumb.Item active>Courses</Breadcrumb.Item>
					</Breadcrumb>
					<h4>Courses</h4>
					<p className="mb-0">The Courses Records</p>
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
							<Form.Label>Search by course name</Form.Label>
							<InputGroup>
							<InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
							<Form.Control type="text" placeholder="Search" onChange={(e) => setSearchText(e.target.value)}/>
							</InputGroup>
						</Form.Group>
					</Form>
					<CoursesTable
						data={currentRecords}
						removeCourse={removeCourse}
						updateCourse={updateCourse}
						searchText={searchText}
						allRecords={courses}
					/>
					<CustomPagination
					nPages={nPages}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
				</Card.Body>
			</Card>
			<NewCourse
				show={showCreateDialog}
				handleClose={handleClose}
				appendCourse={appendCourse}
			/>
		</>
	);
}

export default Courses;
