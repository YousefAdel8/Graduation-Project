import React, { useState, useEffect } from "react";
import {
	Card,
	Col,
	Row,
	Typography,
	Avatar,
	Button,
	Modal,
	message,
} from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import EditProfile from "./EditProfile";
import { useLanguage } from "../../context/LanguageContext";
import axios from "axios";
import ChangePasswordModal from "./ChangePasswordModal";

const { Title, Text } = Typography;

export default function Profile() {
	const { isEnglish: En } = useLanguage();
	const [profileData, setProfileData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		roles: [],
		image: "https://i.pravatar.cc/150?img=3",
	});
	const [loading, setLoading] = useState(true);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

	useEffect(() => {
		fetchProfileData();
	}, []);

	const fetchProfileData = async () => {
		try {
			const token = localStorage.getItem("userToken");
			if (!token) {
				throw new Error("No authentication token found");
			}

			const response = await axios.get(
				"https://cms-reporting.runasp.net/api/users/profile",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log("Profile data fetched:", response.data);

			setProfileData({
				...response.data,
				phone: response.data.phoneNumber || "",
				role: response.data.roles?.join(", ") || "",
			});
		} catch (error) {
			console.error("Error fetching profile data:", error);
			message.error(En ? "Failed to load profile" : "فشل تحميل الملف الشخصي");
		} finally {
			setLoading(false);
		}
	};

	const handleEditProfile = () => {
		setIsEditOpen(true);
	};

	const handleCancel = () => {
		setIsEditOpen(false);
	};

	const handleOk = async () => {
		setIsEditOpen(false);
		await fetchProfileData(); // Refresh data after edit
	};
	const handlePasswordEdit = () => {
		setIsPasswordModalOpen(true);
	};

	const userName = `${profileData.firstName} ${profileData.lastName}`;

	return (
		<>
			<Title level={3} style={{ marginBottom: 24 }} className="fw-bold">
				{En ? "Profile" : "الملف الشخصي"}
			</Title>

			{loading ? (
				<Card loading={true} />
			) : (
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
									<Text type="secondary">{profileData.role}</Text>
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
								<div className="d-flex gap-2">
									<Button
										type="text"
										icon={<EditOutlined />}
										onClick={handleEditProfile}
										style={{
											color: "#1890ff",
											border: "1px solid #1890ff",
											borderRadius: "6px",
											padding: "4px 12px",
											height: "auto",
											display: "flex",
											alignItems: "center",
											gap: "6px",
											fontWeight: 500,
										}}
									>
										{En ? "Edit" : "تعديل"}
									</Button>
									<Button
										type="text"
										icon={<EditOutlined />}
										onClick={handlePasswordEdit}
										style={{
											color: "#52c41a",
											border: "1px solid #52c41a",
											borderRadius: "6px",
											padding: "4px 12px",
											height: "auto",
											display: "flex",
											alignItems: "center",
											gap: "6px",
											fontWeight: 500,
										}}
									>
										{En ? "Edit Password" : "تعديل كلمة المرور"}
									</Button>
								</div>
							</div>

							<Row gutter={[24, 16]}>
								<Col xs={24} md={12}>
									<Text type="secondary" style={{ display: "block" }}>
										{En ? "First Name" : "الاسم الأول"}
									</Text>
									<Text style={{ display: "block", marginTop: "4px" }}>
										{profileData.firstName}
									</Text>
								</Col>

								<Col xs={24} md={12}>
									<Text type="secondary" style={{ display: "block" }}>
										{En ? "Last Name" : "الاسم الأخير"}
									</Text>
									<Text style={{ display: "block", marginTop: "4px" }}>
										{profileData.lastName}
									</Text>
								</Col>

								<Col xs={24} md={12}>
									<Text type="secondary" style={{ display: "block" }}>
										{En ? "Email address" : "البريد الإلكتروني"}
									</Text>
									<Text style={{ display: "block", marginTop: "4px" }}>
										{profileData.email}
									</Text>
								</Col>

								<Col xs={24} md={12}>
									<Text type="secondary" style={{ display: "block" }}>
										{En ? "Phone" : "رقم الهاتف"}
									</Text>
									<Text style={{ display: "block", marginTop: "4px" }}>
										{profileData.phone}
									</Text>
								</Col>

								<Col xs={24}>
									<Text type="secondary" style={{ display: "block" }}>
										{En ? "Role" : "الدور"}
									</Text>
									<Text style={{ display: "block", marginTop: "4px" }}>
										{profileData.role}
									</Text>
								</Col>
							</Row>
						</Card>
					</Col>
				</Row>
			)}

			<Modal
				title={En ? "Edit Profile" : "تعديل الملف الشخصي"}
				open={isEditOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				okText={En ? "Submit" : "إرسال"}
				cancelText={En ? "Cancel" : "إلغاء"}
				footer={null}
				width={800}
			>
				<EditProfile
					En={En}
					initialValues={profileData}
					onCancel={handleCancel}
					onSuccess={handleOk}
				/>
			</Modal>
			<ChangePasswordModal
				visible={isPasswordModalOpen}
				onCancel={() => setIsPasswordModalOpen(false)}
				onSuccess={() => {
					setIsPasswordModalOpen(false);
					message.success(
						En ? "Password changed successfully" : "تم تغيير كلمة المرور بنجاح"
					);
				}}
				En={En}
			/>
		</>
	);
}
