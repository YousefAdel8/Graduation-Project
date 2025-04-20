import React, { useState } from 'react';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { Button } from 'antd';

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

  return (
    <Button
      type="text"
      icon={isFullscreen ? <FullscreenExitOutlined style={{ fontSize: "20px" }} /> : <FullscreenOutlined style={{ fontSize: "20px" }}/>}
      onClick={toggleFullscreen}
      className='mt-2'
    />
  );
};

export default FullScreen;
