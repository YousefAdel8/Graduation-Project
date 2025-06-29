import React, { useEffect, useState } from "react";
import { Modal, Button, Tag, Avatar, Spin, Image, List, Typography, Row, Col } from "antd";
import { CheckCircleOutlined, ExclamationCircleOutlined, SyncOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useLanguage } from "../../../context/LanguageContext";

const { Text } = Typography;

const statusMap = {
  Active: { label: { en: "Active", ar: "تم الإبلاغ عنه" }, color: "blue", icon: <ExclamationCircleOutlined /> },
  InProgress: { label: { en: "In Progress", ar: "قيد التنفيذ" }, color: "orange", icon: <SyncOutlined /> },
  Resolved: { label: { en: "Resolved", ar: "تم الحل" }, color: "green", icon: <CheckCircleOutlined /> },
};

const ReportTableDetails = ({ open, reportId, onClose }) => {
  const { isEnglish: En } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  useEffect(() => {
    if (open && reportId) {
      setLoading(true);
      axios.get(`https://cms-reporting.runasp.net/api/Report/${reportId}`)
        .then(({ data }) => setReport(data.isSuccess && data.value ? data.value : null))
        .catch(() => setReport(null))
        .finally(() => setLoading(false));
    } else if (!open) {
      setReport(null);
    }
  }, [open, reportId]);

  const formatDate = dateStr => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString(En ? "en" : "ar", {
      year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
    });
  };

  const getStatusHistory = () => {
    if (!report?.statusHistory?.length) {
      return [{ status: "No history available", date: new Date(), user: { name: "", avatar: "" }, description: "No status updates" }];
    }
    return report.statusHistory.sort((a, b) => new Date(b.changedAt) - new Date(a.changedAt)).map(item => ({
      status: item.status,
      user: { name: item.changedBy || "System User", avatar: "", role: item.role || "System User" },
      date: new Date(item.changedAt),
      description: item.comment || "No description provided"
    }));
  };

  const getImageUrl = () => {
    if (!report?.imageUrl) return "https://placehold.co/300x200?text=No+Image";
    return report.imageUrl.startsWith("http") ? report.imageUrl : `https://cms-reporting.runasp.net/${report.imageUrl}`;
  };

  return (
    <Modal
      title={<div style={{ fontSize: 20, fontWeight: "bold", color: "#1a3353" }}>{En ? "Report Details" : "تفاصيل التقرير"}</div>}
      open={open}
      onCancel={onClose}
      width={800}
      footer={[<Button key="close" onClick={onClose}>{En ? "Close" : "إغلاق"}</Button>]}
      style={{ top: 20 }}
      centered
    >
      {loading ? (
        <div style={{ textAlign: "center", padding: 50 }}>
          <Spin size="large" />
          <div style={{ marginTop: 15, color: "#666" }}>{En ? "Loading report details..." : "جاري تحميل التفاصيل..."}</div>
        </div>
      ) : !report ? (
        <div style={{ textAlign: "center", padding: 40, color: "#888" }}>{En ? "No report details available" : "لا تتوفر بيانات لهذا التقرير"}</div>
      ) : (
        <div style={{ padding: "5px 0" }}>
          <div style={{ marginBottom: 25 }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={10}>
                <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 5, backgroundColor: "#fafafa", height: 200, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  <Image
                    src={getImageUrl()}
                    alt={En ? "Issue image" : "صورة المشكلة"}
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 6 }}
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x200?text=Image+Error"; }}
                  />
                </div>
                <div style={{ fontSize: 13, color: "#777", fontWeight: "bold", textAlign: "center", marginTop: 8 }}>
                  {En ? "Report ID" : "رقم التقرير"}: <span style={{ color: "#1a3353", marginRight: 5 }}>{report.reportNumber || `#${reportId}`}</span>
                </div>
              </Col>

              <Col xs={24} md={14}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
                  <div className="detail-item">
                    <div style={{ color: "#777", marginBottom: 3 }}>{En ? "Location" : "الموقع"}</div>
                    <div style={{ fontWeight: "500", fontSize: 15 }}>{report.address || "—"}</div>
                  </div>
                  <div className="detail-item">
                    <div style={{ color: "#777", marginBottom: 3 }}>{En ? "Current Status" : "الحالة الحالية"}</div>
                    <Tag icon={statusMap[report.reportStatus]?.icon} color={statusMap[report.reportStatus]?.color} style={{ padding: "3px 10px", fontSize: 14 }}>
                      {statusMap[report.reportStatus]?.label[En ? "en" : "ar"] || report.reportStatus}
                    </Tag>
                  </div>
                  <div className="detail-item">
                    <div style={{ color: "#777", marginBottom: 3 }}>{En ? "Submission Date" : "تاريخ الإضافة"}</div>
                    <div>{formatDate(report.dateIssued)}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar size={36} icon={<UserOutlined />} style={{ backgroundColor: "#1a3353" }} src={report.userAvatarUrl} />
                    <div>
                      <div style={{ color: "#777", fontSize: 12 }}>{En ? "Submitted By" : "بواسطة"}</div>
                      <div style={{ fontWeight: "600" }}>{report.mobileUserName}</div>
                      <div style={{ fontSize: 12, color: "#666" }}>{report.mobileUserPhone || ""}</div>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div style={{ color: "#777", marginBottom: 3 }}>{En ? "Coordinates" : "الإحداثيات"}</div>
                    <div style={{ fontSize: 14 }}>{report.latitude}, {report.longitude}</div>
                  </div>
                  <div className="detail-item">
                    <div style={{ color: "#777", marginBottom: 3 }}>{En ? "Issue Category" : "نوع المشكلة"}</div>
                    <div style={{ fontWeight: "500" }}>{En ? report.issueCategoryEN : report.issueCategoryAR}</div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ color: "#555", marginBottom: 6, fontWeight: "600", fontSize: 15 }}>{En ? "Description" : "الوصف"}</div>
            <div style={{ padding: "14px 18px", background: "#f8f8fa", borderRadius: 8, minHeight: 60, fontSize: 14, color: "#333", lineHeight: 1.5, border: "1px solid #eee" }}>
              {report.description || (En ? "No description provided" : "لم يتم إضافة وصف")}
            </div>
          </div>
          
          <div>
            <div style={{ marginBottom: 14, fontWeight: "600", fontSize: 16, color: "#1a3353", borderBottom: "1px solid #eee", paddingBottom: 8 }}>
              {En ? "Status History" : "تاريخ الحالة"}
            </div>
            
            <List
              itemLayout="horizontal"
              dataSource={getStatusHistory()}
              renderItem={(item, index) => (
                <List.Item
                  style={{ borderBottom: index !== getStatusHistory().length - 1 ? "1px solid #f0f0f0" : "none", padding: "12px 0", backgroundColor: "#fff" }}
                  actions={[<Text type="secondary" style={{ fontSize: "12px" }}>{formatDate(item.date)}</Text>]}
                >
                  <List.Item.Meta
                    avatar={
                      <div style={{ fontSize: 20, color: statusMap[item.status]?.color || "#999", marginRight: 8 }}>
                        {statusMap[item.status]?.icon || <CheckCircleOutlined />}
                      </div>
                    }
                    title={
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ fontWeight: "600", color: "#333" }}>
                          {statusMap[item.status]?.label[En ? "en" : "ar"] || item.status}
                        </span>
                      </div>
                    }
                    description={
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "5px 0" }}>
                          <Avatar size={24} icon={<UserOutlined />} src={item.user.avatar} style={{ backgroundColor: "#5a6b84" }} />
                          <span style={{ fontWeight: "500", color: "#444" }}>{item.user.name}</span>
                          <span style={{ color: "#777", fontSize: 12 }}>{item.user.role}</span>
                        </div>
                        <div style={{ color: "#555", fontSize: 13, lineHeight: 1.4, marginTop: 3 }}>{item.description}</div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ReportTableDetails;