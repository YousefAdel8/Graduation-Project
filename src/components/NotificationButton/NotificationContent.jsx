import { Badge, Button, List, Space, Typography } from "antd";
import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { 
    ExclamationCircleOutlined, 
  } from "@ant-design/icons";
const { Text } = Typography;

export default function NotificationContent() {
    const { isEnglish: En } = useLanguage();
	const dummyNotifications = [
		{
			id: 1,
			title: "بلاغ طوارئ جديد",
            type: "warning",
			description: "تم الإبلاغ عن حالة طوارئ في شارع الملك عبدالله",
			time: "منذ 5 دقائق",
			isRead: false,
			user: "محمد أحمد",
		},
		{
			id: 2,
			title: "تقرير جديد",
			description: "تم إضافة تقرير جديد عن مشكلة في البنية التحتية",
			time: "منذ ساعة",
			isRead: false,
			user: "سارة محمود",
		},
		{
			id: 3,
			title: "تقييم جديد",
			description: "قام أحد المستخدمين بإضافة تقييم للخدمات",
			time: "منذ 3 ساعات",
			isRead: true,
			user: "خالد عبدالله",
		},
		{
			id: 4,
			title: "تم الانتهاء من معالجة حالة طوارئ",
			description: "تم إغلاق بلاغ الطوارئ رقم #12345",
			time: "أمس",
			isRead: true,
			user: "النظام",
		},
	];
	return (
		<>
			<List
				itemLayout="horizontal"
				dataSource={dummyNotifications}
				locale={{ emptyText: "لا يوجد اشعارات" }}
				renderItem={(item, index) => (
					<List.Item
						style={{
							borderBottom: "1px solid #f0f0f0",
							padding: "12px 0",
							backgroundColor: item.isRead ? "" : "rgba(24, 144, 255, 0.05)",
						}}
						actions={[
							<Text type="secondary" style={{ fontSize: "11px" }}>
								{item.time}
							</Text>,
						]}
						className="pb-3"
					>
						<List.Item.Meta
							avatar={
                                <ExclamationCircleOutlined  type={item.type} isRead={item.isRead}  className="pe-3"/>
								
							}
							title={
								<div style={{ display: "flex", alignItems: "center" }}>
									<span>{item.title}</span>
									{!item.isRead && (
										<Badge
											status="processing"
											text={En?"New":"جديد"}
											style={{
												fontSize: "11px",
												marginRight: "8px",
											}}
										/>
									)}
								</div>
							}
							description={item.description}
						/>
					</List.Item>
				)}
			/>

			<div
				style={{
					textAlign: "center",
					padding: "10px 0",
					borderTop: "1px solid #f0f0f0",
					background: "#fafafa",
				}}
			>
				<Space>
					<Button type="link" size="small">
						عرض جميع الإشعارات
					</Button>
					<Button type="link" size="small">
						تحديد الكل كمقروء
					</Button>
				</Space>
			</div>
		</>
	);
}
