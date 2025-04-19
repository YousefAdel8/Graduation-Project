import React from "react";
import { Table } from "antd";

export default function UserTable({ En = false }) {
	const columns = [
		{
			title: En ? "Name" : "الاسم",
			dataIndex: "name",
			key: "name",
		},
		{
			title: En ? "Email" : "البريد الالكتروني",
			dataIndex: "email",
			key: "email",
		},
		{
			title: En ? "Role" : "الصلاحية",
			dataIndex: "role",
			key: "role",
		},
		{
			title: En ? "Status" : "الحالة",
			dataIndex: "status",
			key: "status",
		},
	];
	const tableData = [
        {
            key: "1",
            name: En ? "Mohamed Ali" : "محمد علي",
            email: "m.ali@example.com",
            role: En ? "Admin" : "مدير",
            status: En ? "Active" : "نشط",
        },
        {
            key: "2",
            name: En ? "Ahmed Hassan" : "أحمد حسن",
            email: "a.hassan@example.com",
            role: En ? "User" : "مستخدم",
            status: En ? "Inactive" : "غير نشط",
        },
        {
            key: "3",
            name: En ? "Fatima Mahmoud" : "فاطمة محمود",
            email: "f.mahmoud@example.com",
            role: En ? "Admin" : "مدير",
            status: En ? "Active" : "نشط",
        },
        {
            key: "4",
            name: En ? "Youssef Ibrahim" : "يوسف إبراهيم",
            email: "y.ibrahim@example.com",
            role: En ? "User" : "مستخدم",
            status: En ? "Active" : "نشط",
        },
        {
            key: "5",
            name: En ? "Amina Salah" : "أمينة صلاح",
            email: "a.salah@example.com",
            role: En ? "User" : "مستخدم",
            status: En ? "Inactive" : "غير نشط",
        },
        {
            key: "6",
            name: En ? "Omar Khaled" : "عمر خالد",
            email: "o.khaled@example.com",
            role: En ? "Admin" : "مدير",
            status: En ? "Active" : "نشط",
        },
        {
            key: "7",
            name: En ? "Nour El-Din" : "نور الدين",
            email: "n.eldin@example.com",
            role: En ? "User" : "مستخدم",
            status: En ? "Inactive" : "غير نشط",
        },
        {
            key: "8",
            name: En ? "Hoda Moustafa" : "هدى مصطفى",
            email: "h.moustafa@example.com",
            role: En ? "User" : "مستخدم",
            status: En ? "Active" : "نشط",
        },
        {
            key: "9",
            name: En ? "Karim Abdel-Rahman" : "كريم عبد الرحمن",
            email: "k.abdelrahman@example.com",
            role: En ? "Admin" : "مدير",
            status: En ? "Active" : "نشط",
        },
        {
            key: "10",
            name: En ? "Dalia Farouk" : "داليا فاروق",
            email: "d.farouk@example.com",
            role: En ? "User" : "مستخدم",
            status: En ? "Inactive" : "غير نشط",
        },
        {
            key: "11",
            name: En ? "Tarek Nasser" : "طارق ناصر",
            email: "t.nasser@example.com",
            role: En ? "User" : "مستخدم",
            status: En ? "Active" : "نشط",
        },
        {
            key: "12",
            name: En ? "Samira El-Sayed" : "سميرة السيد",
            email: "s.elsayed@example.com",
            role: En ? "Admin" : "مدير",
            status: En ? "Inactive" : "غير نشط",
        }
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
