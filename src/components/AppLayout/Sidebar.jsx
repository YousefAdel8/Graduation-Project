import React from "react";
import { Layout, Menu, Drawer, Typography, Image } from "antd";
import {
  DashboardOutlined, CommentOutlined, TeamOutlined, StarOutlined, FormOutlined,
  AlertOutlined,
} from "@ant-design/icons";
import logo from "../../assests/citio.png";
import { useTheme } from "../../context/ThemeContext";

const { Sider } = Layout;
const { Title } = Typography;

// Map routes to menu keys
const getKey = (pathname) => {
  const map = {
    "": "1",
    emergency: "2",
    report: "3",
    socialmedia: "4",
    users: "5",
    feedback: "6",
  };
  return map[pathname.split("/")[1] || ""] || "0";
};

const Sidebar = ({
  En, collapsed, setCollapsed,
  drawerOpen, setDrawerOpen,
  isMobile, navigate, location,
  permissions, colorBgContainer,
}) => {
  // Generate menu based on user permissions
  const menuItems = [
    permissions.includes("dashboard") && { key: "1", icon: <DashboardOutlined />, label: En ? "Dashboard" : "لوحة التحكم" },
    permissions.includes("emergency") && { key: "2", icon: < AlertOutlined />, label: En ? "Emergency" : "الطوارئ" },
    permissions.includes("report") && { key: "3", icon: <FormOutlined />, label: En ? "Reports" : "التقارير" },
    permissions.includes("social media") && { key: "4", icon: <CommentOutlined />, label: En ? "Social Media" : "منصة المجتمع" },
    permissions.includes("users") && { key: "5", icon: <TeamOutlined />, label: En ? "Users" : "المستخدمين" },
    permissions.includes("feedback") && { key: "6", icon: <StarOutlined />, label: En ? "Feedback" : "التقييمات" },
  ].filter(Boolean);

  // Menu click navigation
  const handleMenuClick = ({ key }) => {
    setDrawerOpen && setDrawerOpen(false);
    const routes = { "1": "/", "2": "/emergency", "3": "/report", "4": "/socialmedia", "5": "/users", "6": "/feedback" };
    navigate(routes[key] || "/");
  };

  // Side logo click
  const handleLogoClick = () => navigate("/");

  const { isDark } = useTheme(); 
  const siderBg = isDark ? "#15191f" : "#fff";
  // Drawer for mobile, Sider for desktop
  return isMobile ? (
    <Drawer
      title={
        <div style={{
					padding: "10px",
					display: "flex",
					alignItems: "center",
					justifyContent: collapsed ? "center" : "flex-start",
				}}>
					{!collapsed && (
						<Title level={3} style={{ margin: "0 0 0 10px", color: "#03333d" }}>
							Citio
						</Title>
					)}
					<Image width={40} src={logo} preview={false} />
				</div>
      }
      onClose={() => setDrawerOpen(false)}
      open={drawerOpen}
      placement={En ? "left" : "right"}
      style={{ background: siderBg }}
      width={230}
    >
      {menuItems.length > 0 && (
  <Menu
    mode="inline"
    selectedKeys={[getKey(location.pathname)]}
    onClick={handleMenuClick}
    items={menuItems}
    style={{ background: siderBg }}
  />
)}

    </Drawer>
  ) : (
    
    <Sider
      collapsible trigger={null}
      width={230}
      collapsed={collapsed}
      style={{ background: siderBg }}
      
    >
      <div
				style={{
					padding: "12px",
					display: "flex",
					alignItems: "center",
					cursor: "pointer",
					justifyContent: collapsed ? "center" : "flex-start",
				}}
				onClick={handleLogoClick}
			>
				{!collapsed && (
					<Title level={6} style={{ margin: "0 0 0 10px", color: "#03333d" }}>
						Citio
					</Title>
				)}
				<Image width={40} src={logo} preview={false} />
			</div>
      {menuItems.length > 0 && (
  <Menu
    mode="inline"
    selectedKeys={[getKey(location.pathname)]}
    onClick={handleMenuClick}
    items={menuItems}
    style={{ background: siderBg , borderRight: 0 }}
  />
)}

    </Sider>
  );
};

export default Sidebar;