import axios from "../api/axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Preloader from "../components/Preloader";
import { Breadcrumb, Button, Card, Modal, Table } from "react-bootstrap";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AttendanceRecords() {
	const { state } = useLocation();
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showAttendanceRecordsModal, setShowAttendanceRecordsModal] =
		useState(false);
	const [courseId, setCourseId] = useState();

	useEffect(() => {
		setLoading(true);
		const studentId = state._id;
		axios
			.get("/v1/student-courses/student/" + studentId)
			.then((result) => {
				setLoading(false);
				setCourses(result.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [state._id]);

	const handleClick = (courseId) => {
		setCourseId(courseId);
		toggleRecords();
	};

	const toggleRecords = () => {
		setShowAttendanceRecordsModal(!showAttendanceRecordsModal);
	};

	const TableRow = ({ item, onPress }) => {
		return (
			<tr onClick={onPress}>
				<td>
					<span className="fw-normal">{item.name}</span>
				</td>
				<td>
					<span className="fw-normal">
						{item.instructor.lastName} {item.instructor.firstName}
					</span>
				</td>
				<td>
					<span className="fw-normal">
						{item.period.semester} {item.period.year}
					</span>
				</td>
				<td>
					<span className="fw-normal">
						{item.time.day}, {item.time.startTime}-
						{item.time.endTime}
					</span>
				</td>
			</tr>
		);
	};

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
						<Breadcrumb.Item>Attendance</Breadcrumb.Item>
						<Breadcrumb.Item active>
							{state.firstName} {state.lastName}
						</Breadcrumb.Item>
					</Breadcrumb>
					<h4>
						Courses for {state.firstName} {state.lastName}
					</h4>
					<p className="mb-0">
						Click on one of the courses to check their class
						attendance records
					</p>
				</div>
			</div>
			<Card
				style={{ minHeight: "50vh" }}
				border="light"
				className="table-wrapper table-responsive shadow-sm"
			>
				<Card.Body className="pt-0">
					<Table hover className="user-table align-items-center">
						<thead>
							<tr>
								<th className="border-bottom">COURSE NAME</th>
								<th className="border-bottom">TEACHER NAME</th>
								<th className="border-bottom">PERIOD</th>
								<th className="border-bottom">TIME</th>
							</tr>
						</thead>
						<tbody>
							{courses.length !== 0 ? (
								courses?.map((item) => (
									<TableRow
										key={item._id}
										item={item}
										onPress={() => handleClick(item._id)}
									/>
								))
							) : (
								<tr>
									<td colSpan={4} align={"center"}>
										This student is not enrolled in any
										course yet.
									</td>
								</tr>
							)}
						</tbody>
					</Table>
				</Card.Body>
			</Card>

			<AttendanceRecordsModal
				studentId={state._id}
				show={showAttendanceRecordsModal}
				toggleShow={toggleRecords}
				courseId={courseId}
			/>
		</>
	);
}

const AttendanceRecordsModal = ({ studentId, toggleShow, show, courseId }) => {
	const [attendanceRecords, setAttendanceRecords] = useState([]);
	const clearRecords = () => setAttendanceRecords([]);

	const handleClose = () => {
		toggleShow();
		clearRecords();
	};

	useEffect(() => {
		axios
			.get(
				"/v1/student-courses/students/" +
					studentId +
					"/courses/" +
					courseId +
					"/attendance-records"
			)
			.then((result) => {
				setAttendanceRecords(result.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [studentId, courseId]);

	const AttendanceTableRow = ({ item }) => {
		return (
			<tr>
				<td>
					<span className="fw-normal">{item.date} </span>
				</td>
				<td>
					<span className="fw-normal">{item.status} </span>
				</td>
			</tr>
		);
	};

	return (
		<React.Fragment>
			<Modal
				as={Modal.Dialog}
				centered
				show={show}
				onHide={handleClose}
				backdrop="static"
				size="xl"
			>
				<Modal.Header>
					<Modal.Title className="h6"> Attendance Status</Modal.Title>
					<Button
						variant="close"
						aria-label="Close"
						onClick={handleClose}
					/>
				</Modal.Header>
				<Modal.Body>
					<Card
						style={{ minHeight: "30vh" }}
						border="light"
						className="table-wrapper table-responsive shadow-sm"
					>
						<Card.Body className="pt-0">
							<Table
								hover
								className="user-table align-items-center"
							>
								<thead>
									<tr>
										<th className="border-bottom">DATE</th>
										<th className="border-bottom">
											STATUS
										</th>
									</tr>
								</thead>
								<tbody>
									{attendanceRecords?.map((item) => (
										<AttendanceTableRow
											key={item._id}
											item={item}
											onPress={() => {}}
										/>
									))}
								</tbody>
							</Table>
						</Card.Body>
					</Card>
				</Modal.Body>
				<Modal.Footer>
					<div className="small">TODO: Implement pagination</div>
				</Modal.Footer>
			</Modal>
		</React.Fragment>
	);
};

export default AttendanceRecords;
