import React, { useEffect } from "react";
import {
	Card,
	Row,
	Col,
	Form,
	message,
	Input,
	Button,
	Select,
	Typography,
	Space,
	Divider,
	theme,
} from "antd";
import {
	UserOutlined,
	MailOutlined,
	LockOutlined,
	TeamOutlined,
	SaveOutlined,
} from "@ant-design/icons";
import { useLanguage } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import postUserApi from "./PostUserApi";
const { Title, Text } = Typography;
export default function NewUser({
	selectedItemforEdit = null,
	form: externalForm = null,
	hideSubmitButton = false,
	hidePassword = false,
	hideEmail = false,
	hideRole = false,
	hideName = false,
}) {
	const navigate = useNavigate();
	const [localForm] = Form.useForm();
	const { token } = theme.useToken();
	const { isEnglish: En } = useLanguage();
	const roles = ["Dashboard", "Emergency", "Manager", "Admin"].map((role) => ({
		label: role,
		value: role,
	}));

	const formInstance = externalForm || localForm;
	const [messageApi, contextHolder] = message.useMessage();
	

	const onFinish = async (values) => {
		console.log("Form values:", values);
		const result = await postUserApi(values);
		console.log("Result from1111:", result);

		if (result === "User created successfully") {
			messageApi.success(
				En ? "User created successfully" : "تم انشاء المستخدم بنجاح"
			);
			formInstance.resetFields();
			setTimeout(() => {
				navigate("/users");
			}, 1000);
		} else {
			messageApi.error(En ? "User creation failed" : "فشل انشاء المستخدم");
		}
	};

	useEffect(() => {
		if (selectedItemforEdit) {
			formInstance.setFieldsValue(selectedItemforEdit);
		}
	}, [selectedItemforEdit, formInstance]);

	return (
		<>
			{contextHolder}
			<div style={{ margin: "0 auto" }}>
				{/* Form Section */}
				<Card>
					<Form
						form={formInstance}
						layout="vertical"
						onFinish={onFinish}
						size="large"
					>
						{/* Personal Information Section */}
						{!hideName && (
							<div style={{ marginBottom: "32px" }}>
							<Title
								level={4}
								style={{
									color: token.colorPrimary,
									marginBottom: "24px",
									display: "flex",
									alignItems: "center",
									gap: "8px",
								}}
							>
								<UserOutlined />
								{En ? "Personal Information" : "المعلومات الشخصية"}
							</Title>

							<Row gutter={[24, 24]}>
								<Col xs={24} md={hideEmail?24:12}>
									<Form.Item
										name="fullName"
										label={
											<Text strong style={{ fontSize: "16px" }}>
												{En ? "Full Name" : "الاسم الكامل"}
											</Text>
										}
										rules={[
											{
												required: true,
												message: En
													? "Please enter full name"
													: "الرجاء إدخال الاسم الكامل",
											},
										]}
									>
										<Input
											prefix={
												<UserOutlined
													style={{ color: token.colorTextTertiary }}
												/>
											}
											placeholder={En ? "Enter full name" : "أدخل الاسم الكامل"}
											style={{ borderRadius: "8px" }}
										/>
									</Form.Item>
								</Col>

								{!hideEmail &&(<Col xs={24} md={12}>
									<Form.Item
										name="email"
										label={
											<Text strong style={{ fontSize: "16px" }}>
												{En ? "Email Address" : "البريد الإلكتروني"}
											</Text>
										}
										rules={[
											{
												required: true,
												message: En
													? "Please enter email address"
													: "الرجاء إدخال البريد الإلكتروني",
											},
											{
												type: "email",
												message: En
													? "Please enter a valid email address"
													: "الرجاء إدخال بريد إلكتروني صحيح",
											},
										]}
									>
										<Input
											prefix={
												<MailOutlined
													style={{ color: token.colorTextTertiary }}
												/>
											}
											placeholder={
												En ? "Enter email address" : "أدخل البريد الإلكتروني"
											}
											style={{ borderRadius: "8px" }}
										/>
									</Form.Item>
								</Col> ) }
							</Row>
						</div>
						)}
						
						{!hideName && (
						<Divider style={{ margin: hideEmail?"16px 0":"32px 0" }} />
						)}

						{/* Access & Permissions Section */}
						{!hideRole && (
							<div style={{ marginBottom: "32px" }}>
							<Title
								level={4}
								style={{
									color: token.colorPrimary,
									marginBottom: "24px",
									display: "flex",
									alignItems: "center",
									gap: "8px",
								}}
							>
								<TeamOutlined />
								{En ? "Access & Permissions" : "الصلاحيات والأذونات"}
							</Title>

							<Row gutter={[24, 24]}>
								<Col xs={24}>
									<Form.Item
										name="roles"
										label={
											<Text strong style={{ fontSize: "16px" }}>
												{En ? "User Roles" : "أدوار المستخدم"}
											</Text>
										}
										rules={[
											{
												required: true,
												type: "array",
												min: 1,
												message: En
													? "Please select at least one role"
													: "يجب اختيار دور واحد على الأقل",
											},
										]}
									>
										<Select
											mode="multiple"
											allowClear
											style={{ width: "100%", borderRadius: "8px" }}
											placeholder={
												En ? "Select user roles" : "اختر أدوار المستخدم"
											}
											options={roles}
											size="large"
										/>
									</Form.Item>
								</Col>
							</Row>
						</div>
						)}
						
						{hidePassword && (
						<Divider style={{ margin: "32px 0" }} />
						)}
						{/* Security Section */}
						{!hidePassword && (
							<div style={{ marginBottom: "32px" }}>
							<Title
								level={4}
								style={{
									color: token.colorPrimary,
									marginBottom: "24px",
									display: "flex",
									alignItems: "center",
									gap: "8px",
								}}
							>
								<LockOutlined />
								{En ? "Security" : "الأمان"}
							</Title>

							<Row gutter={[24, 24]}>
								<Col xs={24}>
									<Form.Item
										name="password"
										label={
											<Text strong style={{ fontSize: "16px" }}>
												{En ? "Password" : "كلمة المرور"}
											</Text>
										}
										rules={[
											{
												required: true,
												message: En
													? "Please enter a password"
													: "الرجاء إدخال كلمة المرور",
											},
											{
												min: 8,
												message: En
													? "Password must be at least 8 characters"
													: "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
											},
										]}
									>
										<Input.Password
											prefix={
												<LockOutlined
													style={{ color: token.colorTextTertiary }}
												/>
											}
											placeholder={En ? "Enter password" : "أدخل كلمة المرور"}
											style={{ borderRadius: "8px" }}
										/>
									</Form.Item>
								</Col>
							</Row>
						</div>
						)}
						

						{/* Submit Button */}
						{!hideSubmitButton && (
							<div style={{ textAlign: "center", marginTop: "40px" }}>
								<Space size="middle">
									<Button
										size="large"
										style={{
											minWidth: "120px",
											borderRadius: "8px",
										}}
									>
										{En ? "Cancel" : "إلغاء"}
									</Button>
									<Button
										type="primary"
										htmlType="submit"
										size="large"
										icon={<SaveOutlined />}
										style={{
											minWidth: "120px",
											background: `linear-gradient(135deg, ${token.colorPrimary} 0%, ${token.colorPrimaryActive} 100%)`,
											border: "none",
											borderRadius: "8px",
											boxShadow: `0 4px 12px ${token.colorPrimary}30`,
										}}
									>
										{selectedItemforEdit
											? En
												? "Update User"
												: "تحديث المستخدم"
											: En
											? "Create User"
											: "إنشاء المستخدم"}
									</Button>
								</Space>
							</div>
						)}
					</Form>
				</Card>
			</div>
		</>
	);
}
