import { faHome, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component, useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Form, InputGroup } from "react-bootstrap";
import Notifications from "./components/Notifications";
import axios from "../api/axios";
import Preloader from "../components/Preloader";
import NewNotification from "./components/NewNotification";
import CustomPagination from "./components/CustomPagination";

function NotificationsPage() {
	const [notifications, setNotifications] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showCreateDialog, setShowCreateDialog] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
	const jwt = JSON.parse(localStorage.getItem("adauth"));
	const token = jwt.token;

	const handleClose = () => {
		setShowCreateDialog(false);
	};

	const appendNotification = (data) => {
		let notificationsCopy = notifications;
		notificationsCopy = [...notificationsCopy, data];
		setNotifications(notificationsCopy);
	};

	useEffect(() => {
		setLoading(true);
		axios
			.get("/v1/admin/notifications", { headers : {"Authorization" : `Bearer ${token}`}})
			.then((results) => {
				setNotifications(results.data);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				console.log(error);
			});
	}, []);

	const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = notifications.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(notifications.length / recordsPerPage);
	return (
		<>
			<Preloader show={loading ? true : false} />
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
				<div className="d-block mb-4 mb-md-0">
					<Breadcrumb
						className="d-none d-md-inline-block"
						listProps={{
							className: "breadcrumb-dark breadcrumb-transparent",
						}}
					>
						<Breadcrumb.Item>
							<FontAwesomeIcon icon={faHome} />
						</Breadcrumb.Item>
						<Breadcrumb.Item>Feedback</Breadcrumb.Item>
						<Breadcrumb.Item active>Notifications</Breadcrumb.Item>
					</Breadcrumb>
					<h4>Feedback</h4>
					<p className="mb-0">Notifications sent by the admin</p>
				</div>
				<div className="btn-toolbar mb-2 mb-md-0">
					<Button
						variant="outline-primary"
						className="m-1"
						onClick={() => setShowCreateDialog(true)}
					>
						<FontAwesomeIcon icon={faPlus} className="me-2" />
						New
					</Button>
				</div>
			</div>
			<Card
				border="light"
				className="table-wrapper table-responsive shadow-sm"
			>
				<Card.Body>
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>Search by notification title</Form.Label>
							<InputGroup>
							<InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
							<Form.Control type="text" placeholder="Search" onChange={(e) => setSearchText(e.target.value)}/>
							</InputGroup>
						</Form.Group>
					</Form>
					<Notifications 
						title="Notifications" 
						show={false} 
						notifications={currentRecords}
						searchText={searchText}
						allRecords={notifications} />
					<CustomPagination
						nPages={nPages}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
				</Card.Body>
			</Card>

			<NewNotification
				show={showCreateDialog}
				handleClose={handleClose}
				appendNotification={appendNotification}
			/>
		</>
	);
}

export default NotificationsPage;
