import React from "react";
import { Card, Row, Col ,Typography} from "antd";
import ReportTable from "./ReportTable/ReportTable";

const { Title } = Typography;
export default function ReportPage({En = true}) {
    return (
        <>
            <Title level={3} style={{ marginBottom: 24 }} className="fw-bold">
                {En?"Reports":"التقارير"}
            </Title>
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col xs={24} sm={24} lg={24}>
                    <Card
                        bodyStyle={{ padding: "0px", width: "100%",minHeight:"590px" }}
                        className="shadow-sm"
                    >
                        <ReportTable />
                    </Card>
                </Col>
            </Row>
        </>
    );
}
