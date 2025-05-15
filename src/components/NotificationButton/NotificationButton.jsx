import React, { useState } from "react";
import { BellOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import { useLanguage } from "../../context/LanguageContext.jsx";
import NotificationContent from "./NotificationContent.jsx";


export default function NotificationButton() {
	const [open, setOpen] = useState(false);
    const { isEnglish: En } = useLanguage();
	const handleOpenChange = (newOpen) => {
		setOpen(newOpen);
	};

    
	return (
		<>
			<Popover
                content={<NotificationContent />}
				title={En?"Notifications":"الإشعارات"}
				trigger="click"
				open={open}
				onOpenChange={handleOpenChange}
				placement="bottomRight"
				overlayStyle={{width: window.innerWidth <= 600 ? "290px" : "350px"}} 
			>
				<Button
					type="text"
					icon={<BellOutlined style={{ fontSize: "20px" }} />}
					size="large"
				/>
			</Popover>
		</>
	);
}