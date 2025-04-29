import React, { useEffect } from "react";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Tooltip,
	Legend,
} from "chart.js";
import {
	Card,
	Row,
	Col,
	Statistic,
	Typography,
} from "antd";
import {
	ClockCircleOutlined,
	ArrowUpOutlined,
	ArrowDownOutlined,
	LineChartOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useLanguage } from "../../context/LanguageContext";
import TopCategoriesCard from "./TopCategoriesCard";
const { Title, Text } = Typography;

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
	const { isEnglish: En } = useLanguage();
	

	

	const data = {
		labels: En
			? ["January", "February", "March", "April", "May"]
			: ["يناير", "فبراير", "مارس", "أبريل", "مايو"],
		datasets: [
			{
				label: En ? "Reports" : "التقارير",
				data: [10, 20, 15, 30, 25],
				backgroundColor: "rgb(2, 8, 23)",
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
    Layout:{
      padding:{ bottom:10},
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          drawerBorder:false,
        },
		ticks: {
			callback: function (value) {
				return value;
			},
		},
      },
    },
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
		},
		
	};

	
	const [summaryData,setSummaryData]=useState(null);
	const summaryCardsApi=async()=>{
		
			let { data } = await axios.get(
				"https://cms-reporting.runasp.net/api/home/summary"
		)
		//console.log(data);
		setSummaryData(data);
		
	}

	useEffect(() => {
		summaryCardsApi();
	}, []);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
  
      window.addEventListener("resize", handleResize);
      
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

	const stats = summaryData?
	[
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
	]: [];


	return (
		<>
			<Title level={3} style={{ marginBottom: 24 }} className={En ? "text-start fw-bold" : "text-end fw-bold"} >
				{En ? "Dashboard" : "لوحة التحكم"}
			</Title>
			<Row gutter={[16, 16]} dir={En ? "ltr" : "rtl"}>
				{stats.map((stat, index) => (
					<Col xs={24} sm={12} lg={6} key={index}>
						<Card Style={{ padding: "20px" }} className="shadow-sm" >
							<Statistic
								title={<Typography.Text>{stat.title}</Typography.Text>}
								value={stat.value}
								style={{ marginBottom: 8 }}
							/>
							<Text type="secondary">
								<Text type="success">{stat.percentage}%</Text> {stat.period}
							</Text>
						</Card>
					</Col>
				))}
			</Row>

			<Row gutter={[16, 16]} style={{ marginTop: 16 }} dir={En ? "ltr" : "rtl"}>
				<Col xs={24} lg={14}>
					<Card
						title={
							En
								? "Monthly rate of receiving reports"
								: "معدل استقبال التقارير شهريا"
						}
						Style={{ padding: isMobile?"10px": "30px", height:isMobile?"230px": "400px" }} 
						className="shadow-sm" 
					>
						{
							<div className="w-100 h-100" >
								<Bar data={data} options={options} className={`w-100 h-100`} />
							</div>
						}
					</Card>
				</Col>
				<Col xs={24} lg={10}>
					<TopCategoriesCard/>
				</Col>
			</Row>
		</>
	);
};

export default Dashboard;
