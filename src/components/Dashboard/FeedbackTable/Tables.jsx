import React from "react";
import { Card, Row, Col ,Typography} from "antd";
import FeedbackTable from "./FeedbackTable";
const { Title } = Typography;
export default function Tables({En = false}) {
	return (
		<>
			<Title level={3} style={{ marginBottom: 24 }} className="fw-bold">
				{En?"Feedback":"التقييمات"}
			</Title>
			<Row gutter={[16, 16]} style={{ marginTop: 16 }}>
				<Col xs={24} sm={24} lg={24}>
					<Card
						bodyStyle={{ padding: "0px", width: "100%" }}
						className="shadow-sm"
					>
						<FeedbackTable />
					</Card>
				</Col>
			</Row>
		</>
	);
}
