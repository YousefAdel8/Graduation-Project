import React, { useEffect, useState } from "react";
import {
	Card,
	Row,
	Col,
	Statistic,
	Typography,
	Badge,
	Select,
	Divider,
} from "antd";
import {
	ClockCircleOutlined,
	ArrowUpOutlined,
	ArrowDownOutlined,
	LineChartOutlined,
} from "@ant-design/icons";
import { useLanguage } from "../../context/LanguageContext";
import axios from "axios";

const { Option } = Select;
const { Text, Title } = Typography;

export default function TopCategoriesCard() {
	const { isEnglish: En } = useLanguage();
	const [timeRange, setTimeRange] = useState("day");
	const [CriticalReportsApi, setCriticalReportsApi] = useState({});
	const [categories, setCategories] = useState([]);

	const getCriticalReportsApi = async () => {
		const { data } = await axios.get(
			"https://cms-reporting.runasp.net/api/Home/critical-reports-dashboard"
		);
		setCriticalReportsApi(data);
	};

	const getTopCategories = async () => {
		const { data } = await axios.get(
			"https://cms-reporting.runasp.net/api/Home/reports/top-categories"
		);
		setCategories(data);
        console.log(data , categories);
	};

	useEffect(() => {
		getCriticalReportsApi();
		getTopCategories();
	}, []);

	const reportData = {
		day: {
			criticalReports: CriticalReportsApi.todayReports,
			responseTime: CriticalReportsApi.averageResponseTimeMinutes,
			change: CriticalReportsApi.dailyChangePercentage,
			improvementDirection: "down",
		},
		month: {
			criticalReports: CriticalReportsApi.monthReports,
			responseTime: CriticalReportsApi.averageResponseTimeMinutes,
			change: CriticalReportsApi.monthlyChangePercentage,
			improvementDirection: "up",
		},
		year: {
			criticalReports: CriticalReportsApi.yearReports,
			responseTime: CriticalReportsApi.averageResponseTimeMinutes,
			change: CriticalReportsApi.yearlyChangePercentage,
			improvementDirection: "down",
		},
	};

	const currentData = reportData[timeRange] || {};

	return (
		<Card
			title={
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<div style={{ display: "flex", alignItems: "center" }}>
						<span style={{ marginRight: 8, fontWeight: "bold" }}>
							{En ? "Emergency Reports" : "التقارير الطارئة"}
						</span>
					</div>
					<Select
						value={timeRange}
						style={{ width: 100 }}
						onChange={setTimeRange}
					>
						<Option value="day">{En ? "Day" : "يوم"}</Option>
						<Option value="month">{En ? "Month" : "شهر"}</Option>
						<Option value="year">{En ? "Year" : "سنة"}</Option>
					</Select>
				</div>
			}
			style={{ padding: "16px", minHeight: "360px" }}
			className="shadow-sm"
		>
			<Row gutter={[16, 16]}>
				<Col xs={24} sm={12}>
					<Card
						bordered={false}
						style={{ backgroundColor: "#fff7e6", borderRadius: 6 }}
					>
						<Statistic
							title={
								<Text strong style={{ fontSize: 16 }}>
									{En ? "Critical Reports" : "التقارير الحرجة"}
								</Text>
							}
							value={currentData.criticalReports}
							valueStyle={{ color: "#fa8c16", fontWeight: "bold" }}
							prefix={<Badge status="error" />}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12}>
					<Card
						bordered={false}
						style={{ backgroundColor: "#f6ffed", borderRadius: 6 }}
					>
						<Statistic
							title={
								<Text strong style={{ fontSize: 16 }}>
									{En ? "Average Response Time" : "متوسط وقت الاستجابة"}
								</Text>
							}
							value={currentData.responseTime}
							valueStyle={{ color: "#52c41a", fontWeight: "bold" }}
							prefix={<ClockCircleOutlined style={{ fontSize: "18px" }} />}
							suffix={En ? "min" : "دقيقة"}
						/>
						<div
							style={{
								marginTop: 5,
								display: "flex",
								alignItems: "center",
							}}
						>
							{currentData.improvementDirection === "down" ? (
								<>
									<ArrowDownOutlined
										style={{ color: "#52c41a", fontSize: "14px" }}
									/>
									<Text type="success" style={{ marginRight: 4 }}>
										{En ? "Decrease" : "انخفاض"} {currentData.change}%
									</Text>
								</>
							) : (
								<>
									<ArrowUpOutlined
										style={{ color: "#ff4d4f", fontSize: "14px" }}
									/>
									<Text type="danger" style={{ marginRight: 4 }}>
										{En ? "Increase" : "ارتفاع"} {currentData.change}%
									</Text>
								</>
							)}
						</div>
					</Card>
				</Col>
			</Row>

			<Divider style={{ margin: "16px 0" }} />

			<div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						marginBottom: 12,
					}}
				>
					<LineChartOutlined style={{ fontSize: "18px" }} />
					<Title level={5} style={{ margin: "0 8px" }}>
                    {En
						? " Most Common Types of Reports"
						: " أكثر أنواع المشاكل"}
					</Title>
				</div>

				{categories.length > 0 ? (
  categories.map((item, idx) => (
    <div
      key={idx}
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 10,
      }}
    >
      <Text>{En ? item.category : item.category}</Text>
      <Text strong>{item.count}</Text>
    </div>
  ))
) : (
  <Text type="secondary">
    {En ? "No data to display." : "لا يوجد بيانات للعرض."}
  </Text>
)}
			</div>
		</Card>
	);
}
