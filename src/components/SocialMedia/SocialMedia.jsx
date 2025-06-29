import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import PostCard from "./PostCard";
import { useLanguage } from "../../context/LanguageContext";
import { Typography } from "antd";
import SocialMediaApi from "./SocialMediaApi";

const { Title } = Typography;

const CommunityFeed = () => {
	const { isEnglish: En } = useLanguage();
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const loadData = async () => {
			try {
				const data = await SocialMediaApi();
				console.log("Data:", data);
				if (Array.isArray(data)) {
					setPosts(data);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		loadData();
	}, []);
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				width: "100%",
				minHeight: "100vh",
				paddingTop: 20,
				paddingBottom: 40,
				justifyContent: "center",
			}}
		>
			<div
				style={{
					width: "100%",
					maxWidth: 600,
					padding: "0 12px",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<div
					style={{
						marginBottom: 24,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
					dir={En ? "ltr" : "rtl"}
				>
					<Title level={4} style={{ margin: 0, fontWeight: "600" }}>
						{En ? "Community Feed" : "منصة المجتمع"}
					</Title>
				</div>

				<Row gutter={[0, 16]} style={{ width: "100%" }}>
					{posts.map((post, index) => (
						<Col xs={24} key={index} style={{ width: "100%" }}>
							<PostCard post={post} En={En} />
						</Col>
					))}
				</Row>
			</div>
		</div>
	);
};

export default CommunityFeed;
