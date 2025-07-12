import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
	Card,
	Typography,
	Tag,
	Space,
	Row,
	Col,
	Image,
	Skeleton,
	Empty,
	Divider,
	Input,
	Pagination,
	DatePicker,
	Button,
} from "antd";
import {
	HeartOutlined,
	ShareAltOutlined,
	CalendarOutlined,
	FileTextOutlined,
	FilterOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useLanguage } from "../../context/LanguageContext";

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;

// Enhanced API function with proper error handling and pagination
const SocialMediaApi = async (filters, pageNumber = 1, pageSize = 10) => {
	const token = localStorage.getItem("userToken");

	if (!token) {
		console.warn("No token found in localStorage.");
		throw new Error("Authentication required");
	}

	try {
		const response = await axios.get(
			`https://cms-reporting.runasp.net/api/Report/social-media-reports`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				params: {
					search: filters.search || "",
					pageNumber: pageNumber,
					pageSize: pageSize,
					From: filters.From || null,
					To: filters.To || null,
				},
			}
		);
		
		console.log("Social Media Reports Response:", response.data);
		
		// Extract pagination info from headers if available
		const paginationHeader = response.headers["pagination"];
		let totalCount = 0;
		
		if (paginationHeader) {
			const pagination = JSON.parse(paginationHeader);
			totalCount = pagination.totalItems || pagination.totalCount || 0;
		} else {
			// Fallback calculation
			const dataLength = response.data.value?.length || 0;
			totalCount = dataLength === pageSize ? pageNumber * pageSize + 50 : (pageNumber - 1) * pageSize + dataLength;
		}
		
		return {
			data: response.data.value || [],
			totalCount,
			currentPage: pageNumber,
			pageSize,
		};
	} catch (error) {
		console.error("Error fetching social media reports:", error);
		throw error;
	}
};

