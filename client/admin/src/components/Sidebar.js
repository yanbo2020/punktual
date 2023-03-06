import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBook,
	faAddressCard,
	faSignOutAlt,
	faTimes,
	faAddressBook,
	faIdBadge,
} from "@fortawesome/free-solid-svg-icons";
import {
	Nav,
	Badge,
	Image,
	Button,
	Dropdown,
	Accordion,
	Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { Links } from "../routes";
import useAuth from "../hooks/useAuth";

const Sidebar = (props = {}) => {
	const location = useLocation();
	const { pathname } = location;
	const [show, setShow] = useState(false);
	const showClass = show ? "show" : "";
	const { auth, setAuth } = useAuth();

	const onCollapse = () => setShow(!show);

	const handleLogout = () => {
		localStorage.removeItem("adauth");
		setAuth({});
	};

	const CollapsableNavItem = (props) => {
		const { eventKey, title, icon, children = null } = props;
		const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

		return (
			<Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
				<Accordion.Item eventKey={eventKey}>
					<Accordion.Button
						as={Nav.Link}
						className="d-flex justify-content-between align-items-center"
					>
						<span>
							<span className="sidebar-icon">
								<FontAwesomeIcon icon={icon} />{" "}
							</span>
							<span className="sidebar-text">{title}</span>
						</span>
					</Accordion.Button>
					<Accordion.Body className="multi-level">
						<Nav className="flex-column">{children}</Nav>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		);
	};

	const NavItem = (props) => {
		const {
			title,
			link,
			external,
			target,
			icon,
			image,
			badgeText,
			badgeBg = "secondary",
			badgeColor = "primary",
		} = props;
		const classNames = badgeText
			? "d-flex justify-content-start align-items-center justify-content-between"
			: "";
		const navItemClassName = link === pathname ? "active" : "";
		const linkProps = external ? { href: link } : { as: Link, to: link };

		return (
			<Nav.Item
				className={navItemClassName}
				onClick={() => setShow(false)}
			>
				<Nav.Link {...linkProps} target={target} className={classNames}>
					<span>
						{icon ? (
							<span className="sidebar-icon">
								<FontAwesomeIcon icon={icon} />{" "}
							</span>
						) : null}
						{image ? (
							<Image
								src={image}
								width={60}
								height={60}
								className="sidebar-icon svg-icon"
							/>
						) : null}

						<span className="sidebar-text">{title}</span>
					</span>
					{badgeText ? (
						<Badge
							pill
							bg={badgeBg}
							text={badgeColor}
							className="badge-md notification-count ms-2"
						>
							{badgeText}
						</Badge>
					) : null}
				</Nav.Link>
			</Nav.Item>
		);
	};

	return (
		<>
			<Navbar
				expand={false}
				collapseOnSelect
				variant="dark"
				className="navbar-theme-primary px-4 d-md-none"
			>
				<Navbar.Brand
					className="me-lg-5"
					as={Link}
					to={Links.DashboardOverview.path}
				>
					<Image
						src="/logo-circ.png"
						className="navbar-brand-light"
					/>
				</Navbar.Brand>
				<Navbar.Toggle
					as={Button}
					aria-controls="main-navbar"
					onClick={onCollapse}
				>
					<span className="navbar-toggler-icon" />
				</Navbar.Toggle>
			</Navbar>
			<CSSTransition
				timeout={300}
				in={show}
				classNames="sidebar-transition"
			>
				<SimpleBar
					className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}
				>
					<div className="sidebar-inner px-4 pt-3">
						<div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
							<div className="d-flex align-items-center">
								<div className="user-avatar lg-avatar me-4">
									<Image
										src="/logo-circ.png"
										className="card-img-top rounded-circle border-white"
									/>
								</div>
								<div className="d-block">
									<h6>Hi, {auth?.user?.firstName}</h6>
									<Button
										variant="secondary"
										size="xs"
										onClick={handleLogout}
										className="text-dark"
									>
										<FontAwesomeIcon
											icon={faSignOutAlt}
											className="me-2"
										/>{" "}
										Sign Out
									</Button>
								</div>
							</div>
							<Nav.Link
								className="collapse-close d-md-none"
								onClick={onCollapse}
							>
								<FontAwesomeIcon icon={faTimes} />
							</Nav.Link>
						</div>
						<Nav className="flex-column pt-3 pt-md-0">
							<NavItem
								title="Punktual Admin"
								link={Links.DashboardOverview.path}
								image="/logo-circ.png"
							/>

							<CollapsableNavItem
								eventKey="students/"
								title="Students"
								icon={faAddressCard}
							>
								<NavItem
									title="All Students"
									link={Links.StudentsAccounts.path}
								/>
							</CollapsableNavItem>

							<CollapsableNavItem
								eventKey="course/"
								title="Course"
								icon={faBook}
							>
								<NavItem
									title="Courses"
									link={Links.Courses.path}
								/>
								<NavItem
									title="Buildings"
									link={Links.Buildings.path}
								/>
								<NavItem
									title="Attendance"
									link={Links.StudentsAttendance.path}
								/>
							</CollapsableNavItem>
							<Dropdown.Divider className="my-3 border-indigo" />
							<CollapsableNavItem
								eventKey="feedback/"
								title="Feedback"
								icon={faAddressBook}
							>
								<NavItem
									title="Notifications"
									link={Links.Notifications.path}
								/>
							</CollapsableNavItem>
							<CollapsableNavItem
								eventKey="staff/"
								title="Staff"
								icon={faIdBadge}
							>
								<NavItem
									title="Admins"
									link={Links.AdminAccounts.path}
								/>
								<NavItem
									title="Teachers"
									link={Links.TeacherAccounts.path}
								/>
							</CollapsableNavItem>
						</Nav>
					</div>
				</SimpleBar>
			</CSSTransition>
		</>
	);
};

export default Sidebar;
