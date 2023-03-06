import React, { useEffect, useState } from "react";
import {
	Modal,
	Button,
	Container,
	Row,
	Col,
	Form,
	InputGroup,
	Spinner,
} from "react-bootstrap";
import axios from "../../api/axios";

function EditStudent({ show, handleClose, data, updateStudent }) {
	const [values, setValues] = useState({
		firstName: data.firstName,
		lastName: data.lastName,
		email: data.email,
		college: data.college,
		major: data.major,
		class: data.class,
		password: "",
		loading: false,
		error: "",
	});
	const jwt = JSON.parse(localStorage.getItem("adauth"));
	const token = jwt.token;

	useEffect(() => {
		setValues({
			...values,
			firstName: data?.firstName,
			lastName: data?.lastName,
			email: data?.email,
			college: data.college,
			major: data.major,
			class: data.class,
		});
	}, [data]);

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const handleUpdate = async (event) => {
		event.preventDefault();
		setValues({ ...values, error: "", loading: true });

		const student = {
			idNumber: data.idNumber || undefined,
			firstName: values.firstName || undefined,
			lastName: values.lastName || undefined,
			email: values.email || undefined,
			college: values.college || undefined,
			major: values.major || undefined,
			class: values.class || undefined,
			password: values.password || undefined,

		};
		try {
			const response = await axios.put(
				`v1/admin/students/${data._id}`,
				student,
				{ headers: {"Authorization" : `Bearer ${token}`}}
			);
			setValues({ ...values, error: "", loading: false });
			updateStudent(data._id, student);
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
					<Modal.Title className="h6">Edit Student Account</Modal.Title>
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
								<Form className="mt-4" onSubmit={handleUpdate}>
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
													type="password"
													placeholder="Password"
												/>
											</InputGroup>
										</Form.Group>
									</Form.Group>
									<Button
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
											"Update"
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

export default EditStudent;
