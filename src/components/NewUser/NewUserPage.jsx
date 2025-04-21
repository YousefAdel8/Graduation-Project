import React from 'react'
import NewUser from './NewUser'
import {Typography} from 'antd'
const { Title } = Typography;
export default function NewUserPage({En=false}) {
  return <> 
  <Title level={3} className="fw-bold mb-6">
				{En ? "New User" : "مستخدم جديد"}
			</Title>
    <NewUser/>
    </>
}
