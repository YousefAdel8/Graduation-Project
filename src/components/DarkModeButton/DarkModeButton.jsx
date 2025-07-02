import React from 'react';
import { Button, Tooltip, theme } from 'antd';
import { useTheme } from '../../context/ThemeContext';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import { useLanguage } from '../../context/LanguageContext';

export default function DarkModeButton() {
  const { isDark, toggleToDark, toggleToLight } = useTheme();
  const { token } = theme.useToken();
  const { isEnglish: En } = useLanguage();
  const handleToggle = () => {
    if (isDark) {
      toggleToLight();
    } else {
      toggleToDark();
    }
  };

  return (
    <Tooltip title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
      <div onClick={handleToggle} style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0'}}>
        <Button
        icon={isDark ? <BulbFilled style={{ fontSize: 18 }} /> : <BulbOutlined style={{ fontSize: 18 }} />}
        shape="circle"
        size="large"
        style={{
          backgroundColor: isDark ? token.colorBgElevated : token.colorBgContainer,
          color: isDark ? token.colorTextLightSolid : token.colorText,
          border: `1px solid ${token.colorBorder}`,
          transition: 'all 0.3s ease',
        }}
      /> <span>{isDark ? (En ? "Light Mode" : "الوضع الفاتح") : (En ? "Dark Mode" : "الوضع الداكن")}</span>
      </div>
      

    </Tooltip>
  );
}
