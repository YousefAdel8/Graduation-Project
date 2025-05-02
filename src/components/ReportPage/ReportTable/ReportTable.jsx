import React, { useRef, useState, useEffect } from "react";
import {
	CheckCircleOutlined,
	ExclamationCircleOutlined,
	PrinterOutlined,
	SearchOutlined,
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
import Highlighter from "react-highlight-words";
import { Print } from "../../../utils/exportFunctions";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { useLanguage } from "../../../context/LanguageContext";
import axios from "axios";
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
const { RangePicker } = DatePicker;

const ReportTable = () => {
	const { isEnglish: En } = useLanguage();

	const fieldTranslations = {
		name: "الاسم",
		service: "نوع الخدمة",
		resolutionTime: "وقت التحليل",
		date: "التاريخ",
		rating: "التقييم",
	};

	const { Option } = Select;
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [searchText, setSearchText] = useState("");
	const [searchedColumn, setSearchedColumn] = useState("");
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

	const searchInput = useRef(null);

	useEffect(() => {
		if (dateRange[0] && dateRange[1]) {
			const [start, end] = dateRange;
			const dateFormat = "DD/MM/YYYY";
			setFilteredData(
				tableData.filter((item) => {
					const itemDate = dayjs(item.date, dateFormat);
					return (
						itemDate.isSameOrAfter(start, "day") &&
						itemDate.isSameOrBefore(end, "day")
					);
				})
			);
		} else {
			setFilteredData(tableData);
		}
	}, [tableData, dateRange]);

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};
	const handleReset = (clearFilters) => {
		clearFilters();
		setSearchText("");
	};

	const confirmDelete = (record) => {
		const newData = tableData.filter((item) => item.key !== record.key);
		setTableData(newData);
	};

	const handleView = (record) => {
		console.log(record);
	};

	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
			close,
		}) => (
			<div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
				<Input
					ref={searchInput}
					placeholder={
						En
							? `Search ${dataIndex}`
							: `بحث عن ${fieldTranslations[dataIndex] ?? dataIndex}`
					}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{ marginBottom: 8, display: "block" }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						{En ? "Search" : "بحث"}
					</Button>
					<Button
						onClick={() => clearFilters && handleReset(clearFilters)}
						size="small"
						style={{ width: 90 }}
					>
						{En ? "Reset" : "اعادة تعيين"}
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							close();
						}}
					>
						{En ? "Close" : "اغلاق"}
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
		),
		onFilter: (value, record) =>
			record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
		filterDropdownProps: {
			onOpenChange(open) {
				if (open) {
					setTimeout(() => searchInput.current?.select(), 100);
				}
			},
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ""}
				/>
			) : (
				text
			),
	});

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
			...getColumnSearchProps("mobileUserName"),
		},
		{
			title: En ? "Issue Category" : "نوع المشكلة",

			dataIndex: En ? "issueCategoryEN" : "issueCategoryAR",
			key: En ? "issueCategoryEN" : "issueCategoryAR",
			...getColumnSearchProps(En ? "issueCategoryEN" : "issueCategoryAR"),
		},
		{
			title: En ? "User Phone Number" : "هاتف المستخدم",
			dataIndex: "mobileUserPhone",
			key: "mobileUserPhone",
			...getColumnSearchProps("mobileUserPhone"),
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
								reportStatus: statusValue ,
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
		if(stat === "تم الإبلاغ عنه") stat = "Active";
		else if(stat === "قيد التنفيذ") stat = "InProgress";
		else if(stat === "تم الحل") stat = "Resolved";
		setEditModal({
		  open: true,
		  row,
		  newStatus: stat
		});
	  };

	const dateFormat = "DD/MM/YYYY";
	const handleDateRangeChange = (dates) => {
		setDateRange(!dates || dates.length !== 2 ? [null, null] : dates);
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
		fetchData();
	}, [pageNumber, pageSize, filters]);

	return (
		<>
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
			</Modal>

			{error && (
				<div style={{ color: "red", marginBottom: "16px" }}>{error}</div>
			)}
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
				{/*<Table 
				columns={columns} 
				dataSource={filteredData}
				 loading={loading} 
				 scroll={{ x: 500 }} 
				 pagination={{ pageSize: 7,  }} 
				rowKey="key" /> */}
			</div>
		</>
	);
};

export default ReportTable;
