import React from "react";
import { Col, Form, Input, Modal, Row, Typography } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useLanguage } from "../../../context/LanguageContext";
import putChangePasswordApi from "./ChangePasswordApi";
const { Text } = Typography;

export default function EditPasswordModel({
	isPasswordModalOpen,
	selectedUserForPassword,
	closePasswordModal,
}) {
	const { isEnglish: En } = useLanguage();
	const [passwordForm] = Form.useForm();

	return (
		<Modal
			title={En ? "Edit User Password" : "تعديل كلمة مرور المستخدم"}
			open={isPasswordModalOpen}
			onCancel={() => {
				passwordForm.resetFields();
				closePasswordModal();
			}}
			footer={null}
			destroyOnClose={true}
		>
			<Form
				layout="vertical"
				form={passwordForm}
				onFinish={async (values) => {
					const { confirmPassword, ...dataToSubmit } = values;
					try {
						await putChangePasswordApi(
							selectedUserForPassword.id,
							dataToSubmit
						);
						passwordForm.resetFields();
						closePasswordModal();
					} catch (error) {}
				}}
			>
				<div style={{ marginBottom: "16px", marginTop: "16px" }}>
					<Row gutter={[24, 24]}>
						<Col xs={24}>
							<Form.Item
								name="oldPassword"
								label={
									<Text strong style={{ fontSize: "16px" }}>
										{En ? "Current Password" : "كلمة المرور الحالية"}
									</Text>
								}
								rules={[
									{
										required: true,
										message: En
											? "Please enter current password"
											: "الرجاء إدخال كلمة المرور الحالية",
									},
								]}
							>
								<Input.Password
									prefix={<LockOutlined />}
									placeholder={
										En ? "Enter current password" : "أدخل كلمة المرور الحالية"
									}
									style={{ borderRadius: "8px" }}
								/>
							</Form.Item>
						</Col>
						<Col xs={24}>
							<Form.Item
								name="newPassword"
								label={
									<Text strong style={{ fontSize: "16px" }}>
										{En ? "New Password" : "كلمة المرور الجديدة"}
									</Text>
								}
								rules={[
									{
										required: true,
										message: En
											? "Please enter new password"
											: "الرجاء إدخال كلمة المرور الجديدة",
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
									prefix={<LockOutlined />}
									placeholder={
										En ? "Enter new password" : "أدخل كلمة المرور الجديدة"
									}
									style={{ borderRadius: "8px" }}
								/>
							</Form.Item>
						</Col>
						<Col xs={24}>
							<Form.Item
								name="confirmPassword"
								label={
									<Text strong style={{ fontSize: "16px" }}>
										{En ? "Confirm New Password" : "تأكيد كلمة المرور الجديدة"}
									</Text>
								}
								dependencies={["newPassword"]}
								rules={[
									{
										required: true,
										message: En
											? "Please confirm your new password"
											: "الرجاء تأكيد كلمة المرور الجديدة",
									},
									({ getFieldValue }) => ({
										validator(_, value) {
											if (!value || getFieldValue("newPassword") === value) {
												return Promise.resolve();
											}
											return Promise.reject(
												new Error(
													En
														? "The two passwords do not match!"
														: "كلمتا المرور غير متطابقتان!"
												)
											);
										},
									}),
								]}
							>
								<Input.Password
									prefix={<LockOutlined />}
									placeholder={
										En ? "Confirm new password" : "أكد كلمة المرور الجديدة"
									}
									style={{ borderRadius: "8px" }}
								/>
							</Form.Item>
						</Col>
					</Row>
				</div>
				<Row gutter={[16, 16]} justify="end" style={{ marginTop: "24px" }}>
					<Col>
						<button
							type="button"
							onClick={() => {
								passwordForm.resetFields();
								closePasswordModal();
							}}
							style={{
								padding: "8px 16px",
								border: "1px solid #d9d9d9",
								borderRadius: "6px",
								color: "#000",
								cursor: "pointer",
								marginRight: "8px",
							}}
						>
							{En ? "Cancel" : "إلغاء"}
						</button>
					</Col>
					<Col>
						<button
							type="submit"
							style={{
								padding: "8px 16px",
								border: "none",
								borderRadius: "6px",
								background: "#1890ff",
								color: "#fff",
								cursor: "pointer",
							}}
						>
							{En ? "Change Password" : "تغيير كلمة المرور"}
						</button>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
}
