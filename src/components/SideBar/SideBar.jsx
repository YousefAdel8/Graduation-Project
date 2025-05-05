import React, { useState, useEffect, useContext } from "react";
import { ConfigProvider, Image } from "antd";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	DashboardOutlined,
	CommentOutlined,
	TeamOutlined,
	StarOutlined,
	FormOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Layout, Menu, theme, Typography } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import { PermissionContext } from "../../context/PermissionContext.jsx";

import logo from "../../assests/citio.png";

import DropdownProfile from "../DropdownProfile/DropdownProfile.jsx";
import FullScreen from "../FullScreenFeature/FullScreen.jsx";
import LanguageToggle from "../LanguageButton/LanguageButton.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";
const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const AppLayout = () => {
	const { isEnglish: En } = useLanguage();
	const [collapsed, setCollapsed] = useState(false);
	const [open, setOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	const navigate = useNavigate();
	const location = useLocation();

	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const onClose = () => {
		setOpen(false);
	};

	//const permissions = ['dashboard', 'feedback', 'report', 'users', 'social media'];
	const { permissions } = useContext(PermissionContext);
	const getCurrentPath = () => {
		const path = location.pathname.split("/")[1] || "";
		switch (path) {
			case "":
				return "1";
			case "emergency":
				return "2";
			case "report":
				return "3";
			case "socialmedia":
				return "4";
			case "users":
				return "5";
			case "feedback":
				return "6";
				
			default:
				return "0";
		}
	};

	const menuItems = [
		isMobile ? null : { type: "divider", style: { margin: "8px 0" } },
		//{ label: En ? 'General' : 'عام', type: 'group' },
		permissions.includes("dashboard") && {
			key: "1",
			icon: <DashboardOutlined />,
			label: En ? "Dashboard" : "لوحة التحكم",
		},
		permissions.includes("emergency") && {
			key: "2",
			icon: <TeamOutlined />,
			label: En ? "Emergency" : "الطوارئ",
		},
		
		permissions.includes("report") && {
			key: "3",
			icon: <FormOutlined />,
			label: En ? "Reports" : "التقارير",
		},
		permissions.includes("social media") && {
			key: "4",
			icon: <CommentOutlined />,
			label: En ? "Social Media" : "منصة المجتمع",
		},
		permissions.includes("users") && {
			key: "5",
			icon: <TeamOutlined />,
			label: En ? "Users" : "المستخدمين",
		},
		permissions.includes("feedback") && {
			key: "6",
			icon: <StarOutlined />,
			label: En ? "Feedback" : "التقييمات",
		},
		
	].filter(Boolean);

	const handleMenuClick = ({ key }) => {
		setOpen(false);
		switch (key) {
			case "1":
				navigate("/");
				break;
			case "2":
				navigate("/emergency");
				break;
			case "3":
				navigate("/report");
				break;
			case "4":
				navigate("/socialmedia");
				break;
			case "5":
				navigate("/users");
				break;
			case "6":
				navigate("/feedback");
				break;
			default:
				break;
		}
	};

	//Handle Logo on Click to go the main page
	const handleLogoClick = () => {
		navigate("/");
	};
	return (
		<ConfigProvider direction={!En ? "rtl" : "ltr"}>
			<Layout style={{ minHeight: "100vh" }}>
				{isMobile ? (
					<Drawer
						trigger={null}
						title={
							<div
								style={{
									padding: "10px",
									display: "flex",
									alignItems: "center",
									justifyContent: collapsed ? "center" : "flex-start",
								}}
							>
								{!collapsed && (
									<Title
										level={3}
										style={{ margin: "0 0 0 10px", color: "#03333d" }}
										className="me-2"
									>
										Citio
									</Title>
								)}
								<div className="d-flex justify-content-center align-content-center ">
									<Image width={40} src={logo} preview={false} />
								</div>

								{/*<Avatar shape="square" size={36} style={{ backgroundColor: "rgb(2, 8, 23)" }}>{En ? "A" : "أ"}</Avatar>*/}
							</div>
						}
						onClose={onClose}
						open={open}
						placement={En ? "left" : "right"}
						style={{ background: colorBgContainer }}
						width={250}
					>
						<Menu
							mode="inline"
							defaultSelectedKeys={[getCurrentPath()]}
							selectedKeys={[getCurrentPath()]}
							style={{
								borderRight: 0,
								background: colorBgContainer,
								width: "100%",
							}}
							onClick={handleMenuClick}
							items={menuItems}
						/>
					</Drawer>
				) : (
					<Sider
						trigger={null}
						collapsible
						collapsed={collapsed}
						style={{ background: colorBgContainer }}
						width={250}
					>
						<div
							style={{
								padding: "12px",
								display: "flex",
								alignItems: "center",
								cursor:"pointer",
								justifyContent: collapsed ? "center" : "flex-start",
							}}
							onClick={handleLogoClick}
							
						>
							{!collapsed && (
								<Title
									level={6}
									style={{ margin: "0 0 0 10px", color: "#03333d" }}
									className="me-2"
								>
									Citio
								</Title>
							)}
							<div className="d-flex justify-content-center align-content-center ">
								<Image width={40} src={logo} preview={false} />
							</div>

							{/*<Avatar shape="square" size={36} style={{ backgroundColor: "rgb(2, 8, 23)" }}>{En ? "A" : "أ"}</Avatar>*/}
						</div>
						<Menu
							mode="inline"
							defaultSelectedKeys={[getCurrentPath()]}
							selectedKeys={[getCurrentPath()]}
							style={{ borderRight: 0, background: colorBgContainer }}
							onClick={handleMenuClick}
							items={menuItems}
						/>
					</Sider>
				)}

				<Layout>
					<Header
						style={{
							padding: "0 16px",
							background: colorBgContainer,
						}}
					>
						<div className="d-flex flex-row align-items-center justify-content-between">
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
									isMobile ? setOpen(true) : setCollapsed(!collapsed)
								}
								style={{
									fontSize: "16px",
									width: 64,
									height: 64,
								}}
							/>

							<div className="d-flex align-items-center gap-3 ms-4">
								<LanguageToggle />
								<FullScreen />
								<DropdownProfile />
							</div>
						</div>
					</Header>
					<Content
						style={{
							margin: "16px",
							padding: 20,
							minHeight: 280,
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}
					>
						<Outlet />
					</Content>
				</Layout>
			</Layout>
		</ConfigProvider>
	);
};

export default AppLayout;