const CommunityFeed = () => {
	const { isEnglish: En } = useLanguage();
	const [reports, setReports] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [totalCount, setTotalCount] = useState(0);
	
	// Filter states
	const [searchInput, setSearchInput] = useState("");
	const [filters, setFilters] = useState({
		search: "",
		From: null,
		To: null,
	});
	
	// Show/hide filters
	const [showFilters, setShowFilters] = useState(false);

	// Fetch reports function
	const fetchReports = async () => {
		try {
			setLoading(true);
			setError(null);
			const result = await SocialMediaApi(filters, currentPage, pageSize);
			setReports(result.data);
			setTotalCount(result.totalCount);
		} catch (error) {
			console.error("Error fetching data:", error);
			setError(En ? "Failed to load reports. Please try again." : "فشل في تحميل التقارير. يرجى المحاولة مرة أخرى.");
			setReports([]);
		} finally {
			setLoading(false);
		}
	};

	// Effect to fetch data when dependencies change
	useEffect(() => {
		fetchReports();
	}, [currentPage, pageSize, filters.search, filters.From, filters.To]);

	// Handle pagination
	const handlePageChange = (page, size) => {
		setCurrentPage(page);
		setPageSize(size);
	};

	// Handle search input change
	const handleSearchInputChange = (e) => {
		setSearchInput(e.target.value);
	};

	// Handle search submit
	const handleSearchSubmit = () => {
		setFilters(prev => ({ ...prev, search: searchInput }));
		setCurrentPage(1);
	};

	// Handle date range change
	const handleDateRangeChange = (dates, dateStrings) => {
		setFilters(prev => ({
			...prev,
			From: dateStrings[0] || null,
			To: dateStrings[1] || null,
		}));
		setCurrentPage(1);
	};

	// Clear all filters
	const clearFilters = () => {
		setSearchInput("");
		setFilters({
			search: "",
			From: null,
			To: null,
		});
		setCurrentPage(1);
	};

	// Format date function
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString(En ? "en-US" : "ar-EG", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	// Loading state
	if (loading && reports.length === 0) {
		return (
			<div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
				{/* Header Skeleton */}
				<div style={{ textAlign: "center", marginBottom: "40px" }}>
					<Skeleton.Button active size="large" style={{ width: "300px", height: "60px" }} />
				</div>
				
				{/* Search Bar Skeleton */}
				<div style={{ 
					background: "white", 
					padding: "20px", 
					borderRadius: "12px", 
					marginBottom: "30px",
					boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
				}}>
					<Skeleton.Input active size="large" style={{ width: "400px", height: "40px" }} />
				</div>
				
				{/* Reports Grid Skeleton */}
				<Row gutter={[20, 20]}>
					{[1, 2, 3, 4, 5, 6].map(i => (
						<Col xs={24} md={12} lg={8} key={i}>
							<Card>
								<Skeleton active />
							</Card>
						</Col>
					))}
				</Row>
			</div>
		);
	}

	return (
		<div
			style={{
				maxWidth: "1200px",
				margin: "0 auto",
				padding: "20px",
				direction: En ? "ltr" : "rtl",
			}}
		>
			{/* Header */}
			<div
				style={{
					textAlign: "center",
					marginBottom: "40px",
					background: "linear-gradient(135deg, #129990 0%, #0d726b 100%)",
					padding: "30px",
					borderRadius: "15px",
					color: "white",
					boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
				}}
			>
				<FileTextOutlined style={{ fontSize: "48px", marginBottom: "10px" }} />
				<Title level={2} style={{ color: "white", margin: "0" }}>
					{En ? "Community Reports Dashboard" : "لوحة تقارير المجتمع"}
				</Title>
				<Text style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px" }}>
					{En
						? `${totalCount} Reports Available`
						: `${totalCount} تقرير متاح`}
				</Text>
			</div>

			{/* Search and Filter Section */}
			<div
				style={{
					background: "white",
					padding: "20px",
					borderRadius: "12px",
					marginBottom: "30px",
					boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
					direction: En ? "ltr" : "rtl",
				}}
			>
				{/* Search Bar */}
				<div style={{ marginBottom: "20px" }}>
					<Space.Compact style={{ width: "100%", maxWidth: "500px" }}>
						<Input
							placeholder={En ? "Search reports..." : "ابحث في التقارير..."}
							allowClear
							value={searchInput}
							style={{
								borderRadius: "8px 0 0 8px",
							}}
							size="large"
							onChange={handleSearchInputChange}
							onPressEnter={handleSearchSubmit}
						/>
						<Button
							type="primary"
							icon={<SearchOutlined />}
							size="large"
							onClick={handleSearchSubmit}
							style={{
								borderRadius: "0 8px 8px 0",
								padding: "0 15px",
							}}
						>
							{En ? "Search" : "بحث"}
						</Button>
					</Space.Compact>
				</div>

				{/* Filter Toggle */}
				<div style={{ marginBottom: showFilters ? "20px" : "0" }}>
					<Button
						type="text"
						icon={<FilterOutlined />}
						onClick={() => setShowFilters(!showFilters)}
						style={{ marginBottom: "10px" }}
					>
						{En ? "Advanced Filters" : "فلاتر متقدمة"}
					</Button>
				</div>

				{/* Advanced Filters */}
				{showFilters && (
					<div style={{ marginBottom: "20px" }}>
						<Space wrap size="middle">
							<RangePicker
								format="YYYY-MM-DD"
								onChange={handleDateRangeChange}
								placeholder={[
									En ? "Start Date" : "تاريخ البداية",
									En ? "End Date" : "تاريخ النهاية"
								]}
								style={{ borderRadius: "8px" }}
							/>
							<Button onClick={clearFilters}>
								{En ? "Clear Filters" : "مسح الفلاتر"}
							</Button>
						</Space>
					</div>
				)}

			</div>

			{/* Error Message */}
			{error && (
				<div style={{ 
					background: "#fff2f0", 
					border: "1px solid #ffccc7", 
					padding: "12px", 
					borderRadius: "6px", 
					color: "#ff4d4f",
					marginBottom: "20px",
					textAlign: "center"
				}}>
					{error}
				</div>
			)}

			{/* Loading Overlay */}
			{loading && reports.length > 0 && (
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" ,flexDirection: "column"}}>
					<Skeleton active />
					<Skeleton active />
				</div>
			)}

			{/* Reports Grid */}
			<Row gutter={[20, 20]} style={{ marginBottom: "40px" }}>
				{reports.map((report) => (
					<Col xs={24} md={12} lg={8} key={report.reportId}>
						<Card
							style={{
								borderRadius: "15px",
								overflow: "hidden",
								boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
								border: "none",
								height: "100%",
								transition: "transform 0.2s ease, box-shadow 0.2s ease",
							}}
							hoverable
							cover={
								report.photoUrl ? (
									<div style={{ 
										height: "250px", 
										overflow: "hidden",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										backgroundColor: "#f5f5f5"
									}}>
										<Image
											src={`https://cms-reporting.runasp.net/${report.photoUrl}`}
											alt={En ? "Report Image" : "صورة التقرير"}
											style={{
												width: "100%",
												height: "100%",
												objectFit: "cover",
											}}
											placeholder={
												<Skeleton.Image
													style={{ width: "100%", height: "250px" }}
												/>
											}
										/>
									</div>
								) : (
									<div
										style={{
											height: "250px",
											backgroundColor: "#f0f0f0",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											fontSize: "48px",
											color: "#ccc",
										}}
									>
										📋
									</div>
								)
							}
							actions={[
								<div style={{ color: "#ff4d4f", display: "flex", alignItems: "center", justifyContent: "center" }}>
									<HeartOutlined style={{ marginRight: "5px" }} />
									<span>{report.likes || 0}</span>
								</div>,
								<div style={{ color: "#1890ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
									<ShareAltOutlined style={{ marginRight: "5px" }} />
									<span>{report.shares || 0}</span>
								</div>,
							]}
						>
							<Card.Meta
								title={
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
											marginBottom: "10px",
										}}
									>
										<Text strong style={{ fontSize: "16px", color: "#001529" }}>
											{En
												? `Report #${report.reportId}`
												: `تقرير #${report.reportId}`}
										</Text>
										<Tag
											style={{
												fontSize: "12px",
												fontWeight: "bold",
												backgroundColor: "#e6f7ff",
												color: "#1890ff",
												borderRadius: "12px",
											}}
										>
											{report.issueCategory}
										</Tag>
									</div>
								}
								description={
									<div>
										<Paragraph
											ellipsis={{
												rows: 3,
												expandable: true,
												symbol: En ? "more" : "المزيد",
											}}
											style={{
												fontSize: "14px",
												color: "#666",
												marginBottom: "15px",
												lineHeight: "1.6",
											}}
										>
											{report.description}
										</Paragraph>

										<Divider style={{ margin: "15px 0" }} />

										<div style={{ 
											display: "flex", 
											justifyContent: "space-between", 
											alignItems: "center",
											fontSize: "12px", 
											color: "#888" 
										}}>
											<Space>
												<CalendarOutlined />
												<span>{formatDate(report.postedAt)}</span>
											</Space>
											{report.location && (
												<Text type="secondary" style={{ fontSize: "12px" }}>
													📍 {report.location}
												</Text>
											)}
										</div>
									</div>
								}
							/>
						</Card>
					</Col>
				))}
			</Row>

			{/* Pagination */}
			{totalCount > 0 && (
				<div style={{ textAlign: "center", marginTop: "40px" }}>
					<Pagination
						current={currentPage}
						total={totalCount}
						pageSize={pageSize}
						showSizeChanger
						showQuickJumper
						
						onChange={handlePageChange}
						onShowSizeChange={handlePageChange}
						pageSizeOptions={['5', '10', '20', '50']}
						style={{ direction: En ? "ltr" : "rtl" }}
					/>
				</div>
			)}

			{/* Empty State */}
			{reports.length === 0 && !loading && (
				<Empty
					style={{ 
						marginTop: "50px", 
						padding: "40px",
						background: "white",
						borderRadius: "12px",
						boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
					}}
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					description={
						<div>
							<Title level={4} style={{ color: "#888", marginBottom: "10px" }}>
								{En ? "No Reports Found" : "لا توجد تقارير"}
							</Title>
							<Text type="secondary">
								{En 
									? "Try adjusting your search or filters to find what you're looking for." 
									: "جرب تعديل البحث أو الفلاتر للعثور على ما تبحث عنه."}
							</Text>
						</div>
					}
				/>
			)}
		</div>
	);
};

export default CommunityFeed;