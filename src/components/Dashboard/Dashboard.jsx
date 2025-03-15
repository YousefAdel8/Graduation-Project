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
	Badge,
	Select,
	Progress,
	Divider,
  Layout,
} from "antd";
import {
	ClockCircleOutlined,
	ArrowUpOutlined,
	ArrowDownOutlined,
	LineChartOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = ({ En = false }) => {
	const { Option } = Select;

	const [timeRange, setTimeRange] = useState("day");

	const reportData = {
		day: {
			criticalReports: 17,
			responseTime: 34,
			change: 5,
			improvementDirection: "down",
			emergencyTypes: [
				{ type: En ? "Electricity" : "كهرباء", count: 8, color: "#1677ff" },
				{ type: En ? "Gas" : "غاز", count: 5, color: "#ff4d4f" },
				{ type: En ? "Water" : "مياه", count: 4, color: "#52c41a" },
			],
		},
		week: {
			criticalReports: 86,
			responseTime: 38,
			change: 2,
			improvementDirection: "down",
			emergencyTypes: [
				{ type: En ? "Electricity" : "كهرباء", count: 38, color: "#1677ff" },
				{ type: En ? "Gas" : "غاز", count: 22, color: "#ff4d4f" },
				{ type: En ? "Water" : "مياه", count: 26, color: "#52c41a" },
			],
		},
		month: {
			criticalReports: 253,
			responseTime: 41,
			change: 8,
			improvementDirection: "up",
			emergencyTypes: [
				{ type: En ? "Electricity" : "كهرباء", count: 112, color: "#1677ff" },
				{ type: En ? "Gas" : "غاز", count: 86, color: "#ff4d4f" },
				{ type: En ? "Water" : "مياه", count: 55, color: "#52c41a" },
			],
		},
	};

	const currentData = reportData[timeRange];

	const totalEmergencies = currentData.emergencyTypes.reduce(
		(acc, item) => acc + item.count,
		0
	);
	const emergencyTypeWithPercent = currentData.emergencyTypes.map((item) => ({
		...item,
		percent: Math.round((item.count / totalEmergencies) * 100),
	}));

	const mostCommonType = [...currentData.emergencyTypes].sort(
		(a, b) => b.count - a.count
	)[0];

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
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					callback: function (value) {
						return value;
					},
				},
			},
		},
	};

	const stats = [
		{
			title: En ? "Total Reports Received" : "التقارير المستلمة",
			value: "445",
			percentage: "+20.1",
			period: En ? "Last Month" : "من الشهر الماضي",
		},
		{
			title: En ? "Critical Reports" : "التقارير الحرجة",
			value: "167",
			percentage: "+180.1",
			period: En ? "Last Month" : "من الشهر الماضي",
		},
		{
			title: En ? "Resolved Reports" : "التقارير التي تم حلها",
			value: "430",
			percentage: "+19",
			period: En ? "Last Month" : "من الشهر الماضي",
		},
		{
			title: En ? "Pending Reports" : "تقارير قيد المراجعة",
			value: "30",
			percentage: "+201",
			period: En ? "Last Hour" : "منذ الساعة الماضية",
		},
	];
	/*
  const dataServiceIssue = [
    {
      key: '1',
      name: En?'Electricity':'الكهرباء',
      percentage: 32,
    },
    {
      key: '2',
      name: En?'Gas':'الغاز',
      percentage: 42,
    },
    {
      key: '3',
      name: En?'Water':'المياه',
      percentage: 42,
    },
    {
      key: '4',
      name: En?'Internet':'الانترنت',
      percentage: 42,
    },
    {
      key: '5',
      name: En?'Telecom':'الاتصالات',
      percentage: 42,
    },
  ];
  
  */



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













	return (
		<>
			<Title level={3} style={{ marginBottom: 24 }} className="fw-bold">
				{En ? "Dashboard" : "لوحة التحكم"}
			</Title>
			<Row gutter={[16, 16]}>
				{stats.map((stat, index) => (
					<Col xs={24} sm={12} lg={6} key={index}>
						<Card bodyStyle={{ padding: "20px" }} className="shadow-sm">
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

			<Row gutter={[16, 16]} style={{ marginTop: 16 }}>
				<Col xs={24} lg={14}>
					<Card
						title={
							En
								? "Monthly rate of receiving reports"
								: "معدل استقبال التقارير شهريا"
						}
						bodyStyle={{ padding: isMobile?"10px": "30px", height:isMobile?"230px": "400px" }} 
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
										{" "}
										{En ? "Emergency Reports" : "التقارير الطارئة"}
									</span>
								</div>
								<Select
									defaultValue={timeRange}
									style={{ width: 100 }}
									onChange={setTimeRange}
								>
									<Option value="day">{En ? "Day" : "يوم"}</Option>
									<Option value="week">{En ? "Week" : "أسبوع"}</Option>
									<Option value="month">{En ? "Month" : "شهر"}</Option>
								</Select>
							</div>
						}
						bodyStyle={{ padding: "16px" ,height:isMobile?"": "440px"}}
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
												{" "}
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
										prefix={
											<ClockCircleOutlined style={{ fontSize: "18px" }} />
										}
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
													{En ? " Decrease " : "انخفاض"} {currentData.change}%
												</Text>
											</>
										) : (
											<>
												<ArrowUpOutlined
													style={{ color: "#ff4d4f", fontSize: "14px" }}
												/>
												<Text type="danger" style={{ marginRight: 4 }}>
													{En ? " Increase " : "ارتفاع"} {currentData.change}%
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
										? " Most Common Types of Emergencies "
										: " أكثر أنواع المشاكل الطارئة"}
								</Title>
								<Badge
									count={mostCommonType.type}
									style={{
										backgroundColor: mostCommonType.color,
										marginRight: "auto",
									}}
								/>
							</div>

							{emergencyTypeWithPercent.map((item, index) => (
								<div key={index} style={{ marginBottom: 10 }}>
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											marginBottom: 4,
										}}
									>
										<Text>{item.type}</Text>
										<Text strong>
											{item.count} ({item.percent}%)
										</Text>
									</div>
									<Progress
										percent={item.percent}
										showInfo={false}
										strokeColor={item.color}
										size="small"
									/>
								</div>
							))}
						</div>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default Dashboard;
