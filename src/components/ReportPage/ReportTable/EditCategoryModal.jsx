import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Select, Spin } from "antd";
import { useLanguage } from "../../../context/LanguageContext";

const EditCategoryModal = ({ open, row, onClose, onUpdateSuccess }) => {
  const { isEnglish: En } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [issueCategoriesData, setIssueCategoriesData] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const issueCategories = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      console.warn("No token found in localStorage.");
      return;
    }
    try {
      const response = await axios.get(
        `https://cms-reporting.runasp.net/api/Category/issueCategories`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIssueCategoriesData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
  if (open) {
    issueCategories();
  }
}, [open]);

useEffect(() => {
  if (open && issueCategoriesData.length) {
    const found = issueCategoriesData.find((c) => c.nameEN === row?.issueCategoryEN);
    setSelectedCategoryId(found?.id || null);
  }
}, [open, issueCategoriesData]);


  const handleSave = async () => {
  if (!row || !selectedCategoryId) return;
  setLoading(true);
  setSaving(true);
  const token = localStorage.getItem("userToken");
  try {
    await axios.put(
      "https://cms-reporting.runasp.net/api/Report/update-category",
      {
        reportId: row.id,
        categoryId: selectedCategoryId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const newCategory = issueCategoriesData.find((c) => c.id === selectedCategoryId);
    onUpdateSuccess(row.id, {
      en: newCategory.nameEN,
      ar: newCategory.nameAR,
    });

    setLoading(false);
    onClose();
  } catch (error) {
    setLoading(false);
    console.error("Error updating category:", error);
  } finally {
    setSaving(false);
  }
};


  return (
    <Modal
      title={En ? "Edit Category" : "تعديل التصنيف"}
      open={open}
      onCancel={onClose}
      onOk={handleSave}
      confirmLoading={saving}
      okText={En ? "Save" : "حفظ"}
      cancelText={En ? "Cancel" : "الغاء"}
      dir={En ? "ltr" : "rtl"}
    >
      {loading ? (
        <Spin />
      ) : (
        <>
          <p>
            {En ? "Current Category" : "التصنيف الحالي"}:{" "}
            <b>{En ? row?.issueCategoryEN : row?.issueCategoryAR}</b>
          </p>
          <Select
            style={{ width: "100%" }}
            placeholder={En ? "Select a category" : "اختر تصنيف"}
            value={selectedCategoryId}
            onChange={(value) => setSelectedCategoryId(value)}
          >
            {issueCategoriesData.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {En ? category.nameEN : category.nameAR}
              </Select.Option>
            ))}
          </Select>
        </>
      )}
    </Modal>
  );
};

export default EditCategoryModal;
