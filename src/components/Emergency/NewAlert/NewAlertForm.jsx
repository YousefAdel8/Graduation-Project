import {
	Form,
	Input,
	Select,
	Radio,
	Button,
	Checkbox,
	Divider,
	Alert,
	Space,
} from "antd";
import React from "react";
import { useLanguage } from "../../../context/LanguageContext";
import {
	MailOutlined,
	BellOutlined,
	MessageOutlined,
	InfoCircleOutlined,
	SendOutlined,
} from "@ant-design/icons";
const { TextArea } = Input;
const { Option } = Select;

export default function NewAlertForm() {
	const { isEnglish: En } = useLanguage();
	const onFinish = (values) => {
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div className="p-4" style={{ maxWidth: "800px", margin: "0 auto" }}>
			<Form
				name="basic"
				layout="vertical"
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				className="mt-2"
				size="large"
			>
				{/* Alert Title */}
				<Form.Item
					label={
						<span style={{ fontSize: "16px", fontWeight: "500" }}>
							{En ? "Alert Title" : "عنوان الإنذار"}{" "}
						</span>
					}
					name="title"
					rules={[
						{
							required: true,
							message: En
								? "Please input Alert Title!"
								: "يرجى إدخال عنوان الإنذار!",
						},
					]}
				>
					<Input
						size="large"
						placeholder={En ? "Enter alert title..." : "أدخل عنوان الإنذار..."}
						style={{ fontSize: "16px", padding: "10px" }}
					/>
				</Form.Item>

				{/* Description */}
				<Form.Item
					label={
						<span style={{ fontSize: "16px", fontWeight: "500" }}>
							{En ? "Description" : "الوصف"}{" "}
						</span>
					}
					name="description"
					rules={[
						{
							required: true,
							message: En ? "Please input description!" : "يرجى إدخال الوصف!",
						},
					]}
				>
					<TextArea
						rows={4}
						size="large"
						placeholder={
							En
								? "Provide detailed information about the emergency..."
								: "قدم معلومات تفصيلية عن الطوارئ..."
						}
						style={{ fontSize: "16px", padding: "10px" }}
					/>
				</Form.Item>

				{/* Category */}
				<Form.Item
					label={
						<span style={{ fontSize: "16px", fontWeight: "500" }}>
							{En ? "Category" : "الفئة"}{" "}
						</span>
					}
					name="category"
					rules={[
						{
							required: true,
							message: En ? "Please select a category!" : "يرجى اختيار فئة!",
						},
					]}
				>
					<Select
						size="large"
						placeholder={En ? "Select alert category" : "اختر فئة الإنذار"}
						style={{ fontSize: "16px" }}
					>
						<Option value="weather">
							{En ? "Weather Alert" : "انذار الطقس"}
						</Option>
						<Option value="fire">{En ? "Fire Hazard" : "خطر الحريق"}</Option>
						<Option value="security">
							{En ? "Security Alert" : "تنبيه أمني"}
						</Option>
						<Option value="medical">
							{En ? "Medical Emergency" : "الطوارئ الطبية"}
						</Option>
						<Option value="evacuation">
							{En ? "Evacuation Notice" : "إشعار الإخلاء"}
						</Option>
						<Option value="curfew">
							{En ? "Curfew Alert" : "تنبيه حظر التجول"}
						</Option>
						<Option value="utility">
							{En ? "Utility Outage" : "انقطاع الخدمة"}
						</Option>
						<Option value="other">{En ? "Other" : "أخرى"}</Option>
					</Select>
				</Form.Item>

				{/* Priority Level */}
				<Form.Item
					label={
						<span style={{ fontSize: "16px", fontWeight: "500" }}>
							{En ? "Priority Level" : "مستوى الأولوية"}{" "}
						</span>
					}
					name="priority"
					rules={[
						{
							required: true,
							message: En
								? "Please select priority level!"
								: "يرجى اختيار مستوى الأولوية!",
						},
					]}
				>
					<Radio.Group size="large" style={{ width: "100%" }}>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								gap: "20px",
							}}
						>
							<Radio
								value="low"
								style={{ flex: 1 }}
								className="border border-gray-200 rounded p-3"
							>
								<div
									style={{ display: "flex", alignItems: "center", gap: "8px" }}
								>
									<span
										style={{
											width: "12px",
											height: "12px",
											borderRadius: "50%",
											backgroundColor: "#52c41a",
											display: "inline-block",
										}}
									></span>
									<div>
										<div style={{ fontSize: "16px", fontWeight: "500" }}>
											{En ? "Low" : "منخفض"}
										</div>
										<div style={{ fontSize: "14px", color: "#666" }}>
											{En ? "Non-urgent" : "غير عاجل"}
										</div>
									</div>
								</div>
							</Radio>

							<Radio
								value="medium"
								style={{ flex: 1 }}
								className="border border-gray-200 rounded p-3"
							>
								<div
									style={{ display: "flex", alignItems: "center", gap: "8px" }}
								>
									<span
										style={{
											width: "12px",
											height: "12px",
											borderRadius: "50%",
											backgroundColor: "#fa8c16",
											display: "inline-block",
										}}
									></span>
									<div>
										<div style={{ fontSize: "16px", fontWeight: "500" }}>
											{En ? "Medium" : "متوسط"}
										</div>
										<div style={{ fontSize: "14px", color: "#666" }}>
											{En ? "Important" : "مهم"}
										</div>
									</div>
								</div>
							</Radio>

							<Radio
								value="high"
								style={{ flex: 1 }}
								className="border border-gray-200 rounded p-3"
							>
								<div
									style={{ display: "flex", alignItems: "center", gap: "8px" }}
								>
									<span
										style={{
											width: "12px",
											height: "12px",
											borderRadius: "50%",
											backgroundColor: "#f5222d",
											display: "inline-block",
										}}
									></span>
									<div>
										<div style={{ fontSize: "16px", fontWeight: "500" }}>
											{En ? "High" : "عالي"}
										</div>
										<div style={{ fontSize: "14px", color: "#666" }}>
											{En ? "Critical" : "حرج"}
										</div>
									</div>
								</div>
							</Radio>
						</div>
					</Radio.Group>
				</Form.Item>
				{/*Affected Location */}
				<Form.Item
					label={
						<span style={{ fontSize: "16px", fontWeight: "500" }}>
							{En ? "Affected Location" : "موقع المصابين"}{" "}
						</span>
					}
					name="location"
				>
					<Input
						size="large"
						className="p-2"
						placeholder={
							En
								? "Specift location if applicable..."
								: "ادخل الموقع اذا كان مطلوب..."
						}
					/>
				</Form.Item>
				{/*Notification Methods Check box */}

				<Form.Item
					label={
						<span style={{ fontSize: "16px", fontWeight: "500" }}>
							{En ? "Notification Methods" : "طرق الإشعارات"}
						</span>
					}
					name="notificationMethods"
				>
					<Checkbox.Group style={{ width: "100%" }}>
						<div
							style={{ display: "flex", flexDirection: "column", gap: "12px" }}
						>
							{/* Push Notifications */}
							<Checkbox value="push">
								<div
									style={{ display: "flex", alignItems: "center", gap: "8px" }}
								>
									<BellOutlined
										style={{ fontSize: "18px", color: "#1890ff" }}
									/>
									<div style={{ fontSize: "16px", fontWeight: "500" }}>
										{En ? "Push Notifications" : "إشعارات التطبيق"}
									</div>
								</div>
							</Checkbox>

							{/* Email Alerts */}
							<Checkbox value="email">
								<div
									style={{ display: "flex", alignItems: "center", gap: "8px" }}
								>
									<MailOutlined
										style={{ fontSize: "18px", color: "#faad14" }}
									/>
									<div style={{ fontSize: "16px", fontWeight: "500" }}>
										{En ? "Email Alerts" : "تنبيهات البريد الإلكتروني"}
									</div>
								</div>
							</Checkbox>

							{/* SMS Alerts */}
							<Checkbox value="sms">
								<div
									style={{ display: "flex", alignItems: "center", gap: "8px" }}
								>
									<MessageOutlined
										style={{ fontSize: "18px", color: "#52c41a" }}
									/>
									<div style={{ fontSize: "16px", fontWeight: "500" }}>
										{En ? "SMS Alerts" : "رسائل قصيرة"}
									</div>
								</div>
							</Checkbox>
						</div>
					</Checkbox.Group>
				</Form.Item>

				<Divider style={{ margin: "32px 0" }} />

				{/* Submit Button */}
				<Form.Item style={{ marginTop: "30px" }}>
					<Space
						direction="horizontal"
						style={{ width: "100%" }}
						size={16}
						className="d-flex justify-content-between"
					>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: "8px",
								color: "#8c8c8c",
								fontSize: "14px",
							}}
						>
							<InfoCircleOutlined />
							<span>
								{En
									? "Alert will be sent immediately upon creation"
									: "سيتم إرسال التنبيه فور الإنشاء"}
							</span>
						</div>

						<Space style={{ width: "100%", justifyContent: "flex-end" }}>
							<Button size="large" className="border-0">
								{En ? "Cancel" : "إلغاء"}
							</Button>

							<Button
								type="primary"
								htmlType="submit"
								size="large"
								danger
								icon={<SendOutlined />}
								style={{ fontSize: "18px" }}
							>
								{En ? "Send Alert" : "إرسال التنبيه"}
							</Button>
						</Space>
					</Space>
				</Form.Item>
			</Form>
		</div>
	);
}
