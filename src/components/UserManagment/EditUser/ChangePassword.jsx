import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useLanguage } from '../../../context/LanguageContext';

export default function ChangePassword({
  isPasswordModalOpen,
  selectedUserForPassword,
  closePasswordModal
}) {
  const { isEnglish: En } = useLanguage();
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

      await axios.put(
        `https://cms-reporting.runasp.net/api/users/${selectedUserForPassword.id}/reset-password`,
        {
          newPassword: values.newPassword
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success(En ? "Password changed successfully" : "تم تغيير كلمة المرور بنجاح");
      closePasswordModal();
      form.resetFields();
    } catch (error) {
      console.error("Error changing password:", error);
      message.error(En ? "Failed to change password" : "فشل تغيير كلمة المرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={En ? "Change Password" : "تغيير كلمة المرور"}
      open={isPasswordModalOpen}
      onOk={handleSubmit}
      onCancel={closePasswordModal}
      okText={En ? "Submit" : "تأكيد"}
      cancelText={En ? "Cancel" : "إلغاء"}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="newPassword"
          label={En ? "New Password" : "كلمة المرور الجديدة"}
          rules={[
            {
              required: true,
              message: En ? "Please input new password" : "الرجاء إدخال كلمة المرور الجديدة",
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
            placeholder={En ? "Enter new password" : "أدخل كلمة المرور الجديدة"}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label={En ? "Confirm Password" : "تأكيد كلمة المرور"}
          dependencies={['newPassword']}
          rules={[
            {
              required: true,
              message: En ? "Please confirm password" : "الرجاء تأكيد كلمة المرور",
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
            placeholder={En ? "Confirm new password" : "أعد إدخال كلمة المرور الجديدة"}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}