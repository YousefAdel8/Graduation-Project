import React from 'react'
import NewAlertForm from './NewAlertForm'
import {Typography} from 'antd'
import { useLanguage } from '../../../context/LanguageContext';
const { Title } = Typography;
export default function NewAlertPage() {
    const { isEnglish: En } = useLanguage();
  return <> 
  <Title level={3} className="fw-bold mb-6">
                {En ? "Create Emergency Alert" : "انشاء انذار طوارئ"}
            </Title>
    <NewAlertForm/>
    </>
}
