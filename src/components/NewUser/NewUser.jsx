import React, { useState } from "react";
import {
	Card,
	Row,
	Col,
	Typography,
	Form,
	Input,
	Radio,
	Checkbox,
	Button,
	Upload,
	Select,
	Space,
} from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function NewUser({ En = false }) {
	const [form] = Form.useForm();
	const userTypes = ["Admin", "Manager", "User", "Guest"];
	const roles = ["Feedback", "Reports", "Social Media", "Users"].map((role) => ({
		label: role,
		value: role,
	}));

	const onFinish = (values) => {
		console.log("Form values:", values);
	};

	return (
		<>
			<Title level={3} className="fw-bold mb-6">
				{En ? "New User" : "مستخدم جديد"}
			</Title>

			<Card className="shadow-sm p-4">
				<Form
					form={form}
					layout="vertical"
					onFinish={onFinish}
					initialValues={{ userType: userTypes[0] }}
				>
					<Row gutter={[16, 16]}>
						{/* Username and Image Upload */}
						<Col xs={24} md={12}>
							<Form.Item
								name="username"
								label={En ? "Username" : "اسم المستخدم"}
								rules={[
									{
										required: true,
										message: En
											? "Please enter username"
											: "الرجاء إدخال اسم المستخدم",
									},
								]}
							>
								<Input
									prefix={<UserOutlined />}
									placeholder={En ? "Username" : "اسم المستخدم"}
								/>
							</Form.Item>
						</Col>

						<Col xs={24} md={12}>
							<Form.Item name="avatar" label={En ? "Upload Image" : "رفع صورة"}>
								<Upload
									listType="picture"
									maxCount={1}
									beforeUpload={() => false}
								>
									<Button icon={<UploadOutlined />}>
										{En ? "Upload" : "رفع"}
									</Button>
								</Upload>
							</Form.Item>
						</Col>

						{/* Name and Email */}
						<Col xs={24} md={12}>
							<Form.Item
								name="name"
								label={En ? "Name" : "الاسم"}
								rules={[
									{
										required: true,
										message: En ? "Please enter name" : "الرجاء إدخال الاسم",
									},
								]}
							>
								<Input placeholder={En ? "Name" : "الاسم"} />
							</Form.Item>
						</Col>

						<Col xs={24} md={12}>
							<Form.Item
								name="email"
								label={En ? "Email" : "البريد الإلكتروني"}
								rules={[
									{
										required: true,
										message: En
											? "Please enter email"
											: "الرجاء إدخال البريد الإلكتروني",
									},
									{
										type: "email",
										message: En
											? "Please enter valid email"
											: "الرجاء إدخال بريد إلكتروني صحيح",
									},
								]}
							>
								<Input placeholder={En ? "Email" : "البريد الإلكتروني"} />
							</Form.Item>
						</Col>

						{/* User Type and Roles */}
						<Col xs={24} md={12}>
							<Form.Item
								name="userType"
								label={En ? "User Type" : "نوع المستخدم"}
								rules={[
									{
										required: true,
										message: En
											? "Please select user type"
											: "الرجاء اختيار نوع المستخدم",
									},
								]}
							>
								<Radio.Group>
									{userTypes.map((type) => (
										<Radio key={type} value={type}>
											{type}
										</Radio>
									))}
								</Radio.Group>
							</Form.Item>
						</Col>

						<Col xs={24} md={12}>
							<Form.Item name="roles" label={En ? "Roles" : "الأدوار"} rules={[
									{
										required: true,
										message: En
											? "At least one role must be selected"
											: "الرجاء اختيار الادواريجب اختيار دور واحد على الأقل",
									},]} >
								<Space style={{ width: "100%" }} direction="vertical">
									<Select
										mode="multiple"
										allowClear
										style={{ width: "100%" }}
										placeholder={En ? "Select one or more roles" : "اختر دورًا أو أكثر"}
										defaultValue={[]}
										options={roles}
									/>
								</Space>
							</Form.Item>
						</Col>

						{/* Password */}
						<Col xs={24}>
							<Form.Item
								name="password"
								label={En ? "Password" : "كلمة المرور"}
								rules={[
									{
										required: true,
										message: En
											? "Please enter password"
											: "الرجاء إدخال كلمة المرور",
									},
								]}
							>
								<Input.Password placeholder={En ? "Password" : "كلمة المرور"} />
							</Form.Item>
						</Col>

						{/* Submit Button */}
						<Col xs={24}>
							<Form.Item>
								<Button type="primary" htmlType="submit" className="mt-4">
									{En ? "Submit" : "إرسال"}
								</Button>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Card>
		</>
	);
}
