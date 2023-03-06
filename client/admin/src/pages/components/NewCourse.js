import React, { useState, useEffect } from "react";
import {
	Modal,
	Button,
	Row,
	Col,
	Form,
	InputGroup,
	Spinner,
	Alert,
} from "react-bootstrap";

import axios from "../../api/axios";

function NewCourse({ show, handleClose, appendCourse }) {
	const jwt = JSON.parse(localStorage.getItem("adauth"));
	const token = jwt.token;
	const [values, setValues] = useState({
		name: "",
		instructor: {},
		year: "",
		semester: "",
		day: "",
		startTime: "",
		endTime: "",
		building: {},
		room: "",
		loading: false,
		error: "",
	});
	const [teachers, setTeachers] = useState([]);
	useEffect(() => {
		axios
			.get("/v1/admin/teachers", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((result) => {
				setTeachers(result.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const [buildings, setBuildings] = useState([]);
	useEffect(() => {
		axios
			.get("/v1/admin/buildings", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((result) => {
				setBuildings(result.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const clear = () => {
		setValues({
			name: "",
			instructor: "",
			year: "",
			semester: "",
			day: "",
			startTime: "",
			endTime: "",
			building: "",
			room: "",
			loading: false,
			error: "",
		});
	};

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const course = {
			name: values.name || undefined,
			instructor: values.instructor || undefined,
			period: {
				year: values.year || undefined,
				semester: values.semester || undefined,
			},
			time: {
				day: values.day || undefined,
				startTime: values.startTime || undefined,
				endTime: values.endTime || undefined,
			},
			location: {
				building: values.building || undefined,
				room: values.room || undefined,
			},
		};

		try {
			setValues({ ...values, loading: true, error: "" });
			const jwt = JSON.parse(localStorage.getItem("adauth"));
			const token = jwt.token;
			const response = await axios.post("v1/admin/courses", course, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setValues({ ...values, loading: false });
			clear();
			appendCourse(response.data);
			handleClose();
		} catch (err) {
			setValues({
				...values,
				loading: false,
				error: err?.response?.data,
			});
		}
	};

	return (
		<React.Fragment>
			<Modal
				as={Modal.Dialog}
				centered
				show={show}
				onHide={handleClose}
				backdrop="static"
			>
				<Modal.Header>
					<Modal.Title className="h6">New Course</Modal.Title>
					<Button
						variant="close"
						aria-label="Close"
						onClick={handleClose}
					/>
				</Modal.Header>
				<Modal.Body>
					<Row className="justify-content-center form-bg-image">
						<Col
							xs={12}
							className="d-flex align-items-center justify-content-center"
						>
							<div className="bg-white shadow-soft border rounded border-light p-lg-5 w-100 fmxw-500">
								<Form className="mt-4" onSubmit={handleSubmit}>
									<Form.Group id="name" className="mb-4">
										<Form.Label>Course Name</Form.Label>
										<InputGroup>
											<Form.Control
												value={values.name}
												onChange={handleChange("name")}
												autoFocus
												required
												type="text"
												placeholder="Course Name"
											/>
										</InputGroup>
									</Form.Group>
									<Form.Group
										id="instructor"
										className="mb-4"
									>
										<Form.Label>
											Course Instructor
										</Form.Label>
										<InputGroup>
											<Form.Select
												onChange={handleChange(
													"instructor"
												)}
												required
												type="text"
												placeholder="Select Instructor"
											>
												<option disabled selected>
													Select instructor
												</option>
												{teachers?.map((teacher) => (
													<option
														key={teacher._id}
														value={teacher._id}
													>
														{teacher.firstName}{" "}
														{teacher.lastName}
													</option>
												))}
											</Form.Select>
										</InputGroup>
									</Form.Group>
									<Form.Group id="period" className="mb-4">
										<Form.Label>Period</Form.Label>
										<InputGroup className="mb-3">
											<InputGroup.Text>
												Year and Semester
											</InputGroup.Text>
											<Form.Control
												aria-label="Year"
												id="year"
												onChange={handleChange("year")}
												placeholder="Year"
											/>
											<Form.Control
												aria-label="Semester"
												id="semester"
												onChange={handleChange(
													"semester"
												)}
												placeholder="Semester"
											/>
										</InputGroup>
									</Form.Group>
									<Form.Group id="time" className="mb-4">
										<Form.Label>Time</Form.Label>
										<InputGroup className="mb-3">
											<Form.Select
												onChange={handleChange("day")}
												required
												type="text"
												placeholder="Select Day"
											>
												<option disabled selected>
													Select day
												</option>
												<option>Monday</option>
												<option>Tuesday</option>
												<option>Wednesday</option>
												<option>Thursday</option>
												<option>Friday</option>
												<option>Saturday</option>
												<option>Sunday</option>
											</Form.Select>
											<Form.Control
												aria-label="Start Time"
												id="startTime"
												onChange={handleChange(
													"startTime"
												)}
												placeholder="Start Time"
											/>
											<Form.Control
												aria-label="End Time"
												id="endTime"
												onChange={handleChange(
													"endTime"
												)}
												placeholder="End Time"
											/>
										</InputGroup>
									</Form.Group>
									<Form.Group id="location" className="mb-4">
										<Form.Label>Location</Form.Label>
										<InputGroup className="mb-3">
											<Form.Select
												id="building"
												onChange={handleChange(
													"building"
												)}
												required
												type="text"
												placeholder="Select Building"
											>
												<option disabled selected>
													Select building number
												</option>
												{buildings?.map((building) => (
													<option
														key={building._id}
														value={building._id}
													>
														{
															building.buildingNumber
														}
													</option>
												))}
												;
											</Form.Select>
											<Form.Control
												aria-label="Room"
												id="room"
												onChange={handleChange("room")}
												placeholder="Room"
											/>
										</InputGroup>
									</Form.Group>
									{values.error && (
										<Alert key="danger" variant="danger">
											{values.error.error}
										</Alert>
									)}
									<Button
										disabled={values.loading}
										variant="primary"
										type="submit"
										className="w-100"
									>
										{values.loading ? (
											<Spinner
												animation="border"
												variant="light"
											/>
										) : (
											"Save"
										)}
									</Button>
								</Form>
							</div>
						</Col>
					</Row>
				</Modal.Body>
			</Modal>
		</React.Fragment>
	);
}

export default NewCourse;
