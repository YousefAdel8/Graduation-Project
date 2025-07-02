import React, { useState } from "react";
import { Modal, Select, Input, message } from "antd";
import axios from "axios";
import { useLanguage } from "../../../context/LanguageContext";
import { STATUS_OPTS, STATUS_TO_CODE } from "./ReportStatus";

const { Option } = Select;

const EditStatusModal = ({
  open,
  row,
  onClose,
  onUpdateSuccess,
}) => {
  const { isEnglish: En } = useLanguage();
  const [newStatus, setNewStatus] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // Initialize status when modal opens
  React.useEffect(() => {
    if (row) {
      const statusMap = {
        "تم الإبلاغ عنه": "Active",
        "قيد التنفيذ": "InProgress",
        "تم الحل": "Resolved",
      };
      setNewStatus(statusMap[row.reportStatus] || row.reportStatus);
      setComment("");
      console.log("Row data:", row);
    }
  }, [row]);

  const handleSave = async () => {
    if (!row) return;

    setLoading(true);
    const token = localStorage.getItem("userToken");

    try {
      await axios.put(
        "https://cms-reporting.runasp.net/api/Report/update-ReportStatus",
        { reportId: row.id, status: STATUS_TO_CODE[newStatus], comment },
        { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
      );

      // Call onUpdateSuccess to notify parent of successful update
      onUpdateSuccess(row.id, newStatus);
      setLoading(false);
      onClose();
      message.success(En ? "Status updated successfully" : "تم تحديث الحالة بنجاح");
    } catch (error) {
      message.error(En ? "Failed to update status. Please try again." : "لم يتم تحديث الحالة، حاول مجددًا.");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setNewStatus("");
    setComment("");
    setLoading(false);
    onClose();
  };

  return (
    <Modal
      title={En ? "Update Status" : "تحديث الحالة"}
      open={open}
      onCancel={handleCancel}
      onOk={handleSave}
      confirmLoading={loading}
      okText={En ? "Save" : "حفظ"}
      cancelText={En ? "Cancel" : "إلغاء"}
      centered
      destroyOnClose
      maskClosable={true}
      dir={En ? "ltr" : "rtl"}
    >
      <Select
        style={{ width: "100%", marginBottom: 12 }}
        value={newStatus}
        onChange={(value) => setNewStatus(value)}
      >
        {STATUS_OPTS.map((st) => (
          <Option value={st.value} key={st.value}>
            {En ? st.en : st.ar}
          </Option>
        ))}
      </Select>
      <label style={{ marginTop: "10px", fontWeight: 500 }}>
        {En ? "Comment" : "ملاحظة"}
      </label>
      <Input.TextArea
        rows={3}
        style={{ width: "100%", marginTop: 8 }}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
    </Modal>
  );
};

export default EditStatusModal;