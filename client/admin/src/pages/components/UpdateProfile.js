import React, { useState } from "react";
import { Col, Row, Card, Form, Button, Spinner, Alert } from "react-bootstrap";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

function UpdateProfile() {
	const user = JSON.parse(localStorage.getItem("adauth"));
	const { auth, setAuth } = useAuth();

	const [values, setValues] = useState({
		id: user.admin._id,
		firstName: user.admin.firstName,
		lastName: user.admin.lastName,
		email: user.admin.email,
		password: "",
		confirmPassword: "",
		loading: false,
		error: "",
	});


	const updateValues = (data) => {
		const localData = JSON.parse(localStorage.getItem("adauth"));
		delete data.password;
		localData.admin = data;
		localStorage.setItem("adauth", JSON.stringify(localData));
		setAuth({ ...auth, admin: { ...data } });
	};

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setValues({ ...values, error: "", loading: true });

		const admin = {
			_id: values.id,
			email: values.email || undefined,
			firstName: values.firstName || undefined,
			lastName: values.lastName || undefined,
			password: values.password || undefined,
		};

		if (values.password || values.confirmPassword) {
			if (values.confirmPassword !== values.password) {
				setValues({
					...values,
					loading: false,
					error: { error: "Please confirm the password" },
				});
				return;
			}
		}
		try {
			const token = user.token;
			const response = await axios.put(
				`v1/admin/admins/${user.admin._id}`,
				admin,
				{ headers: {"Authorization" : `Bearer ${token}`}}
			);
			setValues({ ...values, error: "", loading: false });
			updateValues(admin);
		} catch (err) {
			setValues({
				...values,
				loading: false,
				error: err?.response?.data,
			});
		}
	};

	return (
		<Card border="light" className="bg-white shadow-sm mb-4">
			<Card.Body>
				<h5 className="mb-4">Update Profile Information</h5>
				<Form onSubmit={handleSubmit}>
					<Row>
						<Col md={6} className="mb-3">
							<Form.Group id="firstName">
								<Form.Label>First Name</Form.Label>
								<Form.Control
									value={values.firstName}
									onChange={handleChange("firstName")}
									required
									type="text"
									placeholder="First Name"
								/>
							</Form.Group>
						</Col>
						<Col md={6} className="mb-3">
							<Form.Group id="lastName">
								<Form.Label>Last Name</Form.Label>
								<Form.Control
									value={values.lastName}
									onChange={handleChange("lastName")}
									required
									type="text"
									placeholder="Last Name"
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col md={6} className="mb-3">
							<Form.Group id="emal">
								<Form.Label>Email</Form.Label>
								<Form.Control
									value={values.email}
									onChange={handleChange("email")}
									required
									type="email"
									placeholder="Email"
								/>
							</Form.Group>
						</Col>
					</Row>

					<h5 className="my-4">Update Password</h5>
					<Row>
						<Col md={6} className="mb-3">
							<Form.Group id="password">
								<Form.Label>New Password</Form.Label>
								<Form.Control
									value={values.password}
									onChange={handleChange("password")}
									type="password"
									placeholder="Enter Password"
								/>
							</Form.Group>
						</Col>
						<Col md={6} className="mb-3">
							<Form.Group id="confirmPassword">
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									value={values.confirmPassword}
									onChange={handleChange("confirmPassword")}
									type="password"
									placeholder="Confirm Password"
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col xl={12}>
							{values.error && (
								<Alert key="danger" variant="danger">
									{values.error.error}
								</Alert>
							)}
						</Col>
					</Row>
					<div className="mt-3">
						<Button variant="primary" type="submit">
							{values.loading ? (
								<Spinner animation="border" variant="light" />
							) : (
								"Update"
							)}
						</Button>
					</div>
				</Form>
			</Card.Body>
		</Card>
	);
}

export default UpdateProfile;
