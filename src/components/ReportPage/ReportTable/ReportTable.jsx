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
	Form,
} from "antd";
import Highlighter from "react-highlight-words";
import { Print } from "../../../utils/exportFunctions";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { useLanguage } from "../../../context/LanguageContext";
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
	const [searchText, setSearchText] = useState("");
	const [searchedColumn, setSearchedColumn] = useState("");
	const [tableData, setTableData] = useState([
		{
			key: "1",
			name: En ? "John Brown" : "جون براون",
			service: En ? "Street Light" : "ضوء الشارع",
			priority: En ? "High" : "عالي",
			status: En ? "In progress" : "قيد التنفيذ",
			date: "01/01/2023",
		},
		{
			key: "2",
			name: En ? "Jane Doe" : "جان دو",
			service: En ? "Water Leak" : "تسرب المياة",
			priority: En ? "Medium" : "متوسط",
			status: En ? "Reported" : "تم الإبلاغ عنه",
			date: "02/02/2023",
		},
		{
			key: "3",
			name: En ? "Bob Smith" : "بوب سميث",
			service: En ? "Electricity Outage" : "انقطاع الكهرباء",
			priority: En ? "Low" : "منخفضة",
			status: En ? "Resolved" : "تم الحل",
			date: "03/03/2023",
		},
	]);
	const [filteredData, setFilteredData] = useState(tableData);
	const [dateRange, setDateRange] = useState([null, null]);
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

	const [showUpdateDiv, setShowUpdateDiv] = useState(false);
	const [selectedRowId, setSelectedRowId] = useState(null);
	const [selectedStatus, setSelectedStatus] = useState("");
	const [statusForm] = Form.useForm();

	const handleEdit = (record) => {
		setSelectedRowId(record.key);
		setSelectedStatus(record.status);
		statusForm.setFieldsValue({ status: record.status });
		setShowUpdateDiv(true);
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

	const columns = [
		{
			title: En ? "User Name" : "اسم المستخدم",
			dataIndex: "name",
			key: "name",
			...getColumnSearchProps("name"),
		},
		{
			title: En ? "Service Type" : "نوع الخدمة",
			dataIndex: "service",
			key: "service",
			...getColumnSearchProps("service"),
		},
		{
			title: En ? "Priority" : "الأولوية",
			dataIndex: "priority",
			key: "priority",
		},
		{
			title: En ? "Status" : "الحالة",
			dataIndex: "status",
			key: "status",
			render: (status) => {
				let color = "";
				let icon = null;
				if (status === (En ? "In progress" : "قيد التنفيذ")) {
					color = "orange";
					icon = <SyncOutlined />;
				} else if (status === (En ? "Reported" : "تم الإبلاغ عنه")) {
					color = "blue";
					icon = <ExclamationCircleOutlined />;
				} else {
					color = "green";
					icon = <CheckCircleOutlined />;
				}
				return (
					<Tag icon={icon} color={color}>
						{status}
					</Tag>
				);
			},
		},
		{
			title: En ? "Date" : "التاريخ",
			dataIndex: "date",
			key: "date",
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
						onClick={() => handleEdit(record)}
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

	const updateStatus = async () => {
		try {
			const values = await statusForm.validateFields();
			setTableData((prevData) =>
				prevData.map((row) =>
					row.key === selectedRowId ? { ...row, status: values.status } : row
				)
			);
			setShowUpdateDiv(false);
			setSelectedRowId(null);
		} catch (err) {
			// ignore
		}
	};

	const dateFormat = "DD/MM/YYYY";
	const handleDateRangeChange = (dates) => {
		setDateRange(!dates || dates.length !== 2 ? [null, null] : dates);
	};

	return (
		<>
			{showUpdateDiv && (
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						bottom: 0,
						right: 0,
						width: "100vw",
						height: "100vh",
						backgroundColor: "rgba(0,0,0,0.5)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						zIndex: 1000,
					}}
					onClick={() => setShowUpdateDiv(false)}
					dir={En ? "ltr" : "rtl"}
				>
					<div
						className="bg-white p-4 rounded"
						style={{ width: "350px", boxShadow: "0 4px 6px rgba(0,0,0,.1)" }}
						onClick={(e) => e.stopPropagation()}
					>
						<h3 style={{ fontWeight: 600, marginBottom: 20 }}>
							{En ? "Update Status" : "تحديث الحالة"}
						</h3>
						<Form
							form={statusForm}
							layout="vertical"
							initialValues={{ status: selectedStatus }}
						>
							<Form.Item
								name="status"
								label={En ? "Select Status" : "حدد الحالة"}
								rules={[
									{
										required: true,
										message: En ? "Please select status" : "اختر الحالة",
									},
								]}
							>
								<Select>
									<Option value={En ? "Reported" : "تم الإبلاغ عنه"}>
										{En ? "Reported" : "تم الإبلاغ عنه"}
									</Option>
									<Option value={En ? "In progress" : "قيد التنفيذ"}>
										{En ? "In Progress" : "قيد التنفيذ"}
									</Option>
									<Option value={En ? "Resolved" : "تم الحل"}>
										{En ? "Resolved" : "تم الحل"}
									</Option>
								</Select>
							</Form.Item>
							<Space
								style={{
									width: "100%",
									justifyContent: En ? "flex-end" : "flex-start",
									direction: En ? "ltr" : "rtl",
								}}
							>
								<Button onClick={() => setShowUpdateDiv(false)} type="default">
									{En ? "Cancel" : "إلغاء"}
								</Button>
								<Button type="primary" onClick={updateStatus}>
									{En ? "Save" : "حفظ"}
								</Button>
							</Space>
						</Form>
					</div>
				</div>
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
					scroll={{ x: 500 }}
					pagination={{
						pageSize: 7,
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
