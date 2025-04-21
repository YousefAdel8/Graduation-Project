import React from "react";
import { Card, Row, Col, Typography } from "antd";
import UserTable from "./UserTable";
import AddNewUser from "./AddNewUser";
const { Title } = Typography;

export default function UserManagment({ En = false }) {
	
	return (
		<>
			<Title level={3} style={{ marginBottom: 24 }} className="fw-bold">
				{En ? "Users" : "المستخدمين"}
			</Title>
			<AddNewUser />
			<Row gutter={[16, 16]} style={{ marginTop: 16 }}>
				<Col xs={24} sm={24} lg={24}>
					<Card
						bodyStyle={{ padding: "0px", width: "100%" }}
						className="shadow-sm"
					>
						<UserTable />
					</Card>
				</Col>
			</Row>
		</>
	);
}
