import React, { useEffect, useState } from "react";
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

function EditBuilding({ show, handleClose, data, updateBuilding }) {
	const [values, setValues] = useState({
		buildingNumber: data?.buildingNumber,
        lat: data?.coordinates?.lat,
        lng: data?.coordinates?.lng,
		loading: false,
		error: "",
	});
	const jwt = JSON.parse(localStorage.getItem("adauth"));
	const token = jwt.token;

	useEffect(() => {
		setValues({
			...values,
			buildingNumber: data?.buildingNumber,
            lat: data?.coordinates?.lat,
            lng: data?.coordinates?.lng,
		});
	}, [data]);

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const handleUpdate = async (event) => {
		event.preventDefault();
		setValues({ ...values, error: "", loading: true });
		const building = {
			buildingNumber: values.buildingNumber || undefined,
			coordinates: {
				lat: values.lat || undefined,
				lng: values.lng || undefined,
			},
		};

		try {
			const response = await axios.put(
				`v1/admin/buildings/${data._id}`,
				building,
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			setValues({ ...values, error: "", loading: false });
			updateBuilding(data._id, building);
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
                size="lg"
			>
				<Modal.Header>
					<Modal.Title className="h6">Edit Building</Modal.Title>
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
							<div className="bg-white shadow-soft border rounded border-light p-lg-3 w-100 fmxw-500">
								<Form className="mt-4" onSubmit={handleUpdate}>
									<Form.Group id="name" className="mb-4">
										<Form.Label>Building Number</Form.Label>
										<InputGroup>
											<Form.Control
												value={values.buildingNumber}
												onChange={handleChange("buildingNumber")}
												autoFocus
												required
												type="Number"
												placeholder="Building Number"
											/>
										</InputGroup>
									</Form.Group>
									<Form.Group id="coordinates" className="mb-4">
										<Form.Label>Coordinates</Form.Label>
										<InputGroup className="mb-3">
											<InputGroup.Text>
												Latitude and Longitude
											</InputGroup.Text>
											<Form.Control
												value={values.lat}
												aria-label="Latitude"
												id="lat"
												onChange={handleChange("lat")}
												placeholder="Latitude"
											/>
											<Form.Control
												value={values.lng}
												aria-label="Longitude"
												id="lng"
												onChange={handleChange(
													"lng"
												)}
												placeholder="Longitude"
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
										onClick={handleClose}
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

export default EditBuilding;
