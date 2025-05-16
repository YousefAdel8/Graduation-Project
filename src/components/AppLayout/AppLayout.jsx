import React, { useState, useEffect, useContext } from "react";
import { ConfigProvider, Layout, theme } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import AppHeader from "./AppHeader";
import { useLanguage } from "../../context/LanguageContext";
import { PermissionContext } from "../../context/PermissionContext";

const { Content } = Layout;

const AppLayout = () => {

  const { isEnglish: En } = useLanguage();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  // Routing
  const location = useLocation();
  const navigate = useNavigate();
  // Permissions from context
  const { permissions } = useContext(PermissionContext);

  // Handle responsive breakpoint
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Theme tokens 
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <ConfigProvider direction={En ? "ltr" : "rtl"}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar
          En={En}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          isMobile={isMobile}
          navigate={navigate}
          location={location}
          permissions={permissions}
          colorBgContainer={colorBgContainer}
        />
        <Layout>
          <AppHeader
            En={En}
            isMobile={isMobile}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
          />
          <Content
            style={{
              margin: 16,
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