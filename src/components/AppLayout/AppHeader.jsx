import React from "react";
import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import NotificationButton from "../NotificationButton/NotificationButton";
import LanguageToggle from "../LanguageButton/LanguageButton";
import FullScreen from "../FullScreenFeature/FullScreen";
import DropdownProfile from "../DropdownProfile/DropdownProfile";

const { Header } = Layout;

const AppHeader = ({
  En, isMobile, collapsed, setCollapsed, drawerOpen, setDrawerOpen,
}) => (
  <Header style={{ padding: "0 16px", background: "#fff", minHeight: 60 }}>
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
        <NotificationButton />
        <LanguageToggle />
        <FullScreen />
        <DropdownProfile />
      </div>
    </div>
  </Header>
);

export default AppHeader;