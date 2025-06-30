import React, { useState, useEffect, useMemo } from "react";
import { PrinterOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Tooltip, DatePicker } from "antd";
import { Print } from "../../../utils/exportFunctions";
import dayjs from "dayjs";
import { useLanguage } from "../../../context/LanguageContext";
import axios from "axios";
import ReportTableDetails from "./ReportTableDetails";
import EditStatusModal from "./EditStatusModal";
import { STATUS_OPTS, STATUS_ICON, STATUS_COLOR } from "./ReportStatus";
import EditCategoryModal from "./EditCategoryModal";

dayjs.extend(require("dayjs/plugin/isSameOrBefore"));
dayjs.extend(require("dayjs/plugin/isSameOrAfter"));

const { RangePicker } = DatePicker;

const ReportTable = () => {
  const { isEnglish: En } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [filters, setFilters] = useState({ From: null, To: null, Keyword: "" });
  const [total, setTotal] = useState(0);
  const [editStatusModal, setEditStatusModal] = useState({ open: false, row: null });
  const [detailsModal, setDetailsModal] = useState({ open: false, reportId: null });
  const [editCategoryModal, setEditCategoryModal] = useState({ open: false, row: null });

  //Status Modal 
  const handleEditStatusOpen = (row) => {
    setEditStatusModal({ open: true, row });
  };

  const handleEditStatusClose = () => {
    setEditStatusModal({ open: false, row: null });
  };

  const handleEditStatusSuccess = (reportId, newStatus) => {
    setTableData((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, reportStatus: newStatus } : r))
    );
    handleEditStatusClose();
  };
  //Category Modal
  const handleEditCategoryOpen = (row) => {
	setEditCategoryModal({ open: true, row });
	  };
	    const handleEditCategoryClose = () => {
	setEditCategoryModal({ open: false, row: null });
	  }
	    const handleEditCategorySuccess = (reportId, newCategory) => {
  setTableData((prev) =>
    prev.map((r) =>
      r.id === reportId
        ? {
            ...r,
            issueCategory: newCategory,
            issueCategoryEN: newCategory.en, 
            issueCategoryAR: newCategory.ar, 
          }
        : r
    )
  );
  handleEditCategoryClose();
};


  const handleDateRange = (dates, ds) => {
    const [from, to] = ds.map((d) => (d ? dayjs(d).format("YYYY-MM-DD") : null));
    setDateRange(dates || []);
    setFilters((f) => ({ ...f, From: from, To: to }));
    setPageNumber(1);
  };

  const handleKeyword = (value) => {
    setFilters((f) => ({ ...f, Keyword: value }));
    setPageNumber(1);
  };

  const handleView = (record) => setDetailsModal({ open: true, reportId: record.id });

  const fetchData = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) return;

    setLoading(true);
    try {
      const response = await axios.get("https://cms-reporting.runasp.net/api/Report", {
        params: { PageNumber: pageNumber, PageSize: pageSize, ...filters },
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });

      const { data } = response;
      console.log("Fetched data:", data);

      const paginationHeader = response.headers["pagination"];
      console.log("Pagination header:", paginationHeader);

      if (paginationHeader) {
        const pagination = JSON.parse(paginationHeader);
        setTotal(pagination.totalItems);
      }

      setTableData(data.value.map((item, i) => ({ ...item, key: item.id || i })));
      setError(null);
    } catch (error) {
      setError("Failed to load data. Please try again later.");
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber, pageSize, filters.From, filters.To, filters.Keyword]);

  const columns = useMemo(
    () => [
      { title: En ? "User Name" : "اسم المستخدم", dataIndex: "mobileUserName", key: "mobileUserName" },
      {
        title: En ? "Issue Category" : "نوع المشكلة",
        dataIndex: En ? "issueCategoryEN" : "issueCategoryAR",
        key: En ? "issueCategoryEN" : "issueCategoryAR",
      },
      { title: En ? "User Phone Number" : "هاتف المستخدم", dataIndex: "mobileUserPhone", key: "mobileUserPhone" },
      {
        title: En ? "Status" : "الحالة",
        dataIndex: "reportStatus",
        key: "reportStatus",
        render: (status) => (
          <Tag icon={STATUS_ICON[status]} color={STATUS_COLOR[status] || "default"}>
            {En ? STATUS_OPTS.find((s) => s.value === status)?.en : STATUS_OPTS.find((s) => s.value === status)?.ar || status}
          </Tag>
        ),
      },
      {
        title: En ? "Date Submitted" : "تاريخ الاضافة",
        dataIndex: "dateIssued",
        key: "dateIssued",
        render: (d) => new Date(d).toLocaleDateString(),
      },
      {
        title: En ? "Action" : "العمليات",
        key: "action",
        render: (_, rec) => (
          <Space size="middle">
            <Button color="primary" variant="filled" onClick={() => handleEditStatusOpen(rec)}>
              {En ? "Edit Status" : "تعديل الحالة"}
            </Button>
            <Button color="green" variant="filled" onClick={() =>handleEditCategoryOpen(rec) }>{En ? "Edit Category" : "تعديل نوع المشكلة"}</Button>
            <Button color="cyan" variant="filled" onClick={() => handleView(rec)}>
              {En ? "View" : "عرض"}
            </Button>
          </Space>
        ),
      },
    ],
    [En]
  );

  return (
    <>
      <ReportTableDetails
        open={detailsModal.open}
        reportId={detailsModal.reportId}
        onClose={() => setDetailsModal({ open: false, reportId: null })}
      />
      <EditStatusModal
        open={editStatusModal.open}
        row={editStatusModal.row}
        onClose={handleEditStatusClose}
        onUpdateSuccess={handleEditStatusSuccess}
      />
      <EditCategoryModal
        open={editCategoryModal.open}
        row={editCategoryModal.row}
        onClose={handleEditCategoryClose}
        onUpdateSuccess={handleEditCategorySuccess}
      />
      {error && <div style={{ color: "red", marginBottom: "16px" }}>{error}</div>}
      <div className="w-100 my-3" dir={En ? "ltr" : "rtl"}>
        <Input.Search
          placeholder={En ? "Search" : "بحث"}
          allowClear
          onChange={(e) => handleKeyword(e.target.value)}
          value={filters.Keyword}
          style={{ width: 200, marginRight: 16 }}
          className="mx-2"
        />
      </div>
      <div className="w-100 my-3" dir={En ? "ltr" : "rtl"}>
        <RangePicker
          format="YYYY-MM-DD"
          onChange={handleDateRange}
          style={{ marginBottom: 16 }}
          placeholder={[En ? "Start Date" : "تاريخ البداية", En ? "End Date" : "تاريخ النهاية"]}
          allowClear
          className="mx-2"
        />
        <Space.Compact style={{ marginBottom: 16, marginRight: 8 }}>
          <Tooltip title={En ? "Print" : "طباعة"}>
            <Button
              onClick={() =>
                Print(
                  columns,
                  dateRange[0] && dateRange[1]
                    ? tableData.filter((row) => {
                        const d = dayjs(row.dateIssued);
                        return d.isSameOrAfter(dateRange[0], "day") && d.isSameOrBefore(dateRange[1], "day");
                      })
                    : tableData,
                  En
                )
              }
              icon={<PrinterOutlined />}
              type="primary"
            >
              {En ? "Print" : "طباعة"}
            </Button>
          </Tooltip>
        </Space.Compact>
        <Table
          columns={columns}
          dataSource={tableData}
          loading={loading}
          scroll={{ x: 500 }}
          pagination={{
            current: pageNumber,
            pageSize,
            showSizeChanger: true,
            total,
            onChange: (page, size) => {
              setPageNumber(page);
              setPageSize(size);
            },
            position: ["bottomCenter"],
            className: "custom-pagination",
          }}
          rowKey="key"
        />
      </div>
    </>
  );
};

export default ReportTable;