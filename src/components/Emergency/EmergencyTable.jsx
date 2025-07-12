import React, { useEffect, useState } from 'react';
import { Table, Tag } from "antd";
import axios from "axios";
import { STATUS_COLOR, STATUS_ICON, STATUS_OPTS } from '../ReportPage/ReportTable/ReportStatus';
import { useLanguage } from '../../context/LanguageContext';

export default function EmergencyTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { En } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(
          "https://cms-reporting.runasp.net/api/MReport/emergency-reports",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.value);
        setData(response.data.value || []);
      } catch (error) {
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "نوع الحالة الطارئة",
      dataIndex: "emergencyType",
      key: "emergencyType",
    },
    {
      title: En ? "Status" : "الحالة",
      dataIndex: "status", 
      key: "status",
      render: (status) => {
        const statusMap = {
          "Active": "Active",
          "InProgress": "InProgress",
          "Resolved": "Resolved",
          "النشرطة": "Active", 
          "المتعامل": "InProgress"
        };
  
        const normalizedStatus = statusMap[status] || status;
        
        return (
          <Tag 
            icon={STATUS_ICON[normalizedStatus]} 
            color={STATUS_COLOR[normalizedStatus] || "default"}
          >
            {En 
              ? STATUS_OPTS.find((s) => s.value === normalizedStatus)?.en || normalizedStatus
              : STATUS_OPTS.find((s) => s.value === normalizedStatus)?.ar || normalizedStatus
            }
          </Tag>
        );
      },
    },
    {
      title: "التاريخ والوقت",
      dataIndex: "dateIssued",
      key: "dateIssued",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "العنوان",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "اسم المستخدم",
      dataIndex: "userFullName",
      key: "userFullName",
    },
    {
      title: "هاتف المستخدم",
      dataIndex: "userPhoneNumber",
      key: "userPhoneNumber",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="id"
      pagination={{ pageSize: 10, position: ["bottomCenter"] }}
      scroll={{ x: 900 }}
    />
  );
}