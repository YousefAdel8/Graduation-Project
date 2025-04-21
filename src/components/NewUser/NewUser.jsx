import React, { useEffect } from "react";
import {
	Card,
	Row,
	Col,
	Form,
	Input,
	Radio,
	Button,
	Upload,
	Select,
} from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";

export default function NewUser({
	En = false, 
  selectedItemforEdit = null, 
  form: externalForm = null,
  hideSubmitButton = false,
}) {
	const [localForm] = Form.useForm();
	const userTypes = ["Admin", "Manager", "User", "Guest"];
	const roles = ["Feedback", "Reports", "Social Media", "Users"].map(
		(role) => ({
			label: role,
			value: role,
		})
	);

	const formInstance = externalForm || localForm; //take the form instance from the ref(edit) or from here(new user)
	const onFinish = (values) => {
		console.log("Form1 values:", values);
	};
	useEffect(() => {
		if (selectedItemforEdit) {
		  formInstance.setFieldsValue(selectedItemforEdit);
		}
	  }, [selectedItemforEdit, formInstance]);
	return (
		<>
			<Card className="shadow-sm p-4">
				<Form
					form={formInstance}
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
							<Form.Item
								name="roles"
								label={En ? "Roles" : "الأدوار"}
								rules={[
									{
										required: true,
										type: "array",
										min: 1,
										message: En
											? "At least one role must be selected"
											: "يجب اختيار دور واحد على الأقل",
									},
								]}
							>
								<Select
									mode="multiple"
									allowClear
									style={{ width: "100%" }}
									placeholder={
										En ? "Select one or more roles" : "اختر دورًا أو أكثر"
									}
									options={roles}
								/>
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
						{!hideSubmitButton && (
							<Col xs={24}>
								<Form.Item>
									<Button type="primary" htmlType="submit" className="mt-4">
										{En ? "Submit" : "إرسال"}
									</Button>
								</Form.Item>
							</Col>
						)}
					</Row>
				</Form>
			</Card>
		</>
	);
}
