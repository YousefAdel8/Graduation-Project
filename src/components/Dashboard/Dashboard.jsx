import React from 'react';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { Card, Row, Col, Statistic, Typography, Space } from 'antd';
import TableSearch from './FeedbackTable/FeedbackTable.jsx';
const { Title, Text } = Typography;


ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = ({ En = true }) => {
  const data = {
    labels: En ? ["January", "February", "March", "April", "May"] : ["يناير", "فبراير", "مارس", "أبريل", "مايو"],
    datasets: [
      {
        label: En ? "Reports" : "التقارير",
        data: [10, 20, 15, 30, 25],
        backgroundColor: "rgb(2, 8, 23)",
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: true, 
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value; 
          }
        }
      }
    }
  };
  
  const stats = [
    { title: En ? 'Total Reports Received' : 'التقارير المستلمة', value: '445', percentage: '+20.1', period: En ? 'Last Month' : 'من الشهر الماضي' },
    { title: En ? 'Critical Reports' : 'التقارير الحرجة', value: '167', percentage: '+180.1', period: En ? 'Last Month' : 'من الشهر الماضي' },
    { title: En ? 'Resolved Reports' : 'التقارير التي تم حلها', value: '430', percentage: '+19', period: En ? 'Last Month' : 'من الشهر الماضي' },
    { title: En ? 'Pending Reports' : 'تقارير قيد المراجعة', value: '30', percentage: '+201', period: En ? 'Last Hour' : 'منذ الساعة الماضية' },
  ];

  const dataServiceIssue = [
    {
      key: '1',
      name: En?'Electricity':'الكهرباء',
      percentage: 32,
    },
    {
      key: '2',
      name: En?'Gas':'الغاز',
      percentage: 42,
    },
    {
      key: '3',
      name: En?'Water':'المياه',
      percentage: 42,
    },
    {
      key: '4',
      name: En?'Internet':'الانترنت',
      percentage: 42,
    },
    {
      key: '5',
      name: En?'Telecom':'الاتصالات',
      percentage: 42,
    },
  ];
  
  
  return (
    <>
      <Title level={3} style={{ marginBottom: 24 }} className='fw-bold'>{En ? 'Dashboard' : 'لوحة التحكم'}</Title>
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card bodyStyle={{ padding: '20px' }} className="shadow-sm">
              <Statistic
                title={<Typography.Text>{stat.title}</Typography.Text>}
                value={stat.value}
                style={{ marginBottom: 8 }}
              />
              <Text type="secondary">
                <Text type="success">{stat.percentage}%</Text> {stat.period}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={14}>
          <Card 
            title={En ? "Monthly rate of receiving reports" : "معدل استقبال التقارير شهريا"} 
            bodyStyle={{ padding: '20px' }}
            className='shadow-sm'
          >
            <div className='w-100 h-100' >
              <Bar 
                data={data} 
                options={options}
                className='w-100 h-100'
              />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card 
            title={En ? "Service Issue Distribution" : "توزيع مشكلات الخدمات" }
            bodyStyle={{ padding: '10px 20px' }}
            className='shadow-sm'
          >
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              {dataServiceIssue.map((item) => (
                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography.Text>{item.name}</Typography.Text>
                  <Typography.Text>{item.percentage}%</Typography.Text>
                </div>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} sm={24} lg={24}>
          <Card bodyStyle={{ padding: '0px', width: '100%'}} className="shadow-sm">
            <TableSearch /> 
          </Card> 
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;