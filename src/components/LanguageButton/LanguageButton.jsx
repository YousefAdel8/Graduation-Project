import React from 'react';
import { Switch } from 'antd';
import { useLanguage } from '../../context/LanguageContext';

export default function LanguageToggle() {
  const { isEnglish, toggleToEnglish, toggleToArabic } = useLanguage();

  const handleToggle = (checked) => {
    if (checked) {
      toggleToEnglish();
    } else {
      toggleToArabic();
    }
  };

  return (
      <Switch
        checked={isEnglish}
        onChange={handleToggle}
        checkedChildren="EN"
        unCheckedChildren="AR"
        style={{ backgroundColor: isEnglish ? '#1890ff' : '#504142' }}
      />
  );
}
