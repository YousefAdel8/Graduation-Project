import React, { useEffect, useState } from "react";
import { Table, Rate, Button } from "antd";
import axios from "axios";
import { useLanguage } from "../../../context/LanguageContext";
import ReportTableDetails from "../../ReportPage/ReportTable/ReportTableDetails";

const FeedbackTable = () => {
	const { isEnglish: En } = useLanguage();
	const [tableData, setTableData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [detailsModal, setDetailsModal] = useState({
		open: false,
		reportId: null,
	});
	const columns = [
		{
			title: En ? "User Name" : "اسم المستخدم",
			dataIndex: "mobileUserName",
			key: "mobileUserName",
		},
		{
			title: En ? "User Phone Number" : "هاتف المستخدم",
			dataIndex: "mobileUserPhone",
			key: "mobileUserPhone",
		},
		{
			title: En ? "Date Submitted" : "تاريخ الاضافة",
			dataIndex: "date",
			key: "date",
			render: (date) => new Date(date).toLocaleDateString(),
		},
		{
			title: En ? "Rate" : "تقييم المستخدم",
			dataIndex: "rateValue",
			key: "rateValue",
			render: (_, record) => <Rate disabled defaultValue={record.rateValue} />,
		},
		{
			title: En ? "Comment" : "التعليق",
			dataIndex: "comment",
			key: "comment",
		},
		{
			title: En ? "Action" : "الاجراء",
			key: "action",
			render: (_, record) => (
				<Button
					color="cyan"
					variant="filled"
					onClick={() => handleView(record)}
				>
					{En ? "Report Details" : "تفاصيل التقرير"}
				</Button>
			),
		},
	];

	const fetchData = async () => {
		setLoading(true);
		try {
			const { data } = await axios.get(
				"https://cms-reporting.runasp.net/api/Feedback/all"
			);

			const formattedData = data.map((item, index) => ({
				...item,
				key: item.id || index,
			}));

			setTableData(formattedData);
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
	}, []);

	const handleView = (record) => {
		setDetailsModal({ open: true, reportId: record.issueReportId });
	};

	return (
		<>
			<ReportTableDetails
				open={detailsModal.open}
				reportId={detailsModal.reportId}
				onClose={() => setDetailsModal({ open: false, reportId: null })}
			/>
			<div className="w-100 my-3">
				<div>
					{error && (
						<div style={{ color: "red", marginBottom: "16px" }}>{error}</div>
					)}

					<Table
						columns={columns}
						dataSource={tableData}
						loading={loading}
						scroll={{ x: 500 }}
						pagination={{
							pageSize: 7,
							position: ["bottomCenter"],
							className: "custom-pagination",
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default FeedbackTable;
