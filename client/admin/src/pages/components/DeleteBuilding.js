import React, { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

import axios from "../../api/axios";

function DeleteBuilding({ show, handleClose, data, removeBuilding }) {
	const [loading, setLoading] = useState(false);
	const jwt = JSON.parse(localStorage.getItem("adauth"));
	const token = jwt.token;

	const handleDelete = async () => {
		try {
			setLoading(true);
			const response = await axios.delete(`v1/admin/buildings/${data._id}`, { headers: {"Authorization" : `Bearer ${token}`}}); 
			setLoading(false);
			removeBuilding(data._id);
			handleClose();
		} catch (err) {
			setLoading(false);
			handleClose();
		}
	};
	return (
		<>
			<Modal
				as={Modal.Dialog}
				centered
				show={show}
				onHide={handleClose}
				backdrop="static"
			>
				<Modal.Header>
					<Modal.Title className="h6">Confirm Deletion</Modal.Title>
					<Button
						variant="close"
						aria-label="Close"
						onClick={handleClose}
					/>
				</Modal.Header>
				<Modal.Body>
					<p>{`Are you sure you want to delete building number ${data.buildingNumber}?`}</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-primary" onClick={handleClose}>
						Cancel
					</Button>
					<Button
						disabled={loading}
						variant="outline-danger"
						className="ms-auto"
						onClick={handleDelete}
					>
						{loading ? (
							<Spinner animation="border" variant="danger" />
						) : (
							"Confirm"
						)}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default DeleteBuilding;
