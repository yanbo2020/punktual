import React from "react";
import { Col, Row, Card, Form } from "react-bootstrap";

import useAuth from "../../hooks/useAuth";

function ProfileInfo() {
	const { auth } = useAuth();

	return (
		<Card border="light" className="bg-white shadow-sm mb-4">
			<Card.Body>
				<h5 className="mb-4">General information</h5>
				<Form>
					<Row>
						<Col md={12} className="mb-4">
							<Form.Group id="firstName">
								<Form.Label>Name:</Form.Label> <br />
								<span>{auth?.admin?.firstName} </span>
								<span>{auth?.admin?.lastName} </span>
							</Form.Group>
						</Col>
					</Row>
					<Row className="align-items-center">
						<Col md={12} className="mb-3">
							<Form.Group id="gender">
								<Form.Label>Email:</Form.Label> <br />
								<span>{auth?.admin?.email}</span>
							</Form.Group>
						</Col>
					</Row>
				</Form>
			</Card.Body>
		</Card>
	);
}

export default ProfileInfo;
