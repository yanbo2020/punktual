import React from "react";
import moment from "moment-timezone";
import { Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default (props) => {
	const currentYear = moment().get("year");

	return (
		<div>
			<footer className="footer section py-5">
				<Row>
					<Col xs={12} lg={6} className="mb-4 mb-lg-0">
						<p className="mb-0 text-center text-xl-left">
							Copyright © 2020-{`${currentYear} `}
							<Card.Link
								href="/"
								target="_blank"
								className="text-blue text-decoration-none fw-normal"
							>
								Punktual
							</Card.Link>
						</p>
					</Col>
				</Row>
			</footer>
		</div>
	);
};
