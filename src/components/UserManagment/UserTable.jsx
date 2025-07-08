import React, { useEffect, useState } from "react";
import { Popconfirm, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useLanguage } from "../../context/LanguageContext";
import getUserTableApi from "./UserApi";
import EditPasswordModel from "./ChangePassword/EditPasswordModel";
import EditUserModal from "./EditUser/EditUserModal";
import DeleteUserApi from "./EditUser/DeleteUserApi";
import ChangePassword from "./EditUser/ChangePassword";

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
						title={En ? "Delete the User?" : "حذف المستخدم؟"}
						description={
							En
								? "Are you sure to delete this user?"
								: "هل انت متاكد من حذف هذا المستخدم؟"
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

	// Edit User Modal States
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [selectedItemforEdit, setSelectedItemforEdit] = useState(null);

	const removeItem = async (record) => {
		await DeleteUserApi(record.id);

		console.log("Delete user:", record);
	};

	const editItem = (record) => {
		setSelectedItemforEdit(record);
		setIsEditOpen(true);
	};

	const handleEditModalClose = () => {
		setIsEditOpen(false);
		setSelectedItemforEdit(null);
	};

	const handleEditSuccess = (updatedUser) => {
		// تحديث البيانات في الجدول بعد النجاح
		fetchData();
		console.log("User updated successfully:", updatedUser);
	};

	// Password Modal States
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
	const [selectedUserForPassword, setSelectedUserForPassword] = useState(null);

	const openPasswordModal = (record) => {
		setSelectedUserForPassword(record);
		setIsPasswordModalOpen(true);
	};

	const closePasswordModal = () => {
		setIsPasswordModalOpen(false);
		setSelectedUserForPassword(null);
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

			{/* Edit User Modal */}
			<EditUserModal
				visible={isEditOpen}
				onClose={handleEditModalClose}
				selectedUser={selectedItemforEdit}
				onSuccess={handleEditSuccess}
				En={En}
				hideEmail={false}
			/>

			{/* Edit user Password Modal */}
			<ChangePassword
				isPasswordModalOpen={isPasswordModalOpen}
				selectedUserForPassword={selectedUserForPassword}
				closePasswordModal={closePasswordModal}
			/>
		</>
	);
}
