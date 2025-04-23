import React, { useState } from "react";
import {
	Form,
	Input,
	Upload,
	Row,
	Col,
	Avatar,
} from "antd";
import {
	UserOutlined,
	CameraOutlined,
} from "@ant-design/icons";

export default function EditProfile({ En = false, initialValues = {} }) {
	const [form] = Form.useForm();
	const [avatarUrl, setAvatarUrl] = useState(initialValues.image);
	const handleAvatarChange = (info) => {
		if (info.file.status === "done") {
			setAvatarUrl(info);
		}
	};
	const uploadButton = (
		<div className="avatar-upload-wrapper">
			{avatarUrl ? (
				<Avatar size={100} src={avatarUrl} icon={<UserOutlined />} />
			) : (
				<Avatar size={100} icon={<UserOutlined />} />
			)}
			<div className="upload-button">
				<CameraOutlined />
			</div>
		</div>
	);
    
	return (
		<>
			<Form form={form} initialValues={initialValues} layout="vertical">
				{/*Picture*/}
				<div style={{ textAlign: "center", marginBottom: "24px" }}>
					<Form.Item name="avatar" valuePropName="file">
						<Upload
							name="avatar"
							listType="picture-card"
							className="avatart-uploader"
							showUploadList={false}
							action=""
							onChange={handleAvatarChange}
						>
							{uploadButton}
						</Upload>
					</Form.Item>
				</div>
				<Row gutter={16}>
					{/*First Name*/}
					<Col xs={24} md={12}>
						<Form.Item
							name="firstName"
							label={En ? "First Name" : "الاسم الأول"}
							rules={[
								{
									required: true,
									message: En
										? "Please enter first name"
										: "الرجاء إدخال الاسم الأول",
								},
							]}
						>
							<Input placeholder={En ? "First Name" : "الاسم الأول"} />
						</Form.Item>
					</Col>
					{/*  last Name */}
					<Col xs={24} md={12}>
						<Form.Item
							name="lastName"
							label={En ? "Last Name" : "الاسم الأخير"}
							rules={[
								{
									required: true,
									message: En
										? "Please enter last name"
										: "الرجاء إدخال الاسم الأخير",
								},
							]}
						>
							<Input placeholder={En ? "Last Name" : "الاسم الأخير"} />
						</Form.Item>
					</Col>
					{/*  Email */}
					<Col xs={24} md={12}>
						<Form.Item
							name="email"
							label={En ? "Email Address" : "البريد الإلكتروني"}
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
										? "Please enter a valid email"
										: "الرجاء إدخال بريد إلكتروني صحيح",
								},
							]}
						>
							<Input placeholder={En ? "Email Address" : "البريد الإلكتروني"} />
						</Form.Item>
					</Col>

					{/* Phone Number */}
					<Col xs={24} md={12}>
						<Form.Item
							name="phone"
							label={En ? "Phone" : "رقم الهاتف"}
							rules={[
								{
									required: true,
									message: En
										? "Please enter phone number"
										: "الرجاء إدخال رقم الهاتف",
								},
							]}
						>
							<Input placeholder={En ? "Phone Number" : "رقم الهاتف"} />
						</Form.Item>
					</Col>

					{/* Role */}
					<Col xs={24}>
                    <Form.Item
							name="role"
							label={En ? "Role" : "الدور"}
							rules={[
								{
									required: true,
									message: En
										? "Please enter the Role"
										: "الرجاء إدخال الدور",
								},
							]}
						>
							<Input placeholder={En ? "ٌRole" : "الدور"} />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</>
	);
}
