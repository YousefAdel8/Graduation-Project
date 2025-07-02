import React, { useState } from 'react';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useLanguage } from '../../context/LanguageContext';

const FullScreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  const { isEnglish } = useLanguage();

  return (
    <Tooltip title={isEnglish ? ' Switch to Fullscreen' : 'تبديل إلى الوضع الملء الشاشة'}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',paddingLeft: 3 }} onClick={toggleFullscreen}>
        <Button
      type="text"
      icon={isFullscreen ? <FullscreenExitOutlined style={{ fontSize: "20px" }} /> : <FullscreenOutlined style={{ fontSize: "20px" }}/>}
      className='mt-2'
    />
    <span>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
    </div>
    </Tooltip>
  );
};

export default FullScreen;
