import { formatDistance } from "date-fns";
import React, { useState } from "react";
import { Button, Card, Col, ListGroup, Row, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Links } from "../../routes";

function Notifications({ title, show, notifications, searchText, allRecords }) {
	const [ showNotificationModal, setShowNotificationModal ] = useState(false);
	const [ notification, setNotification ] = useState();
	
	const formatTime = (date) => {
		if (date) {
			return formatDistance(new Date(date), new Date()) + " ago";
		} else return "";
	};

	const handleClick = (notification) => {
		setShowNotificationModal(true);
		setNotification(notification);
	};

	const handleClose = () => {
		setShowNotificationModal(false);
	};
	const NotificationModal = ({notification, showNotificationModal, handleClose}) => {
		return (
			<React.Fragment>
				<Modal
					as={Modal.Dialog}
					centered
					show={showNotificationModal}
					onHide={handleClose}
					backdrop="static"
				>
					<Modal.Header>
						<Modal.Title className="h6"> {notification?.title}</Modal.Title>
						<Button
						variant="close"
						aria-label="Close"
						onClick={handleClose}
					/>
					</Modal.Header>
					<Modal.Body>
						<p>{notification?.text}</p>
					</Modal.Body>
					<Modal.Footer>
						<div className="small">Created at: {notification?.createdAt}</div>
					</Modal.Footer>
				</Modal>
			</React.Fragment>
		);
	};

	const Notification = ({ notification, onPress }) => {
		return (
			<ListGroup.Item action className="border-bottom border-light">
				<Row className="align-items-center" onClick={onPress}>
					<Col className="ps-0 ms--2">
						<div className="d-flex justify-content-between align-items-center">
							<div>
								<h4 className="h6 mb-0 text-small">
									{notification?.title}
								</h4>
							</div>
							<div className="text-end">
								<small>{formatTime(notification?.createdAt)}</small>
							</div>
						</div>
						<p className="font-small mt-1 mb-0">{notification?.text}</p>
					</Col>
				</Row>
			</ListGroup.Item>
		);
	};
	return (
		<Card border="light" className="shadow-sm">
			{show && (
				<Card.Header>
					<Row className="align-items-center">
						<Col>
							<h5>{title}</h5>
						</Col>
						{show && (
							<Col className="text-end">
								<Link to={Links.Notifications.path}>
									<Button variant="secondary" size="sm">
										See all
									</Button>
								</Link>
							</Col>
						)}
					</Row>
				</Card.Header>
			)}

			<ListGroup className="list-group p-2">
				{
					searchText !== "" ?
						allRecords && allRecords
							.filter(item => item.title.toLowerCase().includes(searchText === undefined ? "" : searchText.toLowerCase()))
							.map((notification) => (
								<Notification key={notification._id} notification={notification} onPress={() => { handleClick(notification) }} />
							)) : notifications?.map((notification) => (
								<Notification key={notification._id} notification={notification} onPress={() => { handleClick(notification) }} />
							))
				}
				<NotificationModal notification={notification} showNotificationModal={showNotificationModal} handleClose={handleClose}/>
			</ListGroup>
		</Card>
	);
}

export default Notifications;
