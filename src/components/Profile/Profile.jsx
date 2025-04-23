import React from "react";
import { Card, Col, Row, Typography, Avatar, Button } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";

const { Title } = Typography;
export default function Profile({ En = false }) {
	return (
		<>
			<Title level={3} style={{ marginBottom: 24 }} className="fw-bold">
				{En ? "Profile" : "الملف الشخصي"}
			</Title>
			<Row gutter={[16, 16]} style={{ marginTop: 16 }}>
				<Col xs={24} sm={24} lg={24}>
					<Card
						bodyStyle={{ padding: "24px", width: "100%" }}
						className="shadow-sm"
						style={{ borderRadius: "8px" }}
					>
						<div style={{ display: "flex", alignItems: "center" }}>
							<Avatar
								size={64}
								src="https://i.pravatar.cc/150?img=3"
								icon={<UserOutlined />}
							/>
							<div
								style={{
									marginRight: En ? "0" : "16px",
									marginLeft: En ? "16px" : "0",
								}}
							>
								<Title level={4} style={{ margin: 0 }}>
									Yousef Adel
								</Title>
								<Typography.Text type="secondary">
									{En ? "Team Manager" : "مدير الفريق"}
								</Typography.Text>
							</div>
						</div>
					</Card>
				</Col>
				<Col xs={24} sm={24} lg={24}>
					<Card
						bodyStyle={{ padding: "24px", width: "100%" }}
						className="shadow-sm"
						style={{ borderRadius: "8px" }}
					>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								marginBottom: "16px",
							}}
						>
							<Title level={4} style={{ margin: 0 }}>
								{En ? "Personal Information" : "معلومات شخصية"}
							</Title>
							<Button type="text" icon={<EditOutlined />}>
								{En ? "Edit" : "تعديل"}
							</Button>
						</div>

						<Row gutter={[24, 16]}>
							<Col xs={24} md={12}>
								<Typography.Text type="secondary" style={{ display: "block" }}>
									{En ? "First Name" : "الاسم الأول"}
								</Typography.Text>
								<Typography.Text style={{ display: "block", marginTop: "4px" }}>
									Yousef
								</Typography.Text>
							</Col>

							<Col xs={24} md={12}>
								<Typography.Text type="secondary" style={{ display: "block" }}>
									{En ? "Last Name" : "الاسم الأخير"}
								</Typography.Text>
								<Typography.Text style={{ display: "block", marginTop: "4px" }}>
									Adel
								</Typography.Text>
							</Col>

							<Col xs={24} md={12}>
								<Typography.Text type="secondary" style={{ display: "block" }}>
									{En ? "Email address" : "البريد الإلكتروني"}
								</Typography.Text>
								<Typography.Text style={{ display: "block", marginTop: "4px" }}>
									youremail@example.com
								</Typography.Text>
							</Col>

							<Col xs={24} md={12}>
								<Typography.Text type="secondary" style={{ display: "block" }}>
									{En ? "Phone" : "رقم الهاتف"}
								</Typography.Text>
								<Typography.Text style={{ display: "block", marginTop: "4px" }}>
									+XX XXX XXX XX
								</Typography.Text>
							</Col>

							<Col xs={24}>
								<Typography.Text type="secondary" style={{ display: "block" }}>
									{En ? "Bio" : "نبذة"}
								</Typography.Text>
								<Typography.Text style={{ display: "block", marginTop: "4px" }}>
									{En ? "Team Manager" : "مدير الفريق"}
								</Typography.Text>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>
		</>
	);
}
