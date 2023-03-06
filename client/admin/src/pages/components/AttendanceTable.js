import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Table } from 'react-bootstrap';
import { Links } from "../../routes";


export const AttendanceTable = ({ data, searchText, allRecords }) => {
	const navigate = useNavigate();


	const navigateToAttendanceRecordsPage = (item) =>{
		navigate(Links.AttendanceRecords.path, { state: item });
	}

	const TableRow = ({item, onPress}) => {

		return (
			<tr onClick={onPress}>
				<td>
					<span className="fw-normal">{item.idNumber}</span>
				</td>
				<td>
					<span className="fw-normal">{item.firstName}</span>
				</td>
				<td>
					<span className="fw-normal">{item.lastName}</span>
				</td>
				<td>
					<span className="fw-normal">{item.college}</span>
				</td>
				<td>
					<span className="fw-normal">{item.major}</span>
				</td>
				<td>
					<span className="fw-normal">{item.class}</span>
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
											<TableRow key={item._id} item={item} onPress={() => navigateToAttendanceRecordsPage(item)}/>
										)) : data?.map((item) => (
											<TableRow key={item._id} item={item} onPress={() => navigateToAttendanceRecordsPage(item)}/>
										))
							}
						</tbody>
					</Table>
				</Card.Body>
			</Card>
		</>
	);
};
