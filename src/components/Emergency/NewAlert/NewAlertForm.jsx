import {
  Form,
  Input,
  Button,
  Checkbox,
  Divider,
  Space,
} from "antd";
import React from "react";
import { useLanguage } from "../../../context/LanguageContext";
import {
  MailOutlined,
  BellOutlined,
  MessageOutlined,
  InfoCircleOutlined,
  SendOutlined,
} from "@ant-design/icons";
import postAlertApi from "./PostAlertApi";
const { TextArea } = Input;

export default function NewAlertForm() {
  const { isEnglish: En } = useLanguage();
  
  const onFinish = async (values) => {
    // Ensure channels is an array of numbers
    const formattedValues = {
      ...values,
      channels: values.channels ? values.channels.map(Number) : []
    };
    const result = await postAlertApi(formattedValues);
    console.log("Result from alert form:", result);
    console.log("Success:", formattedValues);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="p-4" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <Form
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="mt-2"
        size="large"
      >
        {/* Alert Title */}
        <Form.Item
          label={
            <span style={{ fontSize: "16px", fontWeight: "500" }}>
              {En ? "Alert Title" : "عنوان الإنذار"}{" "}
            </span>
          }
          name="title"
          rules={[
            {
              required: true,
              message: En
                ? "Please input Alert Title!"
                : "يرجى إدخال عنوان الإنذار!",
            },
          ]}
        >
          <Input
            size="large"
            placeholder={En ? "Enter alert title..." : "أدخل عنوان الإنذار..."}
            style={{ fontSize: "16px", padding: "10px" }}
          />
        </Form.Item>

        {/* Description */}
        <Form.Item
          label={
            <span style={{ fontSize: "16px", fontWeight: "500" }}>
              {En ? "Description" : "الوصف"}{" "}
            </span>
          }
          name="body"
          rules={[
            {
              required: true,
              message: En ? "Please input description!" : "يرجى إدخال الوصف!",
            },
          ]}
        >
          <TextArea
            rows={4}
            size="large"
            placeholder={
              En
                ? "Provide detailed information about the emergency..."
                : "قدم معلومات تفصيلية عن الطوارئ..."
            }
            style={{ fontSize: "16px", padding: "10px" }}
          />
        </Form.Item>
        
        {/*Notification Methods Check box */}
        <Form.Item
          label={
            <span style={{ fontSize: "16px", fontWeight: "500" }}>
              {En ? "Notification Methods" : "طرق الإشعارات"}
            </span>
          }
          name="channels"
        >
          <Checkbox.Group style={{ width: "100%" }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {/* Push Notifications */}
              <Checkbox value={0}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <BellOutlined
                    style={{ fontSize: "18px", color: "#1890ff" }}
                  />
                  <div style={{ fontSize: "16px", fontWeight: "500" }}>
                    {En ? "Push Notifications" : "إشعارات التطبيق"}
                  </div>
                </div>
              </Checkbox>

              {/* Email Alerts */}
              <Checkbox value={1}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <MailOutlined
                    style={{ fontSize: "18px", color: "#faad14" }}
                  />
                  <div style={{ fontSize: "16px", fontWeight: "500" }}>
                    {En ? "Email Alerts" : "تنبيهات البريد الإلكتروني"}
                  </div>
                </div>
              </Checkbox>

              {/* SMS Alerts */}
              <Checkbox value={2}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <MessageOutlined
                    style={{ fontSize: "18px", color: "#52c41a" }}
                  />
                  <div style={{ fontSize: "16px", fontWeight: "500" }}>
                    {En ? "SMS Alerts" : "رسائل قصيرة"}
                  </div>
                </div>
              </Checkbox>
            </div>
          </Checkbox.Group>
        </Form.Item>

        <Divider style={{ margin: "32px 0" }} />

        {/* Submit Button */}
        <Form.Item style={{ marginTop: "30px" }}>
          <Space
            direction="horizontal"
            style={{ width: "100%" }}
            size={16}
            className="d-flex justify-content-between"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#8c8c8c",
                fontSize: "14px",
              }}
            >
              <InfoCircleOutlined />
              <span>
                {En
                  ? "Alert will be sent immediately upon creation"
                  : "سيتم إرسال التنبيه فور الإنشاء"}
              </span>
            </div>

            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                danger
                icon={<SendOutlined />}
                style={{ fontSize: "18px" }}
              >
                {En ? "Send Alert" : "إرسال التنبيه"}
              </Button>
            </Space>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}