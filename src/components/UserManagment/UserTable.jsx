import React, {  useState } from "react";
import { Form, Modal, Popconfirm, Table } from "antd";
import { DeleteOutlined, EditOutlined, LockOutlined } from "@ant-design/icons";
import NewUser from "../NewUser/NewUser";
import { useLanguage } from "../../context/LanguageContext";
export default function UserTable() {
	const { isEnglish: En } = useLanguage();
	const columns = [
		{
			title: "#",
			dataIndex: "index",
			key: "index",
			width: 50,
		},
		{
			title: En ? "Username" : "اسم المستخدم",
			dataIndex: "username",
			key: "username",
		},
		{
			title: En ? "Name" : "الاسم",
			dataIndex: "name",
			key: "name",
		},
		{
			title: En ? "User Type" : "نوع المستخدم",
			dataIndex: "userType",
			key: "userType",
		},
		{
			title: En ? "Password" : "كلمة السر",
			dataIndex: "password",
			key: "password",
			render: () => <LockOutlined />,
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
	];
	const [tableData, setTableData] = useState([
		{
			key: "1",
			index: 1,
			username: "ahmed123",
			name: "أحمد فتحي",
			userType: "مشرف",
			password: "123456",
		},
		{
			key: "2",
			index: 2,
			username: "sara_22",
			name: "سارة محمد",
			userType: "مستخدم عادي",
			password: "abcdef",
		},
		{
			key: "3",
			index: 3,
			username: "karim_dev",
			name: "كريم السيد",
			userType: "مدير النظام",
			password: "pass123",
		},
		{
			key: "4",
			index: 4,
			username: "mona.admin",
			name: "منى عبدالعزيز",
			userType: "مشرف",
			password: "admin2024",
		},
		{
			key: "5",
			index: 5,
			username: "youssef98",
			name: "يوسف مصطفى",
			userType: "مستخدم عادي",
			password: "youssef!@#",
		},
	]);

	const [isEditOpen, setIsEditOpen] = useState(false);
	const [selectedItemforEdit, setSelectedItemforEdit] = useState(null);
	const [form] = Form.useForm();
	const removeItem = (record) => {
		const newData = tableData.filter((item) => item.key !== record.key);
		setTableData(newData);
	};
	const editItem = (record) => {
		setSelectedItemforEdit(record);
		setIsEditOpen(true);
	};
	const handleCancel = () => {
		setIsEditOpen(false);
	};

	const handleOk = () => {
    form.validateFields()
      .then(values => {
        console.log("Validated values:", values);
        const newData = tableData.map(item => {
          if (item.key === selectedItemforEdit.key) {
            return { ...item, ...values };
          }
          return item;
        });
        setTableData(newData);
        setIsEditOpen(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

	return (
		<>
			<Table
				columns={columns}
				dataSource={tableData}
				scroll={{
					x: 500,
					y: 500,
				}}
				pagination={{
					position: ["none"],
				}}
			/>
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
        />
      </Modal>
		</>
	);
}
