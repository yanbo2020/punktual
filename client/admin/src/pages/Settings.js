import React from "react";
import { Col, Row } from "react-bootstrap";
import { ChoosePhotoWidget } from "./components/Widgets";

import ProfileImg from "../assets/img/profile.png";
import ProfileInfo from "./components/ProfileInfo";
import UpdateProfile from "./components/UpdateProfile";

export default function Profile() {
	return (
		<>
			<div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center py-4">
				<Row>
					<Col xs={12} xl={4}>
						<ProfileInfo />
						<Col xs={12}>
							<ChoosePhotoWidget
								title="Select profile photo"
								photo={ProfileImg}
							/>
						</Col>
					</Col>

					<Col xs={12} xl={8}>
						<UpdateProfile />
					</Col>

					<Col xs={12} xl={4}>
						<Row>
							{/**<Col xs={12}>
								<ProfileCardWidget />
							</Col>*/}
						</Row>
					</Col>
				</Row>
			</div>
		</>
	);
}
