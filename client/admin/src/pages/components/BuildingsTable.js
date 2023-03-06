import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEdit,
	faEllipsisH,
	faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
	Card,
	Button,
	Table,
	Dropdown,
	ButtonGroup,
} from "react-bootstrap";

import EditBuilding from "./EditBuilding";
import DeleteBuilding from "./DeleteBuilding";

export const BuildingsTable = ({ data, removeBuilding, updateBuilding, searchText, allRecords }) => {
	const [showEditDialog, setShowEditDialog] = useState(false);
	const [selected, setSelected] = useState({});
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);


	const handleCloseEdit = () => {
		setShowEditDialog(false);
	};

	const handleCloseDelete = () => {
		setShowDeleteDialog(false);
	};


	const TableRow = (props) => {

		return (
			<tr>
				<td>
					<span className="fw-normal">{props?.buildingNumber}</span>
				</td>
				<td>
					<span className="fw-normal">Latitude: {props?.coordinates?.lat}, Longitude: {props?.coordinates?.lng}</span> 
				</td>
				<td>
					<Dropdown as={ButtonGroup}>
						<Dropdown.Toggle
							as={Button}
							split
							variant="link"
							className="text-dark m-0 p-0"
						>
							<span className="icon icon-sm">
								<FontAwesomeIcon
									icon={faEllipsisH}
									className="icon-dark"
								/>
							</span>
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item
								onClick={() => {
									setSelected(props);
									setShowEditDialog(true);
								}}
							>
								<FontAwesomeIcon
									icon={faEdit}
									className="me-2"
								/>{" "}
								Edit
							</Dropdown.Item>
							<Dropdown.Item
								className="text-danger"
								onClick={() => {
									setSelected(props);
									setShowDeleteDialog(true);
								}}
							>
								<FontAwesomeIcon
									icon={faTrashAlt}
									className="me-2"
								/>{" "}
								Remove
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</td>
			</tr>
		);
	};

	return (
		<>
			<Card
				style={{ minHeight: "50vh" }}
				border="light"
				className="table-wrapper table-responsive shadow-sm"
			>
				<Card.Body className="pt-0">
					<Table hover className="user-table align-items-center">
						<thead>
							<tr>
								<th className="border-bottom">BUILDING NUMBER</th>
								<th className="border-bottom">COORDINATES</th>
							</tr>
						</thead>
						<tbody>
							{
							searchText !== ""? 
							allRecords && allRecords
							.filter(item => item.buildingNumber == searchText)
							.map((item) => (
								<TableRow key={item._id} {...item} />
							)): data?.sort((a,b) => a-b).map((item) => (
								<TableRow key={item._id} {...item} />
							))
							}
						</tbody>
					</Table>
				</Card.Body>
			</Card>
			<EditBuilding
				show={showEditDialog}
				handleClose={handleCloseEdit}
				data={selected}
				updateBuilding={updateBuilding}
			/>
			<DeleteBuilding
				show={showDeleteDialog}
				handleClose={handleCloseDelete}
				data={selected}
				removeBuilding={removeBuilding}
			/>
		</>
	);
};
