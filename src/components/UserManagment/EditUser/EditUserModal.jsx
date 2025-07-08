import React, { useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Typography,
  Button,
  message,
  theme
} from 'antd';
import { UserOutlined, TeamOutlined, SaveOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

const EditUserModal = ({ 
  visible, 
  onClose, 
  selectedUser, 
  onSuccess,
  En = true, 
  hideEmail = false 
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const { token } = theme.useToken();

  const defaultRoles = [
    { label: En ? 'Admin' : 'مدير', value: 'Admin' },
    { label: En ? 'Dashboard' : 'لوحة التحكم', value: 'Dashboard' },
    { label: En ? 'Feedback' : 'التقييمات', value: 'Feedback' },
    { label: En ? 'Manager' : 'مدير', value: 'Manager' },
  ];

  useEffect(() => {
    setRoles(defaultRoles);
  }, [En]);

  useEffect(() => {
    if (visible && selectedUser) {
      form.setFieldsValue({
        fullName: selectedUser.fullName,
        roles: selectedUser.roles || []
      });
    }
  }, [visible, selectedUser, form]);

  const handleSubmit = async (values) => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      console.warn("No token found in localStorage.");
      return;
    }
    if (!selectedUser?.id) {
      message.error(En ? 'User ID is missing' : 'معرف المستخدم مفقود');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(`https://cms-reporting.runasp.net/api/users/${selectedUser.id}`, {
        fullName: values.fullName,
        roles: values.roles,
      }, {
        headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
      });

      message.success(En ? 'User updated successfully' : 'تم تحديث المستخدم بنجاح');
      
      if (onSuccess) {
        onSuccess(response.data);
      }
      
      handleClose();
    } catch (error) {
      console.error('Error updating user:', error);
      const errorMessage = error.response?.data?.message || 
        (En ? 'Failed to update user' : 'فشل في تحديث المستخدم');
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserOutlined style={{ color: token.colorPrimary }} />
          <span>{En ? 'Edit User' : 'تعديل المستخدم'}</span>
        </div>
      }
      open={visible}
      onCancel={handleClose}
      width={600}
      footer={[
        <Button key="cancel" onClick={handleClose}>
          {En ? 'Cancel' : 'إلغاء'}
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => form.submit()}
          icon={<SaveOutlined />}
        >
          {En ? 'Save Changes' : 'حفظ التغييرات'}
        </Button>
      ]}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ marginTop: '24px' }}
      >
        <div style={{ marginBottom: "32px" }}>
          <Title
            level={4}
            style={{
              color: token.colorPrimary,
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <UserOutlined />
            {En ? "Personal Information" : "المعلومات الشخصية"}
          </Title>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={hideEmail ? 24 : 12}>
              <Form.Item
                name="fullName"
                label={
                  <Text strong style={{ fontSize: "16px" }}>
                    {En ? "Full Name" : "الاسم الكامل"}
                  </Text>
                }
                rules={[
                  {
                    required: true,
                    message: En
                      ? "Please enter full name"
                      : "الرجاء إدخال الاسم الكامل",
                  },
                ]}
              >
                <Input
                  prefix={
                    <UserOutlined
                      style={{ color: token.colorTextTertiary }}
                    />
                  }
                  placeholder={En ? "Enter full name" : "أدخل الاسم الكامل"}
                  style={{ borderRadius: "8px" }}
                />
              </Form.Item>
            </Col>

            {/* Email */}
            {!hideEmail && (
              <Col xs={24} md={12}>
                <div>
                  <Text strong style={{ fontSize: "16px" }}>
                    {En ? "Email" : "البريد الإلكتروني"}
                  </Text>
                  <div style={{ 
                    padding: '8px 12px', 
                    background: token.colorBgContainer,
                    border: `1px solid ${token.colorBorder}`,
                    borderRadius: '8px',
                    marginTop: '8px'
                  }}>
                    <Text type="secondary">{selectedUser?.email || 'N/A'}</Text>
                  </div>
                </div>
              </Col>
            )}
          </Row>
        </div>

        {/* Access & Permissions */}
        <div style={{ marginBottom: "32px" }}>
          <Title
            level={4}
            style={{
              color: token.colorPrimary,
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <TeamOutlined />
            {En ? "Access & Permissions" : "الصلاحيات والأذونات"}
          </Title>

          <Row gutter={[24, 24]}>
            <Col xs={24}>
              <Form.Item
                name="roles"
                label={
                  <Text strong style={{ fontSize: "16px" }}>
                    {En ? "User Roles" : "أدوار المستخدم"}
                  </Text>
                }
                rules={[
                  {
                    required: true,
                    type: "array",
                    min: 1,
                    message: En
                      ? "Please select at least one role"
                      : "يجب اختيار دور واحد على الأقل",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%", borderRadius: "8px" }}
                  placeholder={
                    En ? "Select user roles" : "اختر أدوار المستخدم"
                  }
                  options={roles}
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
    </Modal>
  );
};

export default EditUserModal;