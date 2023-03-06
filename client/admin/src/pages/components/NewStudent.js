import React, { useState } from "react";
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

function NewAdmin({ show, handleClose, appendStudent }) {
	const [values, setValues] = useState({
		idNumber: "",
		firstName: "",
		lastName: "",
		email: "",
		college: "",
		major: "",
		class: "",
		password: "",
		loading: false,
		error: "",
	});

	const clear = () => {
		setValues({
			idNumber: "",
			firstName: "",
			lastName: "",
			email: "",
			college: "",
			major: "",
			class: "",
			password: "",
			loading: false,
			error: "",
		});
	};

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const uniqueIdNumber = Date.now().toString();
		const student = {
			idNumber: uniqueIdNumber,
			firstName: values.firstName || undefined,
			lastName: values.lastName || undefined,
			email: values.email || undefined,
			college: values.college || undefined,
			major: values.major || undefined,
			class: values.class || undefined,
			password: values.password || undefined,
		};

		try {
			setValues({ ...values, loading: true, error: "" });
			const jwt = JSON.parse(localStorage.getItem("adauth"));
			const token = jwt.token;		
			const response = await axios.post("v1/admin/students", student, 
											{ headers: {"Authorization" : `Bearer ${token}`}});
			setValues({ ...values, loading: false });
			clear();
			appendStudent(response.data);
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
					<Modal.Title className="h6">New Student Account</Modal.Title>
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
									<Form.Group id="firstName" className="mb-4">
										<Form.Label>First Name</Form.Label>
										<InputGroup>
											<Form.Control
												value={values.firstName}
												onChange={handleChange(
													"firstName"
												)}
												autoFocus
												required
												type="text"
												placeholder="First Name"
											/>
										</InputGroup>
									</Form.Group>
									<Form.Group id="lastName" className="mb-4">
										<Form.Label>Last Name</Form.Label>
										<InputGroup>
											<Form.Control
												value={values.lastName}
												onChange={handleChange(
													"lastName"
												)}
												autoFocus
												required
												type="text"
												placeholder="Last Name"
											/>
										</InputGroup>
									</Form.Group>
									<Form.Group id="email" className="mb-4">
										<Form.Label>Email</Form.Label>
										<InputGroup>
											<Form.Control
												value={values.email}
												onChange={handleChange("email")}
												autoFocus
												required
												type="text"
												placeholder="Email"
											/>
										</InputGroup>
									</Form.Group>
									<Form.Group id="college" className="mb-4">
										<Form.Label>College</Form.Label>
										<InputGroup>
											<Form.Control
												value={values.college}
												onChange={handleChange("college")}
												autoFocus
												required
												type="text"
												placeholder="College"
											/>
										</InputGroup>
									</Form.Group>
									<Form.Group id="major" className="mb-4">
										<Form.Label>Major</Form.Label>
										<InputGroup>
											<Form.Control
												value={values.major}
												onChange={handleChange("major")}
												autoFocus
												required
												type="text"
												placeholder="Major"
											/>
										</InputGroup>
									</Form.Group>
									<Form.Group id="class" className="mb-4">
										<Form.Label>Class</Form.Label>
										<InputGroup>
											<Form.Control
												value={values.class}
												onChange={handleChange("class")}
												autoFocus
												required
												type="text"
												placeholder="Class"
											/>
										</InputGroup>
									</Form.Group>
									<Form.Group>
										<Form.Label>Password</Form.Label>
										<Form.Group
											id="password"
											className="mb-4"
										>
											<InputGroup>
												<Form.Control
													value={values.password}
													onChange={handleChange(
														"password"
													)}
													required
													type="password"
													placeholder="Password"
												/>
											</InputGroup>
										</Form.Group>
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

export default NewAdmin;
