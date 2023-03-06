import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb, Card, Button, Form, InputGroup } from "react-bootstrap";
import axios from "../api/axios";
import { AdminAccontsTable } from "./components/AdminAccountsTable";
import NewAdmin from "./components/NewAdmin";
import Preloader from "../components/Preloader";
import CustomPagination from "./components/CustomPagination";

function AdminAccounts() {
	const [admins, setAdmins] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showCreateDialog, setShowCreateDialog] = useState(false);
	const jwt = JSON.parse(localStorage.getItem("adauth"));
	const token = jwt.token;
	const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
	const [ searchText, setSearchText ] = useState("");

	const handleClose = () => {
		setShowCreateDialog(false);
	};

	const appendAdmin = (data) => {
		let adminsCopy = admins;
		adminsCopy = [...adminsCopy, data];
		setAdmins(adminsCopy);
	};

	const updateAdmin = (id, data) => {
		let adminsCopy = currentRecords;
		let index = adminsCopy.findIndex((item) => item._id === id);
		let selected = adminsCopy[index];
		selected = { ...selected, ...data };

		adminsCopy[index] = selected;
		setAdmins(adminsCopy);
	};

	const removeAdmin = (id) => {
		let adminsCopy = admins;
		const filtered = adminsCopy.filter((item) => item._id !== id);
		setAdmins(filtered);
	};

	useEffect(() => {
		setLoading(true);
		axios
			.get("v1/admin/admins", { headers: {"Authorization" : `Bearer ${token}`}})
			.then((result) => {
				setLoading(false);
				setAdmins(result.data);
			})
			.catch((error) => {
				console.log("Here lies the error.")
				console.log(error);
			});
	}, []);

	const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = admins.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(admins.length / recordsPerPage);

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
						<Breadcrumb.Item>Staff</Breadcrumb.Item>
						<Breadcrumb.Item active>Admins</Breadcrumb.Item>
					</Breadcrumb>
					<h4>Staff</h4>
					<p className="mb-0">The Admin Accounts</p>
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
							<Form.Label>Search by admin name</Form.Label>
							<InputGroup>
							<InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
							<Form.Control type="text" placeholder="Search" onChange={(e) => setSearchText(e.target.value)}/>
							</InputGroup>
						</Form.Group>
					</Form>
					<AdminAccontsTable
						data={currentRecords}
						removeAdmin={removeAdmin}
						updateAdmin={updateAdmin}
						searchText={searchText}
						allRecords={admins}
					/>
					<CustomPagination
						nPages={nPages}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
				</Card.Body>
			</Card>
			<NewAdmin
				show={showCreateDialog}
				handleClose={handleClose}
				appendAdmin={appendAdmin}
			/>
		</>
	);
}

export default AdminAccounts;
