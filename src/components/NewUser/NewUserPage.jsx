import React from 'react'
import NewUser from './NewUser'
import {Typography} from 'antd'
import { useLanguage } from '../../context/LanguageContext';
const { Title } = Typography;
export default function NewUserPage() {
  const { isEnglish: En } = useLanguage();
  return <> 
  <Title level={3} className="fw-bold mb-6">
				{En ? "New User" : "مستخدم جديد"}
			</Title>
    <NewUser/>
    </>
}
