import React, { useState, useEffect } from "react";
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
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { useLanguage } from "../../../context/LanguageContext";
import axios from "axios";
import ReportTableDetails from "./ReportTableDetails";
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
const { RangePicker } = DatePicker;

const ReportTable = () => {
	const { isEnglish: En } = useLanguage();

	const { Option } = Select;
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [tableData, setTableData] = useState([]);
	const [filteredData, setFilteredData] = useState(tableData);
	const [dateRange, setDateRange] = useState([null, null]);
	const [pageSize, setPageSize] = useState(10);
	const [pageNumber, setPageNumber] = useState(1);
	const [filters, setFilters] = useState({
		From: null,
		To: null,
		Keyword: "",
	});
	const [total, setTotal] = useState(0);

	const confirmDelete = (record) => {
		const newData = tableData.filter((item) => item.key !== record.key);
		setTableData(newData);
	};

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

	const columns = [
		{
			title: En ? "User Name" : "اسم المستخدم",
			dataIndex: "mobileUserName",
			key: "mobileUserName",
		},
		{
			title: En ? "Issue Category" : "نوع المشكلة",

			dataIndex: En ? "issueCategoryEN" : "issueCategoryAR",
			key: En ? "issueCategoryEN" : "issueCategoryAR",
		},
		{
			title: En ? "User Phone Number" : "هاتف المستخدم",
			dataIndex: "mobileUserPhone",
			key: "mobileUserPhone",
		},
		{
			title: En ? "Status" : "الحالة",
			dataIndex: "reportStatus",
			key: "reportStatus",
			render: (reportStatus) => {
				const label = statusTranslations[reportStatus] || reportStatus;
				const color = statusColors[reportStatus] || "default";
				const icon = statusIcons[reportStatus] || null;

				return (
					<Tag icon={icon} color={color}>
						{label}
					</Tag>
				);
			},
		},
		{
			title: En ? "Date Submitted" : "تاريخ الاضافة",
			dataIndex: "dateIssued",
			key: "dateIssued",
			render: (dateIssued) => {
				return new Date(dateIssued).toLocaleDateString();
			},
		},
		{
			title: En ? "Action" : "العمليات",
			dataIndex: "action",
			key: "action",
			render: (_, record) => (
				<Space size="middle">
					<Popconfirm
						title={En ? "Delete the report?" : "حذف التقرير؟"}
						description={
							En
								? "Are you sure to delete this report?"
								: "هل انت متاكد من حذف هذا التقرير؟"
						}
						onConfirm={() => confirmDelete(record)}
						okText={En ? "Yes" : "نعم"}
						cancelText={En ? "No" : "لا"}
					>
						<Button color="danger" variant="filled">
							{En ? "Delete" : "حذف"}
						</Button>
					</Popconfirm>

					<Button
						color="primary"
						variant="filled"
						onClick={() => showEditModal(record)}
					>
						{En ? "Edit" : "تعديل"}
					</Button>
					<Button
						color="cyan"
						variant="filled"
						onClick={() => handleView(record)}
					>
						{En ? "View" : "عرض"}
					</Button>
				</Space>
			),
		},
	];

	const STATUS_TO_CODE = {
		Active: 0,
		"تم الإبلاغ عنه": 0,
		InProgress: 1,
		"قيد التنفيذ": 1,
		Resolved: 2,
		"تم الحل": 2,
	};

	const [editModal, setEditModal] = useState({
		open: false,
		row: null,
		newStatus: "",
		loading: false,
		comment: "",
	});
	const statusOptions = [
		{ value: "Active", labelEn: "Active", labelAr: "تم الإبلاغ عنه" },
		{ value: "InProgress", labelEn: "In Progress", labelAr: "قيد التنفيذ" },
		{ value: "Resolved", labelEn: "Resolved", labelAr: "تم الحل" },
	];
	const handleStatusChange = (value) => {
		setEditModal((prev) => ({ ...prev, newStatus: value }));
	};
	const handleModalOk = async () => {
		if (!editModal.row) return;
		const statusValue = editModal.newStatus;
		const statusCode = STATUS_TO_CODE[statusValue];
		setEditModal((prev) => ({ ...prev, loading: true }));
		const token = localStorage.getItem("userToken");
		console.log(token, statusCode, editModal.row.id);
		try {
			await axios.put(
				"https://cms-reporting.runasp.net/api/Report",
				{
					reportId: editModal.row.id,
					status: statusCode,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setTableData((prev) =>
				prev.map((row) =>
					row.id === editModal.row.id
						? {
								...row,
								reportStatus: statusValue,
						  }
						: row
				)
			);
			setEditModal({ open: false, row: null, newStatus: "", loading: false });
		} catch (e) {
			Modal.error({
				title: En ? "Error" : "خطأ",
				content: En
					? "Failed to update status. Please try again."
					: "لم يتم تحديث الحالة، حاول مجددًا.",
			});
			setEditModal((prev) => ({ ...prev, loading: false }));
		}
	};
	const showEditModal = (row) => {
		let stat = row.reportStatus;
		if (stat === "تم الإبلاغ عنه") stat = "Active";
		else if (stat === "قيد التنفيذ") stat = "InProgress";
		else if (stat === "تم الحل") stat = "Resolved";
		setEditModal({
			open: true,
			row,
			newStatus: stat,
		});
	};

	const dateFormat = "YYYY-MM-DD";
	const handleDateRangeChange = (dates, dateStrings) => {
		if (dates) {
			const fromDate = dateStrings[0]
				? dayjs(dateStrings[0], dateFormat).format("YYYY-MM-DD")
				: null;
			const toDate = dateStrings[1]
				? dayjs(dateStrings[1], dateFormat).format("YYYY-MM-DD")
				: null;

			console.log("تواريخ مرسلة للـ API:", { fromDate, toDate });

			setDateRange(dates);
			setFilters((prev) => ({
				...prev,
				From: fromDate,
				To: toDate,
			}));

			setPageNumber(1);
		} else {
			setDateRange([]);
			setFilters((prev) => ({
				...prev,
				From: null,
				To: null,
			}));
		}
	};
	const handleKeywordSearch = (value) => {
		console.log("بحث بكلمة:", value);
		setFilters((prev) => ({
			...prev,
			Keyword: value,
		}));
		setPageNumber(1);
	};
	const fetchData = async (
		page = pageNumber,
		size = pageSize,
		filtersObj = filters
	) => {
		setLoading(true);

		const params = {
			PageNumber: page,
			PageSize: size,
		};

		if (filtersObj.From) params.From = filtersObj.From;
		if (filtersObj.To) params.To = filtersObj.To;
		if (filtersObj.Keyword) params.Keyword = filtersObj.Keyword;
		console.log(params);
		try {
			const { data } = await axios.get(
				"https://cms-reporting.runasp.net/api/Report",
				{
					params,
				}
			);
			console.log(data);
			const formattedData = data.value.map((item, index) => ({
				...item,
				key: item.id || index,
			}));

			setTableData(formattedData);
			setTotal(data.value.length);
			setError(null);
		} catch (err) {
			setError("Failed to load data. Please try again later.");
			setTableData([]);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		console.log("فلاتر تغيرت:", filters);
		fetchData(pageNumber, pageSize, filters);
	}, [pageNumber, pageSize, filters.From, filters.To, filters.Keyword]);
	useEffect(() => {
		setFilteredData(tableData);
	}, [tableData]);

	const [detailsModal, setDetailsModal] = useState({
		open: false,
		reportId: null,
	});
	const handleView = (record) => {
		setDetailsModal({
			open: true,
			reportId: record.id,
		});
	};
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
				onOk={handleModalOk}
				confirmLoading={editModal.loading}
				okText={En ? "Save" : "حفظ"}
				cancelText={En ? "Cancel" : "إلغاء"}
				centered
				destroyOnClose
				maskClosable={false}
				afterClose={() =>
					setEditModal({
						open: false,
						row: null,
						newStatus: "",
						loading: false,
					})
				}
				dir={En ? "ltr" : "rtl"}
			>
				<Select
					style={{ width: "100%" }}
					value={editModal.newStatus}
					onChange={handleStatusChange}
				>
					{statusOptions.map((st) => (
						<Option value={st.value} key={st.value}>
							{En ? st.labelEn : st.labelAr}
						</Option>
					))}
				</Select>
				{/*Adding Optional Comment or The Reason of Edit Status */}
				<label
					style={{ marginTop: "16px", display: "block", fontWeight: "500" }}
				>
					{En ? "Comment" : "ملاحظة"}
				</label>
				<Input.TextArea
					rows={4}
					style={{ width: "100%", marginTop: 8 }}
					value={editModal.comment}
					onChange={(e) =>
						setEditModal({
							...editModal,
							comment: e.target.value,
						})
					}
				/>
			</Modal>

			{error && (
				<div style={{ color: "red", marginBottom: "16px" }}>{error}</div>
			)}
			<div className="w-100 my-3" dir={En ? "ltr" : "rtl"}>
				<Input.Search
					placeholder={En ? "Search" : "بحث"}
					allowClear
					onSearch={handleKeywordSearch}
					style={{ width: 200, marginRight: 16 }}
					className="mx-2"
				/>
			</div>
			<div className="w-100 my-3" dir={En ? "ltr" : "rtl"}>
				<RangePicker
					format={dateFormat}
					onChange={handleDateRangeChange}
					style={{ marginBottom: 16 }}
					placeholder={[
						En ? "Start Date" : "تاريخ البداية",
						En ? "End Date" : "تاريخ النهاية",
					]}
					allowClear
					showToday
					className="mx-2"
				/>
				<Space.Compact style={{ marginBottom: 16 }}>
					<Tooltip title={En ? "Print" : "طباعة"}>
						<Button
							onClick={() =>
								Print(
									columns,
									dateRange[0] && dateRange[1] ? filteredData : tableData,
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
					dataSource={filteredData}
					loading={loading}
					scroll={{ x: 500 }}
					pagination={{
						current: pageNumber,
						pageSize: pageSize,
						showSizeChanger: true,
						total: total,

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
