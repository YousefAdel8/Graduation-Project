import React, { useState, useEffect, useMemo } from "react";
import {
	CheckCircleOutlined,
	ExclamationCircleOutlined,
	PrinterOutlined,
	SyncOutlined,
} from "@ant-design/icons";
import {
	Button,
	Input,
	Space,
	Table,
	Popconfirm,
	Tag,
	Tooltip,
	DatePicker,
	Select,
	Modal,
} from "antd";
import { Print } from "../../../utils/exportFunctions";
import dayjs from "dayjs";
import { useLanguage } from "../../../context/LanguageContext";
import axios from "axios";
import ReportTableDetails from "./ReportTableDetails";
dayjs.extend(require("dayjs/plugin/isSameOrBefore"));
dayjs.extend(require("dayjs/plugin/isSameOrAfter"));
const { RangePicker } = DatePicker;
const { Option } = Select;

const STATUS_OPTS = [
	{ value: "Active", en: "Active", ar: "تم الإبلاغ عنه" },
	{ value: "InProgress", en: "In Progress", ar: "قيد التنفيذ" },
	{ value: "Resolved", en: "Resolved", ar: "تم الحل" },
];
const STATUS_TO_CODE = {
	Active: 0, "تم الإبلاغ عنه": 0,
	InProgress: 1, "قيد التنفيذ": 1,
	Resolved: 2, "تم الحل": 2,
};
const STATUS_ICON = {
	Active: <ExclamationCircleOutlined />,
	InProgress: <SyncOutlined />,
	Resolved: <CheckCircleOutlined />,
};
const STATUS_COLOR = { Active: "blue", InProgress: "orange", Resolved: "green" };

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

	const [editModal, setEditModal] = useState({
		open: false, row: null, newStatus: "", loading: false, comment: "",
	});
	const [detailsModal, setDetailsModal] = useState({ open: false, reportId: null });

	const handleDelete = (record) =>
		setTableData((prev) => prev.filter((item) => item.key !== record.key));

	const handleEditOpen = (row) => {
		let stat = row.reportStatus;
		if (stat === "تم الإبلاغ عنه") stat = "Active";
		else if (stat === "قيد التنفيذ") stat = "InProgress";
		else if (stat === "تم الحل") stat = "Resolved";
		setEditModal({ open: true, row, newStatus: stat, loading: false, comment: "" });
	};

	const handleEditSave = async () => {
		const { row, newStatus } = editModal;
		if (!row) return;
		setEditModal((prev) => ({ ...prev, loading: true }));

		const token = localStorage.getItem("userToken");
		try {
			await axios.put(
				"https://cms-reporting.runasp.net/api/Report",
				{ reportId: row.id, status: STATUS_TO_CODE[newStatus] },
				{ headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
			);
			setTableData((prev) =>
				prev.map((r) => r.id === row.id ? { ...r, reportStatus: newStatus } : r)
			);
			setEditModal({ open: false, row: null, newStatus: "", loading: false, comment: "" });
		} catch {
			Modal.error({
				title: En ? "Error" : "خطأ",
				content: En ? "Failed to update status. Please try again." : "لم يتم تحديث الحالة، حاول مجددًا.",
			});
			setEditModal((prev) => ({ ...prev, loading: false }));
		}
	};

	const handleDateRange = (dates, ds) => {
		const from = ds[0] ? dayjs(ds[0]).format("YYYY-MM-DD") : null;
		const to = ds[1] ? dayjs(ds[1]).format("YYYY-MM-DD") : null;
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
		setLoading(true);
		const params = {
			PageNumber: pageNumber,
			PageSize: pageSize,
			...filters,
		};
		try {
			const { data } = await axios.get("https://cms-reporting.runasp.net/api/Report", { params });
			const formatted = data.value.map((item, i) => ({ ...item, key: item.id || i }));
			setTableData(formatted);
			setTotal(data.value.length);
			setError(null);
		} catch {
			setError("Failed to load data. Please try again later.");
			setTableData([]);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => { fetchData(); }, [pageNumber, pageSize, filters.From, filters.To, filters.Keyword]);

	const columns = useMemo(() => [
		{
			title: En ? "User Name" : "اسم المستخدم",
			dataIndex: "mobileUserName", key: "mobileUserName",
		},
		{
			title: En ? "Issue Category" : "نوع المشكلة",
			dataIndex: En ? "issueCategoryEN" : "issueCategoryAR",
			key: En ? "issueCategoryEN" : "issueCategoryAR",
		},
		{
			title: En ? "User Phone Number" : "هاتف المستخدم",
			dataIndex: "mobileUserPhone", key: "mobileUserPhone",
		},
		{
			title: En ? "Status" : "الحالة",
			dataIndex: "reportStatus", key: "reportStatus",
			render: (status) => (
				<Tag icon={STATUS_ICON[status]} color={STATUS_COLOR[status] || "default"}>
					{En ? STATUS_OPTS.find(s => s.value === status)?.en : STATUS_OPTS.find(s => s.value === status)?.ar || status}
				</Tag>
			),
		},
		{
			title: En ? "Date Submitted" : "تاريخ الاضافة",
			dataIndex: "dateIssued", key: "dateIssued",
			render: (d) => new Date(d).toLocaleDateString(),
		},
		{
			title: En ? "Action" : "العمليات", key: "action",
			render: (_, rec) => (
				<Space size="middle">
					<Popconfirm
						title={En ? "Delete the report?" : "حذف التقرير؟"}
						description={En ? "Are you sure to delete this report?" : "هل انت متاكد من حذف هذا التقرير؟"}
						onConfirm={() => handleDelete(rec)}
						okText={En ? "Yes" : "نعم"}
						cancelText={En ? "No" : "لا"}
					>
						<Button color="danger" variant="filled">{En ? "Delete" : "حذف"}</Button>
					</Popconfirm>
					<Button color="primary" variant="filled" onClick={() => handleEditOpen(rec)}>
						{En ? "Edit" : "تعديل"}
					</Button>
					<Button color="cyan" variant="filled" onClick={() => handleView(rec)}>
						{En ? "View" : "عرض"}
					</Button>
				</Space>
			),
		}
	], [En]);

	return (
		<>
			<ReportTableDetails
				open={detailsModal.open}
				reportId={detailsModal.reportId}
				onClose={() => setDetailsModal({ open: false, reportId: null })}
			/>
			<Modal
				title={En ? "Update Status" : "تحديث الحالة"}
				open={editModal.open}
				onCancel={() => setEditModal({ ...editModal, open: false })}
				onOk={handleEditSave}
				confirmLoading={editModal.loading}
				okText={En ? "Save" : "حفظ"}
				cancelText={En ? "Cancel" : "إلغاء"}
				centered
				destroyOnClose
				maskClosable={false}
				afterClose={() => setEditModal({
					open: false, row: null, newStatus: "", loading: false, comment: "",
				})}
				dir={En ? "ltr" : "rtl"}
			>
				<Select
					style={{ width: "100%", marginBottom: 12 }}
					value={editModal.newStatus}
					onChange={(v) => setEditModal((p) => ({ ...p, newStatus: v }))}
				>
					{STATUS_OPTS.map((st) => (
						<Option value={st.value} key={st.value}>
							{En ? st.en : st.ar}
						</Option>
					))}
				</Select>
				<label style={{ marginTop: "10px", fontWeight: 500 }}>{En ? "Comment" : "ملاحظة"}</label>
				<Input.TextArea
					rows={3}
					style={{ width: "100%", marginTop: 8 }}
					value={editModal.comment}
					onChange={e => setEditModal({ ...editModal, comment: e.target.value })}
				/>
			</Modal>
			{error && (
				<div style={{ color: "red", marginBottom: "16px" }}>{error}</div>
			)}
			<div className="w-100 my-3" dir={En ? "ltr" : "rtl"}>
				<Input.Search
					placeholder={En ? "Search" : "بحث"}
					allowClear
					onSearch={handleKeyword}
					style={{ width: 200, marginRight: 16 }}
					className="mx-2"
				/>
			</div>
			<div className="w-100 my-3" dir={En ? "ltr" : "rtl"}>
				<RangePicker
					format="YYYY-MM-DD"
					onChange={handleDateRange}
					style={{ marginBottom: 16 }}
					placeholder={[
						En ? "Start Date" : "تاريخ البداية",
						En ? "End Date" : "تاريخ النهاية",
					]}
					allowClear showToday className="mx-2"
				/>
				<Space.Compact style={{ marginBottom: 16 , marginRight: 8 }}>
					<Tooltip title={En ? "Print" : "طباعة"}>
						<Button
							onClick={() => Print(
								columns,
								dateRange[0] && dateRange[1] ? tableData.filter(row => {
									const d = dayjs(row.dateIssued);
									return d.isSameOrAfter(dateRange[0], "day")
										&& d.isSameOrBefore(dateRange[1], "day");
								}) : tableData,
								En
							)}
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