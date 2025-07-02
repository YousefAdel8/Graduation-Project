import React from 'react';
import { Button, Tooltip } from 'antd';
import { useLanguage } from '../../context/LanguageContext';
import { GlobalOutlined } from '@ant-design/icons';

export default function LanguageToggle() {
  const { isEnglish, toggleToEnglish, toggleToArabic } = useLanguage();

  const handleToggle = () => {
    if (isEnglish) {
      toggleToArabic();
    } else {
      toggleToEnglish();
    }
  };

  return (
    <Tooltip title={isEnglish ? 'Switch to Arabic' : 'تبديل إلى اللغة الإنجليزية'}>
      <div style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0',paddingLeft: 10,marginTop: 10}} onClick={handleToggle}>
          <GlobalOutlined style={{ fontSize: 18 }}/>
          <span>{isEnglish ? "Arabic Language" : "اللغة الانجليزية"}</span>
        </div>
    </Tooltip>
  );
}
