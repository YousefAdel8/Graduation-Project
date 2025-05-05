import React from 'react';
import { Table, Tag, Space, Button, Popconfirm } from "antd";
import { useLanguage } from '../../context/LanguageContext';
import { ClockCircleOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

export default function EmergencyTable() {
  const { isEnglish: En } = useLanguage();
  
  const dataSource = [
    {
      key: '1',
      userName: 'محمد أحمد',
      userPhone: '01012345678',
      emergencyType: 'fire', 
      location: 'القاهرة، مدينة نصر، شارع عباس العقاد',
      reportStatus: 'urgent',
      dateIssued: '2024-06-15T09:30:00',
      responders: 'وحدة إطفاء المطافي رقم 3 - شرق القاهرة'
    },
    {
      key: '2',
      userName: 'سارة علي',
      userPhone: '01187654321',
      emergencyType: 'medical', 
      location: 'الإسكندرية، سيدي جابر، شارع الإبراهيمية',
      reportStatus: 'in_progress',
      dateIssued: '2024-06-14T14:45:00',
      responders: 'سيارة إسعاف مستشفى السلام'
    },
    {
      key: '3',
      userName: 'أحمد محمود',
      userPhone: '01234567890',
      emergencyType: 'accident',
      location: 'الجيزة، طريق الواحات، كم 15',
      reportStatus: 'completed',
      dateIssued: '2024-06-13T18:20:00',
      responders: 'شرطة المرور - قسم الجيزة'
    },
    {
      key: '4',
      userName: 'هدى سمير',
      userPhone: '01099887766',
      emergencyType: 'security',
      location: 'القاهرة، المعادي، شارع 9',
      reportStatus: 'urgent',
      dateIssued: '2024-06-15T10:15:00',
      responders: 'قسم شرطة المعادي - دورية أمنية'
    },
    {
      key: '5',
      userName: 'كريم محسن',
      userPhone: '01000112233',
      emergencyType: 'gas_leak', 
      location: 'الإسكندرية، ميامي، شارع الملك',
      reportStatus: 'in_progress',
      dateIssued: '2024-06-14T20:30:00',
      responders: 'فريق الطوارئ - شركة الغاز الطبيعي'
    }
  ];

  const statusTranslations = {
    urgent: En ? "Urgent" : "طارئ للغاية",
    in_progress: En ? "In Progress" : "جاري الاستجابة",
    completed: En ? "Completed" : "تمت المعالجة"
  };
  
  const statusColors = {
    urgent: "red",
    in_progress: "blue",
    completed: "green"
  };
  
  const statusIcons = {
    urgent: <ExclamationCircleOutlined />,
    in_progress: <ClockCircleOutlined />,
    completed: <CheckCircleOutlined />
  };
  
  const emergencyTypeTranslations = {
    fire: En ? "Fire Incident" : "حريق",
    medical: En ? "Medical Emergency" : "حالة إسعافية",
    accident: En ? "Road Accident" : "حادث طريق",
    security: En ? "Security Incident" : "حادث أمني",
    gas_leak: En ? "Gas Leak" : "تسرب غاز"
  };
  
  const emergencyTypeColors = {
    fire: "volcano",
    medical: "geekblue",
    accident: "orange",
    security: "purple",
    gas_leak: "magenta"
  };
  
  const columns = [
    {
      title: En ? "User Name" : "اسم المستخدم",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: En ? "User Phone" : "هاتف المستخدم",
      dataIndex: "userPhone",
      key: "userPhone",
    },
    {
      title: En ? "Emergency Type" : "نوع الحالة الطارئة",
      dataIndex: "emergencyType",
      key: "emergencyType",
      render: (emergencyType) => {
        const label = emergencyTypeTranslations[emergencyType] || emergencyType;
        const color = emergencyTypeColors[emergencyType] || "default";
        
        return (
          <Tag color={color}>
            {label}
          </Tag>
        );
      },
    },
    {
      title: En ? "Location" : "الموقع",
      dataIndex: "location",
      key: "location",
      ellipsis: true,
    },
    {
      title: En ? "Status" : "حالة الاستجابة",
      dataIndex: "reportStatus",
      key: "reportStatus",
      render: (reportStatus) => {
        const label = statusTranslations[reportStatus] || reportStatus;
        const color = statusColors[reportStatus] || "default";
        const icon = statusIcons[reportStatus] || null;

        return (
          <Tag icon={icon} color={color}>
            {label}
          </Tag>
        );
      },
    },
    {
      title: En ? "Responders" : "المستجيبون",
      dataIndex: "responders",
      key: "responders",
      ellipsis: true,
    },
    {
      title: En ? "Date & Time" : "التاريخ والوقت",
      dataIndex: "dateIssued",
      key: "dateIssued",
      render: (dateIssued) => {
        return new Date(dateIssued).toLocaleString();
      },
    },
    {
      title: En ? "Action" : "العمليات",
      key: "action",
      width: 300,
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title={En ? "Close this emergency case?" : "إغلاق حالة الطوارئ؟"}
            description={
              En
                ? "Are you sure you want to mark this emergency as resolved?"
                : "هل أنت متأكد من إغلاق هذه الحالة الطارئة واعتبارها منتهية؟"
            }
            okText={En ? "Yes" : "نعم"}
            cancelText={En ? "No" : "لا"}
          >
            <Button type="primary" style={{ backgroundColor: "green" }}>
              {En ? "Complete" : "إنهاء"}
            </Button>
          </Popconfirm>

          <Button
            type="primary"
          >
            {En ? "Assign" : "توجيه"}
          </Button>
          
          <Button
            type="primary" 
            style={{ backgroundColor: "orange" }}
          >
            {En ? "Details" : "التفاصيل"}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 1200 }}
        pagination={{
          pageSize: 7,
          position: ["bottomCenter"],
          className: "custom-pagination",
        }}
      />
    </>
  );
}