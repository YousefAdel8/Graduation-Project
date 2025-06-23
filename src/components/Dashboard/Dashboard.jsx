import React, { useEffect } from "react";
import { useState } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Tooltip,
	Legend,
} from "chart.js";
import { Card, Row, Col, Statistic, Typography } from "antd";
import axios from "axios";
import { useLanguage } from "../../context/LanguageContext";
import TopCategoriesCard from "./TopCategoriesCard";
import MonthlyRateChart from "./MonthlyRateChart";
import Loading from "../LoadingPage/LoadingPage";
import { useTheme } from "../../context/ThemeContext";
const { Title } = Typography;

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
	const { isEnglish: En } = useLanguage();
	const [isLoading, setIsLoading] = useState(true);
	const { isDark } = useTheme();

	const [summaryData, setSummaryData] = useState(null);
	const summaryCardsApi = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get(
				"https://cms-reporting.runasp.net/api/Home/summary"
			);
			setSummaryData(data);
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		summaryCardsApi();
	}, []);

	const stats = summaryData
		? [
				{
					title: En ? "Total Reports Received" : "التقارير المستلمة",
					value: summaryData.totalReports,
					percentage: "+20.1",
					period: En ? "Last Month" : "من الشهر الماضي",
				},
				{
					title: En ? "Active Reports" : "التقارير النشطة",
					value: summaryData.active,
					percentage: "+180.1",
					period: En ? "Last Month" : "من الشهر الماضي",
				},
				{
					title: En ? "Resolved Reports" : "التقارير التي تم حلها",
					value: summaryData.resolved,
					percentage: "+19",
					period: En ? "Last Month" : "من الشهر الماضي",
				},
				{
					title: En ? "Pending Reports" : "تقارير قيد المراجعة",
					value: summaryData.inProgress,
					percentage: "+201",
					period: En ? "Last Hour" : "منذ الساعة الماضية",
				},
		  ]
		: [];

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<Title
						level={3}
						style={{ marginBottom: 24 }}
					className={`${En ? "text-start" : "text-end"} fw-bold `}
>
						{En ? "Dashboard" : "لوحة التحكم"}
					</Title>
					<Row gutter={[16, 16]} dir={En ? "ltr" : "rtl"}>
						{stats.map((stat, index) => (
							<Col xs={24} sm={12} lg={6} key={index}>
								<Card
									style={{
										padding: "20px",
										border: isDark ? "1px solid #282c34" : undefined,
										boxShadow: isDark
											? "0 4px 24px 0 rgba(255,255,255,0.06)"
											: "0 1.5px 10px 0 rgba(0,0,0,0.07)",
									}}
									className={
										isDark
											? " "
											: "shadow-sm"
									}
								>
									<Statistic
										title={
											<Typography.Text
												className={isDark ? "text-white" : "text-dark"}
											>
												{stat.title}
											</Typography.Text>
										}
										value={stat.value}
										valueStyle={{ color: isDark ? "#fff" : "#222" }}
										style={{ marginBottom: 8 }}
									/>
								</Card>
							</Col>
						))}
					</Row>

					<Row
						gutter={[16, 16]}
						style={{ marginTop: 16 }}
						dir={En ? "ltr" : "rtl"}
					>
						<Col xs={24} lg={14}>
							<MonthlyRateChart />
						</Col>
						<Col xs={24} lg={10}>
							<TopCategoriesCard />
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default Dashboard;
