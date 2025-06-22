import React from 'react';
import { Button, Tooltip } from 'antd';
import { useTheme } from '../../context/ThemeContext';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';

export default function DarkModeButton() {
  const { isDark, toggleToDark, toggleToLight } = useTheme();

  const handleToggle = () => {
    isDark ? toggleToLight() : toggleToDark();
  };

  return (
    <Tooltip title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
      <Button
        onClick={handleToggle}
        icon={isDark ? <BulbFilled /> : <BulbOutlined />}
        style={{
          backgroundColor: isDark ? '#001529' : '#f0f0f0',
          color: isDark ? '#ffffff' : '#000000',
          border: isDark ? '1px solid #1890ff' : '1px solid #ccc',
          boxShadow: isDark ? '0 0 6px #1890ff' : '0 0 4px #aaa',
          transition: 'all 0.3s ease',
          padding: '6px 16px',
          borderRadius: '6px',
          fontWeight: 'bold',
        }}
      >
        {isDark ? 'Dark Mode' : 'Light Mode'}
      </Button>
    </Tooltip>
  );
}
