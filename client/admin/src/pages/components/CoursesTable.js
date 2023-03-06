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

import EditCourse from "./EditCourse";
import DeleteCourse from "./DeleteCourse";

export const CoursesTable = ({ data, removeCourse, updateCourse, searchText, allRecords }) => {
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
					<span className="fw-normal">{props?.name}</span>
				</td>
				<td>
					<span className="fw-normal">{props?.instructor?.firstName} {props?.instructor?.lastName}</span> 
				</td>
				<td>
					<span className="fw-normal">{props?.period?.semester}, {props?.period?.year}</span>
				</td>
				<td>
					<span className="fw-normal">{props?.time?.day}, {props?.time?.startTime}-{props?.time?.endTime} </span>
				</td>
				<td>
					<span className="fw-normal">{props?.location?.building?.buildingNumber}, {props?.location?.room}</span> 
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
								<th className="border-bottom">COURSE NAME</th>
								<th className="border-bottom">COURSE INSTRUCTOR</th>
								<th className="border-bottom">PERIOD</th>
								<th className="border-bottom">TIME</th>
								<th className="border-bottom">LOCATION</th>
							</tr>
						</thead>
						<tbody>
							{
							searchText !== ""? 
							allRecords && allRecords
							.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
							.map((item) => (
								<TableRow key={item._id} {...item} />
							)): data?.map((item) => (
								<TableRow key={item._id} {...item} />
							))
							}
						</tbody>
					</Table>
				</Card.Body>
			</Card>
			<EditCourse
				show={showEditDialog}
				handleClose={handleCloseEdit}
				data={selected}
				updateCourse={updateCourse}
			/>
			<DeleteCourse
				show={showDeleteDialog}
				handleClose={handleCloseDelete}
				data={selected}
				removeCourse={removeCourse}
			/>
		</>
	);
};
