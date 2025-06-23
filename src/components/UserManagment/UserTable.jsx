import React, { useEffect, useState } from "react";
import { Form, Modal, Popconfirm, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import NewUser from "../NewUser/NewUser";
import { useLanguage } from "../../context/LanguageContext";
import getUserTableApi from "./UserApi";
import EditPasswordModel from "./ChangePassword/EditPasswordModel";
import editUserApi from "./EditUserApi";
export default function UserTable() {
	const { isEnglish: En } = useLanguage();
	const columns = [
		{
			title: En ? "Username" : "اسم المستخدم",
			dataIndex: "fullName",
			key: "fullName",
		},
		{
			title: En ? "email" : "البريد الالكتروني",
			dataIndex: "email",
			key: "email",
		},
		{
			title: En ? "User Role" : "دور المستخدم",
			dataIndex: "roles",
			key: "roles",
			render: (roles) => roles?.join(" And "),
		},
		{
			title: En ? "Edit" : "تعديل",
			dataIndex: "edit",
			key: "edit",
			render: (_, record) => (
				<span>
					<EditOutlined
						style={{ color: "#1890ff" }}
						className="px-3 py-2 fs-6"
						onClick={() => editItem(record)}
					/>
					<Popconfirm
						title={En ? "Delete the report?" : "حذف التقرير؟"}
						description={
							En
								? "Are you sure to delete this report?"
								: "هل انت متاكد من حذف هذا التقرير؟"
						}
						onConfirm={() => removeItem(record)}
						okText={En ? "Yes" : "نعم"}
						cancelText={En ? "No" : "لا"}
					>
						<DeleteOutlined
							style={{ color: "red" }}
							className="px-3 py-2 fs-6"
						/>
					</Popconfirm>
				</span>
			),
		},
		{
			title: En ? "Change Password" : "تغيير الباسورد",
			key: "changePassword",
			render: (_, record) => (
				<button
					type="button"
					onClick={() => openPasswordModal(record)}
					style={{
						border: "none",
						background: "none",
						color: "#faad14",
						cursor: "pointer",
					}}
				>
					{En ? "Change" : "تغيير"}
				</button>
			),
		},
	];
	const [tableData, setTableData] = useState([]);
	const [loading, setLoading] = useState(false);
	const fetchData = async () => {
	setLoading(true);
	try {
		const data = await getUserTableApi();
		if (Array.isArray(data)) {
			setTableData(data);
		} else {
			console.error("Data is not an array:", data);
		}
	} catch (error) {
		console.error("Error fetching data:", error);
	} finally {
		setLoading(false);
	}
};

useEffect(() => {
	fetchData();
}, []);

	const [isEditOpen, setIsEditOpen] = useState(false);
	const [selectedItemforEdit, setSelectedItemforEdit] = useState(null);
	const [form] = Form.useForm();

	const removeItem = (record) => {};
	const editItem = (record) => {
		setSelectedItemforEdit(record);
		setIsEditOpen(true);
	};
	const handleCancel = () => {
		setIsEditOpen(false);
	};

	const handleOk = async () => {
	try {
		const values = await form.validateFields();
		await editUserApi(selectedItemforEdit.id, values);
		await fetchData();
		setIsEditOpen(false);
	} catch (err) {
		console.log("Validation or update failed:", err);
	}
};


	// Password Modal State
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
	const [selectedUserForPassword, setSelectedUserForPassword] = useState(null);

	const openPasswordModal = (record) => {
		setSelectedUserForPassword(record);
		setIsPasswordModalOpen(true);
	};
	const closePasswordModal = () => {
		setIsPasswordModalOpen(false);
	};

	return (
		<>
			<Table
				columns={columns}
				dataSource={tableData}
				loading={loading}
				scroll={{
					x: 500,
					y: 500,
				}}
				pagination={{
					position: ["none"],
				}}
			/>
			{/*Edit User Modal*/}
			<Modal
				title={En ? "Edit User" : "تعديل المستخدم"}
				open={isEditOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				okText={En ? "Submit" : "إرسال"}
				cancelText={En ? "Cancel" : "إلغاء"}
			>
				<NewUser
					En={En}
					selectedItemforEdit={selectedItemforEdit}
					form={form}
					hideSubmitButton={true}
					hidePassword={true}
					hideEmail={true}
				/>
			</Modal>
			{/*Edit user Password Modal*/}
			<EditPasswordModel
				isPasswordModalOpen={isPasswordModalOpen}
				selectedUserForPassword={selectedUserForPassword}
				closePasswordModal={closePasswordModal}
			/>
		</>
	);
}
