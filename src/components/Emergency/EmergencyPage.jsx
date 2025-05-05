import React from "react";
import { Card, Row, Col ,Typography} from "antd";
import { useLanguage } from "../../context/LanguageContext";
import EmergencyTable from "./EmergencyTable";
const { Title } = Typography;
export default function EmergencyPage() {
    const { isEnglish: En } = useLanguage();
    return (
        <>
            <Title level={3} style={{ marginBottom: 24 }} className="fw-bold">
                {En?"Emergency Table":"جدول الطوارئ"}
            </Title>
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col xs={24} sm={24} lg={24}>
                    <Card
                        Style={{ padding: "0px", width: "100%",minHeight:"535px" }}
                        className="shadow-sm"
                    >
                        <EmergencyTable className="shadow-sm"/>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
