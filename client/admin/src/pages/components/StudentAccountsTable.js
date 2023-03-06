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


import EditStudent from "./EditStudent";
import DeleteStudent from "./DeleteStudent";

export const StudentAccontsTable = ({ data, removeStudent, updateStudent, searchText, allRecords }) => {
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
		const { idNumber, firstName, lastName, email, college, major } = props;

		return (
			<tr>
				<td>
					<span className="fw-normal">{idNumber}</span>
				</td>
				<td>
					<span className="fw-normal">{firstName}</span>
				</td>
				<td>
					<span className="fw-normal">{lastName}</span>
				</td>
				<td>
					<span className="fw-normal">{email}</span>
				</td>
				<td>
					<span className="fw-normal">{college}</span>
				</td>
				<td>
					<span className="fw-normal">{major}</span>
				</td>
				<td>
					<span className="fw-normal">{props?.class}</span>
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
								<th className="border-bottom">ID</th>
								<th className="border-bottom">First Name</th>
								<th className="border-bottom">Last Name</th>
								<th className="border-bottom">Email</th>
								<th className="border-bottom">COLLEGE</th>
								<th className="border-bottom">MAJOR</th>
								<th className="border-bottom">CLASS</th>
							</tr>
						</thead>
						<tbody>
							{
								searchText !== "" ?
									allRecords && allRecords
										.filter(item => item.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
											item.lastName.toLowerCase().includes(searchText.toLowerCase()))
										.map((item) => (
											<TableRow key={item._id} {...item} />
										)) : data?.map((item) => (
											<TableRow key={item._id} {...item} />
										))
							}
						</tbody>
					</Table>
				</Card.Body>
			</Card>
			<EditStudent
				show={showEditDialog}
				handleClose={handleCloseEdit}
				data={selected}
				updateStudent={updateStudent}
			/>
			<DeleteStudent
				show={showDeleteDialog}
				handleClose={handleCloseDelete}
				data={selected}
				removeStudent={removeStudent}
			/>
		</>
	);
};
