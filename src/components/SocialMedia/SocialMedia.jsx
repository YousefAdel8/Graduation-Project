import React, { useEffect, useState } from "react";
import { 
  Card, 
  Typography, 
  Tag, 
  Space, 
  Row, 
  Col, 
  Image, 
  Skeleton, 
  Empty,
  Button,
  Divider
} from "antd";
import { 
  HeartOutlined, 
  ShareAltOutlined, 
  CalendarOutlined,
  FileTextOutlined,
  EyeOutlined
} from "@ant-design/icons";
import { SocialMediaApi } from "./SocialMediaApi";
import { useLanguage } from "../../context/LanguageContext";

const { Title, Text, Paragraph } = Typography;

const CommunityFeed = () => {
  const { isEnglish: En } = useLanguage();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const data = await SocialMediaApi();
        if (Array.isArray(data)) {
          setReports(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </div>
    );
  }

  return (
    <div style={{ 
      margin: "0 auto", 
      padding: "20px",
      minHeight: "100vh",
      direction: En ? "ltr" : "rtl"
    }}>
      {/* Header */}
      <div style={{ 
        textAlign: "center", 
        marginBottom: "40px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "30px",
        borderRadius: "15px",
        color: "white"
      }}>
        <FileTextOutlined style={{ fontSize: "48px", marginBottom: "10px" }} />
        <Title level={2} style={{ color: "white", margin: "0" }}>
          {En ? "Community Reports Dashboard" : "لوحة تقارير المجتمع"}
        </Title>
        <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px" }}>
          {En ? `${reports.length} Reports Available` : `${reports.length} تقرير متاح`}
        </Text>
      </div>

      {/* Reports Grid */}
      <Row gutter={[20, 20]}>
        {reports.map((report) => (
          <Col xs={24} md={12} lg={8} key={report.reportId}>
            <Card
              style={{
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                border: "none",
                height: "100%"
              }}
              cover={
                report.photoUrl ? (
                  <div style={{ maxHeight: "300px", overflow: "hidden" }}>
                    <Image
                      src={`https://cms-reporting.runasp.net/${report.photoUrl}`}
                      alt="تقرير"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                      placeholder={<Skeleton.Image style={{ width: "100%", height: "200px" }} />}
                    />
                  </div>
                ) : (
                  <div style={{
                    height: "200px",
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "48px"
                  }}>
                    📋
                  </div>
                )
              }
              actions={[
                <span type="text"  style={{ color: "#ff4d4f" }}>
                  {report.likes} {<HeartOutlined />}
                </span>,
                <span type="text"  style={{ color: "#1890ff" }}>
                  {report.shares} {<ShareAltOutlined />}
                </span>,
                <span type="text" icon={<EyeOutlined />} style={{ color: "#52c41a" }}>
                  {En ? "View" : "عرض"}
                </span>
              ]}
            >
              <Card.Meta
                title={
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Text strong style={{ fontSize: "16px", color: "#001529" }}>
                      {En ? `Report #${report.reportId}` : `تقرير #${report.reportId}`}
                    </Text>
                    <Tag 
                      style={{ fontSize: "12px", fontWeight: "bold" , backgroundColor: "#e6f7ff", color: "#1890ff" }}
                    >
                      {report.issueCategory}
                    </Tag>
                  </div>
                }
                description={
                  <div>
                    <Paragraph
                      ellipsis={{ rows: 2, expandable: true, symbol: En ? 'more' : 'المزيد' }}
                      style={{ fontSize: "14px", color: "#555", marginBottom: "15px" }}
                    >
                      {report.description}
                    </Paragraph>
                    
                    <Divider style={{ margin: "10px 0" }} />
                    
                    <Space style={{ fontSize: "12px", color: "#888" }}>
                      <span>
                        <CalendarOutlined style={{ marginLeft: "5px" }} /> 
                        {formatDate(report.postedAt)}
                      </span>
                    </Space>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Empty State */}
      {reports.length === 0 && !loading && (
        <Empty
          style={{ marginTop: "50px" }}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <Title level={4} style={{ color: "#888" }}>
              {En ? "No Reports Available" : "لا توجد تقارير متاحة"}
            </Title>
          }
        />
      )}
    </div>
  );
};

export default CommunityFeed;