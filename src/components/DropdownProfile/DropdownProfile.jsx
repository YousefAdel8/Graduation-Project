import React, { useContext, useEffect, useState } from 'react';
import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Space } from 'antd';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/usercontext.jsx";
import { useLanguage } from '../../context/LanguageContext.jsx';
import { getTokenData } from '../TokenEncode/Token.jsx';
import { PermissionContext } from '../../context/PermissionContext.jsx';
const DropdownProfile= () => {
  const { isEnglish: En } = useLanguage();
    const navigate = useNavigate();
    const { setUserToken } = useContext(UserContext);
    const [clickedItem, setClickedItem] = useState(null);
    const userName= getTokenData()?.name || 'User';
    const firstName = userName.split(" ")[0];
    const { clearPermissions } = useContext(PermissionContext);

    const items = [
        {
            label: (
              <div
                style={{
                  padding: '8px 12px',
                  cursor: 'default',
                }}
                className='d-flex flex-column'
              >
                <span className='fw-bold'>{userName}</span>
                <span>yousefadel7474@gmail.com</span>
                
              </div>
            ),
            key: 'text',
          },
        {
          type: 'divider',
        },
        {
            label: (
              <span>
                <UserOutlined className='mx-3'/>
                {En ? 'Profile' : 'الملف الشخصي'}
              </span>
            ),
            key: 'profile',
          },
          {
            label: (
              <span>
                <LogoutOutlined  className='mx-3'/>
                {En ? 'Logout' : 'تسجيل الخروج'}
              </span>
            ),
            key: 'logout',
          },
      ];
      useEffect(() => {
        if (clickedItem === 'profile') {
          window.location.href = '/profile';
        } else if (clickedItem === 'logout') {
          localStorage.removeItem('userToken');
          clearPermissions();
          setUserToken(null);
          navigate('/');
        }
      }, [clickedItem, navigate, setUserToken]);

    return <>
  <Dropdown menu={{ items ,onClick: e => setClickedItem(e.key)}}>
    <a onClick={e => e.preventDefault()}>
        
    <Space>
          <Avatar
           size={40}
            icon={<UserOutlined />}
          />
          <span className='fw-bold '>{firstName}</span>
          <DownOutlined />
        </Space>
    </a>
  </Dropdown>
  </>
};
export default DropdownProfile;