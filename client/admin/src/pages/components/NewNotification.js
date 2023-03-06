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

function NewNotification({ show, handleClose, appendNotification }) {
	const [values, setValues] = useState({
		title: "",
		text: "",
		createdAt: "",
		loading: false,
		error: "",
	});

	const clear = () => {
		setValues({
			title: "",
			text: "",
			createdAt: "",
			loading: false,
			error: "",
		});
	};

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const nowDate = Date();
		const student = {
			title: values.title || undefined,
			text: values.text || undefined,
			createdAt: nowDate || undefined,
		};

		try {
			setValues({ ...values, loading: true, error: "" });
			const jwt = JSON.parse(localStorage.getItem("adauth"));
			const token = jwt.token;		
			const response = await axios.post("v1/admin/notifications", student, 
											{ headers: {"Authorization" : `Bearer ${token}`}});
			setValues({ ...values, loading: false });
			clear();
			appendNotification(response.data);
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
					<Modal.Title className="h6">New Notification</Modal.Title>
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
									<Form.Group id="title" className="mb-4">
										<Form.Label>Title</Form.Label>
										<InputGroup>
											<Form.Control
												value={values.title}
												onChange={handleChange(
													"title"
												)}
												autoFocus
												required
												type="text"
												placeholder="Notification Title"
											/>
										</InputGroup>
									</Form.Group>
									<Form.Group id="text" className="mb-4">
										<Form.Label>Text</Form.Label>
										<InputGroup>
											<Form.Control
												value={values.text}
												onChange={handleChange(
													"text"
												)}
												autoFocus
												required
												type="text"
												placeholder="Notification Text"
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

export default NewNotification;
