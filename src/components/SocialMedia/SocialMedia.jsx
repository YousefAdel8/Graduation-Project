import React from "react";
import { Row, Col } from "antd";
import PostCard from "./PostCard";
import { useLanguage } from "../../context/LanguageContext";
import { Typography } from "antd";

const { Title  } = Typography;

const CommunityFeed = () => {
	const { isEnglish: En } = useLanguage();

	const posts = [
		{
			id: 1,
			name: "Ahmed Hassan",
			icon: "https://img.icons8.com/office/80/000000/user-male-circle.png",
			time: "قبل ساعتين",
			discription:
				"التكدس المروري في شارع الملك فيصل يزداد سوءاً. #ازمة_المرور",
			likesCount: 13,
			commentCount: 15,
			shareCount: 5,
			media: [
				{
					type: "image",
					url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
				},
			],
			mediaCount: 1,
			postLink: "https://www.example.com/post/1",
		},
		{
			id: 2,
			name: "فاطمة علي",
			icon: "https://img.icons8.com/office/80/000000/user-female-circle.png",
			time: "قبل يوم واحد",
			discription:
				"مشكلة تراكم القمامة في حي السلام مستمرة. نطالب بتحسين خدمات النظافة والبلدية. #نظافة_المدينة",
			likesCount: 25,
			commentCount: 8,
			shareCount: 3,
			media: [
				{
					type: "image",
					url: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&q=80",
				},
			],
			mediaCount: 3,
			postLink: "https://www.example.com/post/2",
		},
		{
			id: 3,
			name: "محمد خالد",
			icon: "https://img.icons8.com/office/80/000000/user-male-circle.png",
			time: "قبل 6 ساعات",
			discription:
				"إنارة الشوارع متقطعة في منطقة المعادي ليلاً. هذا يشكل خطراً على السلامة العامة. #إنارة_الشوارع",
			likesCount: 10,
			commentCount: 22,
			shareCount: 12,
			media: [
				{
					type: "image",
					url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&q=80",
				},
			],
			mediaCount: 2,
			postLink: "https://www.example.com/post/3",
		},
		{
			id: 4,
			name: "سارة محمود",
			icon: "https://img.icons8.com/office/80/000000/user-female-circle.png",
			time: "قبل 3 أيام",
			discription:
				"تم افتتاح الحديقة العامة الجديدة في منطقة الشروق. مكان رائع للعائلات! #أماكن_ترفيهية #الشروق",
			likesCount: 45,
			commentCount: 12,
			shareCount: 8,
			media: [
				{
					type: "video",
					url: "https://assets.mixkit.co/videos/preview/mixkit-people-walking-in-a-park-on-a-sunny-day-4796-large.mp4",
				},
			],
			mediaCount: 1, // Just one video
			postLink: "https://www.example.com/post/4",
		},
		{
			id: 5,
			name: "عمر الشريف",
			icon: "https://img.icons8.com/office/80/000000/user-male-circle.png",
			time: "قبل 12 ساعة",
			discription:
				"انقطاع المياه المستمر في حي الهرم يسبب أزمة للسكان. نطالب المسؤولين بالتدخل السريع. #أزمة_المياه #الهرم",
			likesCount: 67,
			commentCount: 34,
			shareCount: 21,
			media: [
				{
					type: "image",
					url: "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?w=800&q=80",
				},
			],
			mediaCount: 5,
			postLink: "https://www.example.com/post/5",
		},
	];

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
