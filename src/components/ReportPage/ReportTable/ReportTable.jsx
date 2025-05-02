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

	const handleSearch = (value) => {
		setFilters((prev) => ({
			...prev,
			Keyword: value,
		}));
		setPageNumber(1); 
	};
	const handleReset = (clearFilters) => {
		clearFilters();
		setSearchText("");
	};

	const confirmDelete = (record) => {
		const newData = tableData.filter((item) => item.key !== record.key);
		setTableData(newData);
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
		console.log("براميترز الـ API:", params);
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




	//Modal of Details
	const [viewModal, setViewModal] = useState({
		open: false,
		loading: false,
		reportDetails: null
	  });
const fetchReportDetails = async (id) => {
	setViewModal(prev => ({ ...prev, loading: true }));
	try {
	  const { data } = await axios.get(`https://cms-reporting.runasp.net/api/Report/${id}`);
	  console.log("تفاصيل التقرير:", data);
	  if (data.isSuccess && data.value) {
		setViewModal(prev => ({
		  ...prev,
		  reportDetails: data.value,
		  loading: false
		}));
	  } else {
		throw new Error("Failed to load report details");
	  }
	} catch (err) {
	  console.error(err);
	  Modal.error({
		title: En ? "Error" : "خطأ",
		content: En 
		  ? "Failed to load report details. Please try again." 
		  : "فشل في تحميل تفاصيل التقرير. يرجى المحاولة مرة أخرى."
	  });
	  setViewModal(prev => ({ ...prev, loading: false }));
	}
  };
  const handleView = (record) => {
	console.log("عرض تفاصيل التقرير:", record);
	setViewModal(prev => ({ ...prev, open: true }));
	fetchReportDetails(record.id);
  };
	return (
		<>
			<Modal
  title={
    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1890ff' }}>
      {En ? "Report Details" : "تفاصيل التقرير"}
    </div>
  }
  open={viewModal.open}
  onCancel={() =>
    setViewModal({ open: false, loading: false, reportDetails: null })
  }
  footer={[
    <Button
      key="close"
      type="primary"
      onClick={() =>
        setViewModal({ open: false, loading: false, reportDetails: null })
      }
    >
      {En ? "Close" : "إغلاق"}
    </Button>,
  ]}
  width={700}
  centered
  destroyOnClose
  maskClosable={false}
  dir={En ? "ltr" : "rtl"}
  bodyStyle={{ padding: '20px' }}
>
  {viewModal.loading ? (
    <div style={{ 
      textAlign: "center", 
      padding: "40px 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div className="ant-spin ant-spin-spinning">
        <span className="ant-spin-dot">
          <i className="ant-spin-dot-item"></i>
          <i className="ant-spin-dot-item"></i>
          <i className="ant-spin-dot-item"></i>
          <i className="ant-spin-dot-item"></i>
        </span>
      </div>
      <div style={{ marginTop: "15px", color: "#666" }}>
        {En ? "Loading report details..." : "جاري تحميل تفاصيل التقرير..."}
      </div>
    </div>
  ) : viewModal.reportDetails ? (
    <div style={{ 
      backgroundColor: "#f9f9f9", 
      borderRadius: "8px", 
      padding: "15px",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)"
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
        <div style={{ 
          padding: '12px 15px', 
          borderBottom: '1px solid #eee', 
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          borderRadius: '6px'
        }}>
          <span style={{ fontWeight: 'bold', color: '#555' }}>
            {En ? "User Name:" : "اسم المستخدم:"}
          </span>
          <span>{viewModal.reportDetails.mobileUserName}</span>
        </div>
        
        <div style={{ 
          padding: '12px 15px', 
          borderBottom: '1px solid #eee', 
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          borderRadius: '6px'
        }}>
          <span style={{ fontWeight: 'bold', color: '#555' }}>
            {En ? "Phone Number:" : "رقم الهاتف:"}
          </span>
          <span dir="ltr">{viewModal.reportDetails.mobileUserPhone}</span>
        </div>
        
        <div style={{ 
          padding: '12px 15px', 
          borderBottom: '1px solid #eee', 
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          borderRadius: '6px'
        }}>
          <span style={{ fontWeight: 'bold', color: '#555' }}>
            {En ? "Issue Category:" : "نوع المشكلة:"}
          </span>
          <span>
            {En
              ? viewModal.reportDetails.issueCategoryEN
              : viewModal.reportDetails.issueCategoryAR}
          </span>
        </div>
        
        <div style={{ 
          padding: '12px 15px', 
          borderBottom: '1px solid #eee',
          backgroundColor: 'white',
          borderRadius: '6px'
        }}>
          <div style={{ fontWeight: 'bold', color: '#555', marginBottom: '5px' }}>
            {En ? "Description:" : "الوصف:"}
          </div>
          <div style={{ 
            padding: '10px', 
            backgroundColor: '#f5f5f5', 
            borderRadius: '4px',
            minHeight: '60px',
            lineHeight: '1.5'
          }}>
            {viewModal.reportDetails.description}
          </div>
        </div>
        
        <div style={{ 
          padding: '12px 15px', 
          borderBottom: '1px solid #eee', 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: '6px'
        }}>
          <span style={{ fontWeight: 'bold', color: '#555' }}>
            {En ? "Status:" : "الحالة:"}
          </span>
          <Tag
            icon={statusIcons[viewModal.reportDetails.reportStatus]}
            color={statusColors[viewModal.reportDetails.reportStatus]}
            style={{ fontSize: '14px', padding: '4px 8px' }}
          >
            {statusTranslations[viewModal.reportDetails.reportStatus] ||
              viewModal.reportDetails.reportStatus}
          </Tag>
        </div>
        
        <div style={{ 
          padding: '12px 15px', 
          borderBottom: '1px solid #eee', 
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          borderRadius: '6px'
        }}>
          <span style={{ fontWeight: 'bold', color: '#555' }}>
            {En ? "Submission Date:" : "تاريخ الإضافة:"}
          </span>
          <span>{new Date(viewModal.reportDetails.dateIssued).toLocaleString()}</span>
        </div>
        
        <div style={{ 
          padding: '12px 15px', 
          borderBottom: '1px solid #eee', 
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          borderRadius: '6px'
        }}>
          <span style={{ fontWeight: 'bold', color: '#555' }}>
            {En ? "Address:" : "العنوان:"}
          </span>
          <span>{viewModal.reportDetails.address}</span>
        </div>
        
        <div style={{ 
          padding: '12px 15px', 
          borderBottom: '1px solid #eee', 
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          borderRadius: '6px'
        }}>
          <span style={{ fontWeight: 'bold', color: '#555' }}>
            {En ? "Location:" : "الموقع:"}
          </span>
          <span>{`${viewModal.reportDetails.latitude}, ${viewModal.reportDetails.longitude}`}</span>
        </div>
        
        {viewModal.reportDetails.imageUrl && (
          <div style={{ 
            padding: '12px 15px',  
            backgroundColor: 'white',
            borderRadius: '6px'
          }}>
            <div style={{ fontWeight: 'bold', color: '#555', marginBottom: '10px' }}>
              {En ? "Issue Image:" : "صورة المشكلة:"}
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              padding: '15px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px'
            }}>
              <img
                src={
                  viewModal.reportDetails.imageUrl.startsWith("http")
                    ? viewModal.reportDetails.imageUrl
                    : `https://cms-reporting.runasp.net/${viewModal.reportDetails.imageUrl}`
                }
                alt={En ? "Issue image" : "صورة المشكلة"}
                style={{
                  maxWidth: "100%",
                  maxHeight: "350px",
                  objectFit: "contain",
                  borderRadius: "4px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/400x300?text=Image+Not+Available";
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div style={{ 
      textAlign: "center", 
      padding: "30px 20px",
      color: "#999",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      fontSize: "16px"
    }}>
      <div style={{ fontSize: '24px', marginBottom: '10px' }}>
        <SearchOutlined />
      </div>
      {En
        ? "No report details available"
        : "لا توجد تفاصيل متاحة للتقرير"}
    </div>
  )}
</Modal>
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
