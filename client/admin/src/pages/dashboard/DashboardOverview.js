import React, { useEffect, useState } from "react";
import { faChalkboardTeacher, faGraduationCap, faUser } from "@fortawesome/free-solid-svg-icons";
import { Card, Col, Row } from "react-bootstrap";
import { CounterWidget } from "../components/Widgets";
import Notifications from "../components/Notifications";
import axios from "../../api/axios";
import Preloader from "../../components/Preloader";
import CustomCharts from '../components/CustomCharts';


const DashboardOverview = () => {
	const [students, setStudents] = useState({});
	const [notifications, setNotifications] = useState([]);
	const [teachers, setTeachers] = useState([]);
	const [admins, setAdmins] = useState([]);
	const [loading, setLoading] = useState(true);
	const jwt = JSON.parse(localStorage.getItem("adauth"));
	const token = jwt.token;
	const date = new Date();
	const academic_year = ""+date.getFullYear()+"-"+(date.getFullYear()+1);
	const [ chartData, setChartData ] = useState([]);


	useEffect(() => {
		axios
			.get("/v1/admin/dashboard", { headers : {"Authorization" : `Bearer ${token}`}})
			.then((result) => {
				setLoading(false);
				setStudents(result.data.students);
				setTeachers(result.data.teachers);
				setAdmins(result.data.admins);
				setNotifications(result.data?.recentNotifications);
				setChartData([
					 {
						name: "admins",
					 	number: result.data.admins
					 },
					 {
						name: "teachers",
						number: result.data.teachers
					 },
					 {
						name: "students",
						number: result.data.students
					 },
				]);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	}, []);

	return (
		<>
			<Preloader show={loading ? true : false} />
			{!loading && (
				<Row className="justify-content-md-center py-4">
					<Col xs={12} sm={12} xl={4} className="mb-4">
						<CounterWidget
							category="Registered Students"
							title={parseInt(students).toLocaleString()}
							period={academic_year}
							percentage={50}
							icon={faGraduationCap}
							iconColor="shape-secondary"
						/>
					</Col>
					
					<Col xs={12} sm={12} xl={4} className="mb-4">
						<CounterWidget
							category="Registered Teachers"
							title={parseInt(teachers).toLocaleString()}
							period={academic_year}
							percentage={1500.0}
							icon={faChalkboardTeacher}
							iconColor="shape-tertiary"
						/>
					</Col>
					
					<Col xs={12} sm={12} xl={4} className="mb-4">
						<CounterWidget
							category="Registered Admins"
							title={parseInt(admins).toLocaleString()}
							period={academic_year}
							percentage={2800.4}
							icon={faUser}
							iconColor="shape-tertiary"
						/>
					</Col>
				</Row>
			)} 
			<Row>
				<Col xs={12} xl={4} className="mb-4">
					<Notifications
						title="Recent Notifications"
						show={true}
						notifications={notifications}
						searchText={""}
						allRecords={""}
					/>
				</Col>
				<Col>
					<Card>
					<CustomCharts data={chartData}/>
					</Card>
				</Col>
				<Col>
					
				</Col>
			</Row>
		</>
	);
};

export default DashboardOverview;
