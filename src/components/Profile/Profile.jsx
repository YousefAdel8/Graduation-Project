import React, { useState } from "react";
import { Card, Col, Row, Typography, Avatar, Button, Modal } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import EditProfile from "./EditProfile";

const { Title } = Typography;
export default function Profile({ En = false }) {
	const profileData = {
		firstName: "Yousef",
		lastName: "Adel",
		email: "yousefadel7474@gmail",
		phone: "01028228362",
		role: "Team Manager",
		image: "https://i.pravatar.cc/150?img=3",
	};
	const userName = profileData.firstName + " " + profileData.lastName;
	const [isEditOpen, setIsEditOpen] = useState(false);

	const handleEditProfile = () => {
		setIsEditOpen(true);
	};

	const handleCancel = () => {
		setIsEditOpen(false);
	};

	const handleOk = () => {
		setIsEditOpen(false);
	};
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
								src={profileData.image}
								icon={<UserOutlined />}
							/>
							<div
								style={{
									marginRight: En ? "0" : "16px",
									marginLeft: En ? "16px" : "0",
								}}
							>
								<Title level={4} style={{ margin: 0 }}>
									{userName}
								</Title>
								<Typography.Text type="secondary">
									{profileData.role}
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
							<Button
								type="text"
								icon={<EditOutlined />}
								onClick={handleEditProfile}
							>
								{En ? "Edit" : "تعديل"}
							</Button>
						</div>

						<Row gutter={[24, 16]}>
							<Col xs={24} md={12}>
								<Typography.Text type="secondary" style={{ display: "block" }}>
									{En ? "First Name" : "الاسم الأول"}
								</Typography.Text>
								<Typography.Text style={{ display: "block", marginTop: "4px" }}>
									{profileData.firstName}
								</Typography.Text>
							</Col>

							<Col xs={24} md={12}>
								<Typography.Text type="secondary" style={{ display: "block" }}>
									{En ? "Last Name" : "الاسم الأخير"}
								</Typography.Text>
								<Typography.Text style={{ display: "block", marginTop: "4px" }}>
									{profileData.lastName}
								</Typography.Text>
							</Col>

							<Col xs={24} md={12}>
								<Typography.Text type="secondary" style={{ display: "block" }}>
									{En ? "Email address" : "البريد الإلكتروني"}
								</Typography.Text>
								<Typography.Text style={{ display: "block", marginTop: "4px" }}>
									{profileData.email}
								</Typography.Text>
							</Col>

							<Col xs={24} md={12}>
								<Typography.Text type="secondary" style={{ display: "block" }}>
									{En ? "Phone" : "رقم الهاتف"}
								</Typography.Text>
								<Typography.Text style={{ display: "block", marginTop: "4px" }}>
									{profileData.phone}
								</Typography.Text>
							</Col>

							<Col xs={24}>
								<Typography.Text type="secondary" style={{ display: "block" }}>
									{En ? "Role" : "الدور"}
								</Typography.Text>
								<Typography.Text style={{ display: "block", marginTop: "4px" }}>
									{profileData.role}
								</Typography.Text>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>
			<Modal
				title={En ? "Edit Profile" : "تعديل الملف الشخصي"}
				open={isEditOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				okText={En ? "Submit" : "إرسال"}
				cancelText={En ? "Cancel" : "إلغاء"}
			>
				<EditProfile En={En} initialValues={profileData} />
			</Modal>
		</>
	);
}
