import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb, Card, Button, Form, InputGroup } from "react-bootstrap";
import axios from "../api/axios";
import { BuildingsTable } from "./components/BuildingsTable";
import NewBuilding from "./components/NewBuilding";
import Preloader from "../components/Preloader";
import CustomPagination from "./components/CustomPagination";

function Buildings() {
	const [buildings, setBuildings] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showCreateDialog, setShowCreateDialog] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
	const [ searchText, setSearchText ] = useState("");

	const handleClose = () => {
		setShowCreateDialog(false);
	};

	const appendBuilding = (data) => {
		let buildingsCopy = buildings;
		buildingsCopy = [...buildingsCopy, data];
		setBuildings(buildingsCopy);
	};

	const updateBuilding = (id, data) => {
		let buildingsCopy = currentRecords;
		let index = buildingsCopy.findIndex((item) => item._id === id);
		let selected = buildingsCopy[index];
		selected = { ...selected, ...data };

		buildingsCopy[index] = selected;
		setBuildings(buildingsCopy);
	};

	const removeBuilding = (id) => {
		let buildingsCopy = buildings;
		const filtered = buildingsCopy.filter((item) => item._id !== id);
		setBuildings(filtered);
	};

	useEffect(() => {
		setLoading(true);
		const jwt = JSON.parse(localStorage.getItem("adauth"));
		const token = jwt.token;
		axios
			.get("v1/admin/buildings", { headers: {"Authorization" : `Bearer ${token}`}})
			.then((result) => {
				setLoading(false);
				setBuildings(result.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = buildings.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(buildings.length / recordsPerPage);

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
						<Breadcrumb.Item>Course</Breadcrumb.Item>
						<Breadcrumb.Item active>Buildings</Breadcrumb.Item>
					</Breadcrumb>
					<h4>Buildings</h4>
					<p className="mb-0">The Buildings Records</p>
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
							<Form.Label>Search by building number</Form.Label>
							<InputGroup>
							<InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
							<Form.Control type="text" placeholder="Search" onChange={(e) => setSearchText(e.target.value)}/>
							</InputGroup>
						</Form.Group>
					</Form>
					<BuildingsTable
						data={currentRecords}
						removeBuilding={removeBuilding}
						updateBuilding={updateBuilding}
						searchText={searchText}
						allRecords={buildings}
					/>
					<CustomPagination
					nPages={nPages}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
				</Card.Body>
			</Card>
			<NewBuilding
				show={showCreateDialog}
				handleClose={handleClose}
				appendBuilding={appendBuilding}
			/>
		</>
	);
}

export default Buildings;
