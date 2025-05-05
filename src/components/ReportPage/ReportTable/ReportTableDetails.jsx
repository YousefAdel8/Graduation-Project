import React, { useEffect, useState } from "react";
import {
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    SearchOutlined,
    SyncOutlined,
} from "@ant-design/icons";
import { Button, Tag, Modal } from "antd";
import { useLanguage } from "../../../context/LanguageContext";
import axios from "axios";

const ReportTableDetails = ({ open, reportId, onClose }) => {
    const { isEnglish: En } = useLanguage();

    const [loading, setLoading] = useState(false);
    const [reportDetails, setReportDetails] = useState(null);

    const statusTranslations = {
        Active: En ? "Active" : "تم الإبلاغ عنه",
        InProgress: En ? "In Progress" : "قيد التنفيذ",
        Resolved: En ? "Resolved" : "تم الحل",
    };
    const statusColors = {
        Active: "blue",
        InProgress: "orange",
        Resolved: "green",
    };
    const statusIcons = {
        Active: <ExclamationCircleOutlined />,
        InProgress: <SyncOutlined />,
        Resolved: <CheckCircleOutlined />,
    };

    // كل ما يتغير reportId أو يتفتح المودال، fetch details
    useEffect(() => {
        if (open && reportId) {
            setLoading(true);
            axios
                .get(`https://cms-reporting.runasp.net/api/Report/${reportId}`)
                .then(({ data }) => {
                    if (data.isSuccess && data.value) {
                        setReportDetails(data.value);
                    } else {
                        setReportDetails(null);
                        Modal.error({
                            title: En ? "Error" : "خطأ",
                            content: En
                                ? "Failed to load report details. Please try again."
                                : "فشل في تحميل تفاصيل التقرير. يرجى المحاولة مرة أخرى.",
                        });
                    }
                })
                .catch(() => {
                    setReportDetails(null);
                    Modal.error({
                        title: En ? "Error" : "خطأ",
                        content: En
                            ? "Failed to load report details. Please try again."
                            : "فشل في تحميل تفاصيل التقرير. يرجى المحاولة مرة أخرى.",
                    });
                })
                .finally(() => setLoading(false));
        } else if (!open) {
            setReportDetails(null);
            setLoading(false);
        }
    }, [open, reportId, En]);
  return (
    <>
    <Modal
  title={
    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1890ff' }}>
      {En ? "Report Details" : "تفاصيل التقرير"}
    </div>
  }
  open={open}
  onCancel={onClose}
  footer={[
    <Button key="close" type="primary" onClick={onClose}>
      {En ? "Close" : "إغلاق"}
    </Button>,
  ]}
  width={700}
  centered
  destroyOnClose
  maskClosable={false}
  dir={En ? "ltr" : "rtl"}
  bodyStyle={{ padding: '20px' }}
>
  {loading ? (
    <div style={{ 
      textAlign: "center", 
      padding: "40px 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div className="ant-spin ant-spin-spinning">
        <span className="ant-spin-dot">
          <i className="ant-spin-dot-item"></i>
          <i className="ant-spin-dot-item"></i>
          <i className="ant-spin-dot-item"></i>
          <i className="ant-spin-dot-item"></i>
        </span>
      </div>
      <div style={{ marginTop: "15px", color: "#666" }}>
        {En ? "Loading report details..." : "جاري تحميل تفاصيل التقرير..."}
      </div>
    </div>
  ) : reportDetails ? (
    <div style={{ 
      backgroundColor: "#f9f9f9", 
      borderRadius: "8px", 
      padding: "15px",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)"
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
        <div style={{ 
          padding: '12px 15px', 
          borderBottom: '1px solid #eee', 
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          borderRadius: '6px'
        }}>
          <span style={{ fontWeight: 'bold', color: '#555' }}>
            {En ? "User Name:" : "اسم المستخدم:"}
          </span>
          <span>{reportDetails.mobileUserName}</span>
        </div>
        
        <div style={{ 
          padding: '12px 15px', 
          borderBottom: '1px solid #eee', 
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          borderRadius: '6px'
        }}>
          <span style={{ fontWeight: 'bold', color: '#555' }}>
            {En ? "Phone Number:" : "رقم الهاتف:"}
          </span>
          <span dir="ltr">{reportDetails.mobileUserPhone}</span>
        </div>
        
        <div style={{ 
          padding: '12px 15px', 
          borderBottom: '1px solid #eee', 
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          borderRadius: '6px'
        }}>
          <span style={{ fontWeight: 'bold', color: '#555' }}>
            {En ? "Issue Category:" : "نوع المشكلة:"}
          </span>
          <span>
            {En
              ? reportDetails.issueCategoryEN
              : reportDetails.issueCategoryAR}
          </span>
        </div>
        
        <div style={{ 
          padding: '12px 15px', 
          borderBottom: '1px solid #eee',
          backgroundColor: 'white',
          borderRadius: '6px'
        }}>
          <div style={{ fontWeight: 'bold', color: '#555', marginBottom: '5px' }}>
            {En ? "Description:" : "الوصف:"}
          </div>
          <div style={{ 
            padding: '10px', 
            backgroundColor: '#f5f5f5', 
            borderRadius: '4px',
            minHeight: '60px',
            lineHeight: '1.5'
          }}>
            {reportDetails.description}
          </div>
        </div>
        
        <div style={{ 
          padding: '12px 15px', 
          borderBottom: '1px solid #eee', 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: '6px'
        }}>
          <span style={{ fontWeight: 'bold', color: '#555' }}>
            {En ? "Status:" : "الحالة:"}
          </span>
          <Tag
            icon={statusIcons[reportDetails.reportStatus]}
            color={statusColors[reportDetails.reportStatus]}
            style={{ fontSize: '14px', padding: '4px 8px' }}
          >
            {statusTranslations[reportDetails.reportStatus] ||
              reportDetails.reportStatus}
          </Tag>
        </div>
        
        <div style={{ 
          padding: '12px 15px', 
          borderBottom: '1px solid #eee', 
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          borderRadius: '6px'
        }}>
          <span style={{ fontWeight: 'bold', color: '#555' }}>
            {En ? "Submission Date:" : "تاريخ الإضافة:"}
          </span>
          <span>{new Date(reportDetails.dateIssued).toLocaleString()}</span>
        </div>
        
        <div style={{ 
          padding: '12px 15px', 
          borderBottom: '1px solid #eee', 
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          borderRadius: '6px'
        }}>
          <span style={{ fontWeight: 'bold', color: '#555' }}>
            {En ? "Address:" : "العنوان:"}
          </span>
          <span>{reportDetails.address}</span>
        </div>
        
        <div style={{ 
          padding: '12px 15px', 
          borderBottom: '1px solid #eee', 
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          borderRadius: '6px'
        }}>
          <span style={{ fontWeight: 'bold', color: '#555' }}>
            {En ? "Location:" : "الموقع:"}
          </span>
          <span>{`${reportDetails.latitude}, ${reportDetails.longitude}`}</span>
        </div>
        
        {reportDetails.imageUrl && (
          <div style={{ 
            padding: '12px 15px',  
            backgroundColor: 'white',
            borderRadius: '6px'
          }}>
            <div style={{ fontWeight: 'bold', color: '#555', marginBottom: '10px' }}>
              {En ? "Issue Image:" : "صورة المشكلة:"}
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              padding: '15px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px'
            }}>
              <img
                src={
                  reportDetails.imageUrl.startsWith("http")
                    ? reportDetails.imageUrl
                    : `https://cms-reporting.runasp.net/${reportDetails.imageUrl}`
                }
                alt={En ? "Issue image" : "صورة المشكلة"}
                style={{
                  maxWidth: "100%",
                  maxHeight: "350px",
                  objectFit: "contain",
                  borderRadius: "4px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/400x300?text=Image+Not+Available";
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div style={{ 
      textAlign: "center", 
      padding: "30px 20px",
      color: "#999",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      fontSize: "16px"
    }}>
      <div style={{ fontSize: '24px', marginBottom: '10px' }}>
        <SearchOutlined />
      </div>
      {En
        ? "No report details available"
        : "لا توجد تفاصيل متاحة للتقرير"}
    </div>
  )}
</Modal>
</>
  )
}
export default ReportTableDetails;
