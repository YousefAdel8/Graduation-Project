import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { LockOutlined } from '@ant-design/icons';

const ChangePasswordModal = ({ visible, onCancel, onSuccess, En }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
  try {
    const values = await form.validateFields();
    setLoading(true);
    
    const token = localStorage.getItem("userToken");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.put(
      "https://cms-reporting.runasp.net/api/users/change-password",
      {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Password change response:", response.data);

    message.success(
      En ? "Password changed successfully" : "تم تغيير كلمة المرور بنجاح"
    );
    onSuccess();
    form.resetFields();
  } catch (error) {
    console.error("Error changing password:", error);
    // Handle specific error cases
    if (error.response?.status === 400) {
      message.error(
        En ? "Current password is incorrect" : "كلمة المرور الحالية غير صحيحة"
      );
      form.setFields([
        {
          name: 'oldPassword',
          errors: [En ? 'Incorrect password' : 'كلمة المرور غير صحيحة'],
        }
      ]);
    } else {
      message.error(
        error.response?.data?.message || 
        (En ? "Failed to change password" : "فشل تغيير كلمة المرور")
      );
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <Modal
      title={En ? "Change Password" : "تغيير كلمة المرور"}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          {En ? "Cancel" : "إلغاء"}
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          {En ? "Submit" : "تأكيد"}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="oldPassword"
          label={En ? "Current Password" : "كلمة المرور الحالية"}
          rules={[
            {
              required: true,
              message: En
                ? "Please input current password"
                : "الرجاء إدخال كلمة المرور الحالية",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={En ? "Current password" : "كلمة المرور الحالية"}
          />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label={En ? "New Password" : "كلمة المرور الجديدة"}
          rules={[
            {
              required: true,
              message: En
                ? "Please input new password"
                : "الرجاء إدخال كلمة المرور الجديدة",
            },
            {
              min: 8,
              message: En
                ? "Password must be at least 8 characters"
                : "كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={En ? "New password" : "كلمة المرور الجديدة"}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label={En ? "Confirm Password" : "تأكيد كلمة المرور"}
          dependencies={['newPassword']}
          rules={[
            {
              required: true,
              message: En
                ? "Please confirm password"
                : "الرجاء تأكيد كلمة المرور",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  En ? "Passwords do not match" : "كلمات المرور غير متطابقة"
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={En ? "Confirm new password" : "تأكيد كلمة المرور الجديدة"}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;