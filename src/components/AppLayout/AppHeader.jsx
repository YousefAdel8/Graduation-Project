import React from "react";
import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import NotificationButton from "../NotificationButton/NotificationButton";
import LanguageToggle from "../LanguageButton/LanguageButton";
import FullScreen from "../FullScreenFeature/FullScreen";
import DropdownProfile from "../DropdownProfile/DropdownProfile";
import DarkModeButton from "../DarkModeButton/DarkModeButton";
import { useTheme } from "../../context/ThemeContext"; 

const { Header } = Layout;

const AppHeader = ({
  En, isMobile, collapsed, setCollapsed, drawerOpen, setDrawerOpen,
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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Toggle sidebar/drawer */}
        <Button
          type="text"
          icon={
            En
              ? isMobile
                ? <MenuUnfoldOutlined />
                : collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
              : isMobile
              ? <MenuFoldOutlined />
              : collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />
          }
          onClick={() => (isMobile ? setDrawerOpen(true) : setCollapsed(!collapsed))}
          style={{ fontSize: 18, width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}
        />
        {/* Utility buttons */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <DarkModeButton />
          <NotificationButton />
          <LanguageToggle />
          <FullScreen />
          <DropdownProfile />
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;