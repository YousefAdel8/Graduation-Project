import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { useLanguage } from '../../context/LanguageContext';
import axios from 'axios';

export default function MonthlyRateChart() {
    const { isEnglish: En } = useLanguage();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [chartLabels, setChartLabels] = useState([]);
    const [chartData, setChartData] = useState([]);
        
        useEffect(() => {
          const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
          };
      
          window.addEventListener("resize", handleResize);
          
          return () => {
            window.removeEventListener("resize", handleResize);
          };
        }, []);

        const getMonthlyRate = async () => {
            try {
                const { data } = await axios.get("https://cms-reporting.runasp.net/api/Home/monthly-report-counts");
    
                const labels = data.map(item => item.monthName);
                const reportCounts = data.map(item => item.reportCount);
                console.log("data is ",data[0].monthName);
                setChartLabels(labels);
                setChartData(reportCounts);
            } catch (error) {
                console.error("Error fetching monthly rate:", error);
            }
            };
        
            useEffect(() => {
                getMonthlyRate();
            }, []);

        const data = {
            labels: chartLabels,
            datasets: [
                {
                    label: En ? "Reports" : "التقارير",
                    data: chartData,
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
  return (
    <>
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
                    </>
  )
}
