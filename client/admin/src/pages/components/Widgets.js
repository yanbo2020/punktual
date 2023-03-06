import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { Card, Row, Col, Image } from "react-bootstrap";

export const ChoosePhotoWidget = (props) => {
	const { title, photo } = props;

	return (
		<Card border="light" className="bg-white shadow-sm mb-4">
			<Card.Body>
				<h5 className="mb-4">{title}</h5>
				<div className="d-xl-flex align-items-center">
					<div className="user-avatar xl-avatar">
						<Image fluid rounded src={photo} />
					</div>
					<div className="file-field">
						<div className="d-flex justify-content-xl-center ms-xl-3">
							<div className="d-flex">
								<span className="icon icon-md">
									<FontAwesomeIcon
										icon={faPaperclip}
										className="me-3"
									/>
								</span>
								<input type="file" />
								<div className="d-md-block text-start">
									<div className="fw-normal text-dark mb-1">
										Choose Image
									</div>
									<div className="text-gray small">
										JPG, GIF or PNG. Max size of 800K
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Card.Body>
		</Card>
	);
};

export const CounterWidget = (props) => {
	const { icon, iconColor, category, title, period, percentage } = props;
	const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
	const percentageColor = percentage < 0 ? "text-danger" : "text-success";
/** 
	const formatPeriod = (period) => {
		const from = format(new Date(period?.from), "MMM dd");
		const to = format(new Date(period?.to), "MMM dd");

		return `${from} - ${to}`;
	};

	const time = formatPeriod(period);
*/
	return (
		<Card border="light" className="shadow-sm">
			<Card.Body>
				<Row className="d-block d-xl-flex align-items-center">
					<Col
						xl={5}
						className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0"
					>
						<div
							className={`icon icon-shape icon-md icon-${iconColor} rounded me-4 me-sm-0`}
						>
							<FontAwesomeIcon icon={icon} />
						</div>
						<div className="d-sm-none">
							<h5>{category}</h5>
							<h3 className="mb-1">{title}</h3>
						</div>
					</Col>
					<Col xs={12} xl={7} className="px-xl-0">
						<div className="d-none d-sm-block">
							<h5>{category}</h5>
							<h4 className="mb-1">{title}</h4>
						</div>
						<small>{period}</small>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
};