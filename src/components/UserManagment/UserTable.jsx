import React from "react";
import { Table } from "antd";
import { DeleteOutlined, EditOutlined, LockOutlined } from '@ant-design/icons';
export default function UserTable({ En = false }) {
	const columns = [
        {
          title: "#",
          dataIndex: "index",
          key: "index",
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
              <EditOutlined style={{ color: '#1890ff'}} className="ms-2" />
              <DeleteOutlined style={{ color: 'red' }} className="me-2"/>
            </span>
          ),
        },
      ];
      
      const tableData = [
        {
          key: '1',
          index: 1,
          username: 'ahmed123',
          name: 'أحمد فتحي',
          userType: 'مشرف',
          password: '123456',
        },
        {
          key: '2',
          index: 2,
          username: 'sara_22',
          name: 'سارة محمد',
          userType: 'مستخدم عادي',
          password: 'abcdef',
        },
        {
          key: '3',
          index: 3,
          username: 'karim_dev',
          name: 'كريم السيد',
          userType: 'مدير النظام',
          password: 'pass123',
        },
        {
          key: '4',
          index: 4,
          username: 'mona.admin',
          name: 'منى عبدالعزيز',
          userType: 'مشرف',
          password: 'admin2024',
        },
        {
          key: '5',
          index: 5,
          username: 'youssef98',
          name: 'يوسف مصطفى',
          userType: 'مستخدم عادي',
          password: 'youssef!@#',
        },
      ];
      
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
		</>
	);
}
