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
import { useTheme } from "../../context/ThemeContext";

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
		console.log(CriticalReportsApi);
	};

	const getTopCategories = async () => {
		const token = localStorage.getItem("userToken");
		
			if (!token) {
				console.warn("No token found in localStorage.");
				return;
			}
		
			try {
				const response = await axios.get(
					`https://cms-reporting.runasp.net/api/Category/top-reported`,
					
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);
				console.log("Response Data2:", response.data);
				setCategories(response.data);
			} catch (error) {
				throw error;
			}
		};
	

	useEffect(() => {
		getCriticalReportsApi();
		getTopCategories();
	}, []);

	const formatAverageResponseTimeMinutes = (minutes) => {
		if (!minutes || isNaN(minutes)) return "-";

		const timeUnits = [
			{ en: "year", ar: "سنة", inMins: 60 * 24 * 365 },
			{ en: "month", ar: "شهر", inMins: 60 * 24 * 30 },
			{ en: "day", ar: "يوم", inMins: 60 * 24 },
			{ en: "hour", ar: "ساعة", inMins: 60 },
			{ en: "minute", ar: "دقيقة", inMins: 1 },
		];

		const getArabicUnit = (val, unit) => {
			const units = {
				سنة:
					val === 1 ? "سنة" : val === 2 ? "سنتين" : val < 11 ? "سنوات" : "سنة",
				شهر:
					val === 1 ? "شهر" : val === 2 ? "شهرين" : val < 11 ? "شهور" : "شهر",
				يوم:
					val === 1 ? "يوم" : val === 2 ? "يومين" : val < 11 ? "أيام" : "يوم",
				ساعة:
					val === 1
						? "ساعة"
						: val === 2
						? "ساعتين"
						: val < 11
						? "ساعات"
						: "ساعة",
				دقيقة:
					val === 1
						? "دقيقة"
						: val === 2
						? "دقيقتين"
						: val < 11
						? "دقائق"
						: "دقيقة",
			};
			return units[unit];
		};

		let remain = Math.floor(minutes);
		let result = [];

		for (const { en, ar, inMins } of timeUnits) {
			const val = Math.floor(remain / inMins);
			if (val > 0) {
				result.push(
					En
						? `${val} ${en}${val > 1 ? "s" : ""}`
						: `${val} ${getArabicUnit(val, ar)}`
				);
				remain = remain % inMins;
			}
			if (result.length === 2) break;
		}

		return En ? result.join(" and ") : result.reverse().join(" و ");
	};

	const reportData = {
		day: {
			criticalReports: CriticalReportsApi.todayReports,
			responseTime: formatAverageResponseTimeMinutes(
				CriticalReportsApi.averageResponseTimeMinutes
			),
			change: CriticalReportsApi.dailyChangePercentage,
			improvementDirection: "down",
		},
		month: {
			criticalReports: CriticalReportsApi.monthReports,
			responseTime: formatAverageResponseTimeMinutes(
				CriticalReportsApi.averageResponseTimeMinutes
			),
			change: CriticalReportsApi.monthlyChangePercentage,
			improvementDirection: "up",
		},
		year: {
			criticalReports: CriticalReportsApi.yearReports,
			responseTime: formatAverageResponseTimeMinutes(
				CriticalReportsApi.averageResponseTimeMinutes
			),
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
						<span style={{ marginRight: 8, fontWeight: "bold" }} >
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
								<Text strong style={{ fontSize: 16 }} className={`text-dark`}>
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
						style={{ backgroundColor: "#f6ffed", borderRadius: 6 ,minWidth:"190px"}}
					>
						<Statistic
							
							title={
								<Text
									strong
									style={{ fontSize: 16, textAlign: En ? "left" : "right" }}
									className={`text-dark`}
								>
									{En ? "Average Response Time" : "متوسط وقت الاستجابة"}
								</Text>
							}
							value={" "}
							formatter={() => (
								<div
									style={{
										fontSize: 24,
										fontWeight: "bold",
										color: "#52c41a",
										direction: En ? "ltr" : "rtl",
										textAlign: En ? "left" : "right",
										width: "100%",
										display: "flex",
										alignItems: "center",
										justifyContent: En ? "flex-start" : "flex-end",
									}}
								>
									<ClockCircleOutlined
										style={{ fontSize: "18px", marginInlineEnd: 8 }}
									/>
									{formatAverageResponseTimeMinutes(
										CriticalReportsApi.averageResponseTimeMinutes
									)}
								</div>
							)}
							prefix={null}
						/>
						<div
							style={{
								marginTop: 5,
								display: "flex",
								alignItems: "center",
							}}
						>
							{/*currentData.improvementDirection === "down" ? (
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
							)*/}
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
						{En ? " Most Common Types of Reports" : " أكثر أنواع المشاكل"}
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
							<Text>{En ? item.categoryEN : item.categoryAR}</Text>
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
