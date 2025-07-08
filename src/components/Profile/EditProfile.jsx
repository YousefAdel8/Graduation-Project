import React, { useState } from "react";
import { Form, Input, Row, Col, Button, message } from "antd";
import axios from "axios";
import { useLanguage } from "../../context/LanguageContext";

export default function EditProfile({ initialValues, onSuccess, onCancel }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { isEnglish: En } = useLanguage();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const requestData = {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phone
      };

      await axios.put(
        "https://cms-reporting.runasp.net/api/users/profile",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success(En ? "Profile updated successfully" : "تم تحديث الملف الشخصي بنجاح");
      onSuccess();
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error(En ? "Failed to update profile" : "فشل تحديث الملف الشخصي");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form 
      form={form} 
      initialValues={initialValues} 
      layout="vertical"
      style={{ maxWidth: 800, margin: '0 auto' }}
    >
      <Row gutter={[24, 16]}>
        {/* First Name */}
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Form.Item
            name="firstName"
            label={En ? "First Name" : "الاسم الأول"}
            rules={[
              {
                required: true,
                message: En
                  ? "Please enter first name"
                  : "الرجاء إدخال الاسم الأول",
              },
            ]}
          >
            <Input 
              placeholder={En ? "First Name" : "الاسم الأول"} 
              size="large"
            />
          </Form.Item>
        </Col>

        {/* Last Name */}
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Form.Item
            name="lastName"
            label={En ? "Last Name" : "الاسم الأخير"}
            rules={[
              {
                required: true,
                message: En
                  ? "Please enter last name"
                  : "الرجاء إدخال الاسم الأخير",
              },
            ]}
          >
            <Input 
              placeholder={En ? "Last Name" : "الاسم الأخير"} 
              size="large"
            />
          </Form.Item>
        </Col>

        {/* Phone Number */}
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            name="phone"
            label={En ? "Phone" : "رقم الهاتف"}
            rules={[
              {
                required: true,
                message: En
                  ? "Please enter phone number"
                  : "الرجاء إدخال رقم الهاتف",
              },
            ]}
          >
            <Input 
              placeholder={En ? "Phone Number" : "رقم الهاتف"} 
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Buttons - Responsive */}
      <Row justify="end" gutter={16}>
        <Col xs={12} sm={6} md={4} lg={3} xl={3}>
          <Button 
            block 
            onClick={onCancel} 
            size="large"
          >
            {En ? "Cancel" : "إلغاء"}
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} xl={3}>
          <Button 
            type="primary" 
            block 
            onClick={handleSubmit}
            loading={loading}
            size="large"
          >
            {En ? "Save" : "حفظ"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}