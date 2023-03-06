import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import {
	Col,
	Row,
	Form,
	Card,
	Button,
	FormCheck,
	Container,
	InputGroup,
	Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { Links } from "../../routes";
import axios from "../../api/axios";
import Preloader from "../../components/Preloader";
import useAuth from "../../hooks/useAuth";

export default () => {
	const { setAuth } = useAuth();
	const navigate = useNavigate();
	const [values, setValues] = useState({
		email: "",
		password: "",
		error: "",
		loading: false,
	});

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setValues({ ...values, error: "", loading: true });
		const user = {
			email: values.email || undefined,
			password: values.password || undefined,
		};
		try {
			const response = await axios.post("/v1/admin/login", user);
			setValues({ ...values, error: "", loading: false });
			localStorage.setItem("adauth", JSON.stringify(response.data));
			setAuth(response.data);
			navigate(Links.DashboardOverview.path);
		} catch (err) {
			if (err.response?.status === 401) {
				setValues({
					...values,
					loading: false,
					error: err.response.data,
				});
			} else {
				setValues({ ...values, loading: false });
				console.log("failed to login");
			}
		}
	};

	return (
		<main>
			<Preloader show={values.loading ? true : false} />
			<section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
				<Container>
					<Row className="justify-content-center form-bg-image">
						<Col
							xs={12}
							className="d-flex align-items-center justify-content-center"
						>
							<div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
								<div className="text-center text-md-center mb-4 mt-md-0">
									<h3 className="mb-0">
										Sign in to Dashboard
									</h3>
								</div>
								<Form className="mt-4" onSubmit={handleSubmit}>
									<Form.Group id="email" className="mb-4">
										<Form.Label>Your Email</Form.Label>
										<InputGroup>
											<InputGroup.Text>
												<FontAwesomeIcon
													icon={faEnvelope}
												/>
											</InputGroup.Text>
											<Form.Control
												value={values.email}
												onChange={handleChange("email")}
												autoFocus
												required
												type="text"
												placeholder="Email"
											/>
										</InputGroup>
									</Form.Group>
									<Form.Group>
										<Form.Group
											id="password"
											className="mb-4"
										>
											<Form.Label>
												Your Password
											</Form.Label>
											<InputGroup>
												<InputGroup.Text>
													<FontAwesomeIcon
														icon={faUnlockAlt}
													/>
												</InputGroup.Text>
												<Form.Control
													value={values.password}
													onChange={handleChange(
														"password"
													)}
													required
													type="password"
													placeholder="Password"
												/>
											</InputGroup>
										</Form.Group>
										<div className="d-flex justify-content-between align-items-center mb-4">
											<Card.Link className="small text-end">
												Forgot password?
											</Card.Link>
										</div>
									</Form.Group>
									{values.error && (
										<Alert key="danger" variant="danger">
											{values.error.error}
										</Alert>
									)}

									<Button
										variant="primary"
										type="submit"
										className="w-100"
									>
										Sign in
									</Button>
								</Form>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</main>
	);
};
