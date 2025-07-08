import React from "react";
import { Layout, Button, Dropdown } from "antd";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	MoreOutlined,
} from "@ant-design/icons";
import NotificationButton from "../NotificationButton/NotificationButton";
import LanguageToggle from "../LanguageButton/LanguageButton";
import FullScreen from "../FullScreenFeature/FullScreen";
import DropdownProfile from "../DropdownProfile/DropdownProfile";
import DarkModeButton from "../DarkModeButton/DarkModeButton";
import { useTheme } from "../../context/ThemeContext";

const { Header } = Layout;

const AppHeader = ({
	En,
	isMobile,
	collapsed,
	setCollapsed,
	drawerOpen,
	setDrawerOpen,
}) => {
	const { isDark } = useTheme();

	return (
		<Header
			style={{
				padding: "0 16px",
				background: isDark ? "#15191f" : "#fff",
				minHeight: 60,
				borderBottom: isDark ? "1px solid #222" : "1px solid #f0f0f0",
				transition: "background 0.2s",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				{/* Toggle sidebar/drawer */}
				<Button
					type="text"
					icon={
						En ? (
							isMobile ? (
								<MenuUnfoldOutlined />
							) : collapsed ? (
								<MenuUnfoldOutlined />
							) : (
								<MenuFoldOutlined />
							)
						) : isMobile ? (
							<MenuFoldOutlined />
						) : collapsed ? (
							<MenuFoldOutlined />
						) : (
							<MenuUnfoldOutlined />
						)
					}
					onClick={() =>
						isMobile ? setDrawerOpen(true) : setCollapsed(!collapsed)
					}
					style={{
						fontSize: 18,
						width: 48,
						height: 48,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				/>
				{/* Utility buttons */}
				<div
					style={{
						display: "flex",
						gap: 8,
						alignItems: "center",
						flexShrink: 0,
					}}
				>
					{/*<NotificationButton />*/}
					<DropdownProfile />

					<Dropdown
						overlay={
							<div 
  style={{ 
    display: "flex", 
    flexDirection: "column", 
    padding: 15, 
    background: isDark ? "#15191f" : "#fff", 
    border: isDark ? "1px solid #303030" : "1px solid #e8e8e8",
  }}
>
  <DarkModeButton />
  <LanguageToggle />
  <FullScreen />
</div>

						}
						trigger={["click"]}
						placement="bottomRight"
						arrow={{ pointAtCenter: true }}
					>
						<Button
							type="text"
							icon={<MoreOutlined />}
							style={{
								fontSize: 16,
								width: 44,
								height: 44,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								borderRadius: 8,
								border: isDark ? "1px solid #303030" : "1px solid #e8e8e8",
							}}
						/>
					</Dropdown>
				</div>
			</div>
		</Header>
	);
};

export default AppHeader;
