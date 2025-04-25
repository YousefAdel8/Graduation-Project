import React from "react";
import { Card, Row, Col, Typography, Avatar, Carousel, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faThumbsUp,
	faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

const { Title, Text, Paragraph } = Typography;

const SocialMedia = ({ En = false }) => {
	const formatHashtags = (text) => {
		if (!text) return text;
		const parts = text.split(/(#[^\s]+)/g);
		return parts.map((part, i) =>
			part.startsWith("#") ? (
				<Text key={i} style={{ color: "#1976d2", fontWeight: 500 }}>
					{part}
				</Text>
			) : (
				part
			)
		);
	};

	const posts = [
		{
			id: 1,
			name: "Ahmed Hassan",
			icon: "https://img.icons8.com/office/80/000000/user-male-circle.png",
			time: En ? "2 hours ago" : "قبل ساعتين",
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
				{
					type: "image",
					url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&q=80",
				},
				{
					type: "video",
					url: "https://assets.mixkit.co/videos/preview/mixkit-cars-in-front-of-a-highway-in-the-city-22351-large.mp4",
				},
			],
			postLink: "https://www.example.com/post/1",
		},
		{
			id: 2,
			name: "Fatima Ali",
			icon: "https://img.icons8.com/office/80/000000/user-female-circle.png",
			time: En ? "1 day ago" : "قبل 1 يوم",
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
				{
					type: "image",
					url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80",
				},
				{
					type: "video",
					url: "https://assets.mixkit.co/videos/preview/mixkit-garbage-dump-in-the-countryside-3562-large.mp4",
				},
			],
			postLink: "https://www.example.com/post/2",
		},
		{
			id: 3,
			name: "Mohamed Khalid",
			icon: "https://img.icons8.com/office/80/000000/user-male-circle.png",
			time: En ? "6 hours ago" : "قبل 6 ساعات",
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
				{
					type: "image",
					url: "https://images.unsplash.com/photo-1573871669414-010dbf73ca84?w=800&q=80",
				},
			],
			postLink: "https://www.example.com/post/3",
		},
		{
			id: 4,
			name: "Ahmed Hassan",
			icon: "https://img.icons8.com/office/80/000000/user-male-circle.png",
			time: En ? "2 hours ago" : "قبل ساعتين",
			discription:
				"التكدس المروري في شارع الملك فيصل يزداد سوءاً. #ازمة_المرور",
			likesCount: 13,
			commentCount: 15,
			shareCount: 5,
			postLink: "https://www.example.com/post/4",
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
							<Card
								style={{
									overflow: "hidden",
									borderRadius: "14px",
									background: "#fff",
									border: "1.5px solid rgb(215, 212, 212)",
								}}
								bodyStyle={{ padding: 0 }}
							>
								{/* Header */}
								<div
									style={{
										padding: "12px 16px",
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}
									dir={En ? "ltr" : "rtl"}
								>
									<div
										style={{ display: "flex", alignItems: "center", gap: 10 }}
									>
										<Avatar
											src={post.icon}
											size={46}
											style={{ border: "1px solid #eaeaea" }}
										/>
										<div>
											<Text
												style={{
													fontSize: "15px",
													fontWeight: "600",
													display: "block",
													lineHeight: 1.2,
												}}
											>
												{post.name}
											</Text>
											<Text type="secondary" style={{ fontSize: "13px" }}>
												{post.time}
											</Text>
										</div>
									</div>
									{/*url to post*/}
									<a
										href={post.postLink}
										target="_blank"
										rel="noopener noreferrer"
									>
										<Button
											type="link"
											style={{ fontSize: "13px", fontWeight: "600" }}
										>
											<FontAwesomeIcon icon={faUpRightFromSquare} />
										</Button>
									</a>
								</div>

								{/* Content */}
								<div style={{ padding: "0 16px 10px" }}>
									<Paragraph
										style={{
											margin: 0,
											fontWeight: "400",
											fontSize: "15px",
											marginBottom: post.media && post.media.length ? 12 : 0,
											direction: En ? "ltr" : "rtl",
											textAlign: En ? "left" : "right",
										}}
									>
										{formatHashtags(post.discription)}
									</Paragraph>
								</div>

								{/* Media */}
								{post.media && post.media.length ? (
									<div
										style={{
											position: "relative",
											borderTop: "1px solid #f0f0f0",
											borderBottom: "1px solid #f0f0f0",
										}}
									>
										<Carousel
											style={{ width: "100%" }}
											dots={{ className: "carousel-dots" }}
											autoplay={false}
											arrows={true}
											infinite={false}
										>
											{post.media.map((item, idx) => (
												<div key={idx}>
													<div
														style={{
															position: "relative",
															width: "100%",
															paddingBottom: "56.25%", // 16:9 aspect ratio
															background: "#000",
														}}
													>
														{item.type === "image" ? (
															<img
																src={item.url}
																alt="media"
																style={{
																	position: "absolute",
																	top: 0,
																	left: 0,
																	width: "100%",
																	height: "100%",
																	objectFit: "cover",
																}}
																onError={(e) => {
																	e.target.onerror = null;
																	e.target.src =
																		"https://via.placeholder.com/400x225?text=No+Image";
																}}
															/>
														) : (
															<video
																controls
																src={item.url}
																style={{
																	position: "absolute",
																	top: 0,
																	left: 0,
																	width: "100%",
																	height: "100%",
																	objectFit: "cover",
																}}
															/>
														)}
													</div>
												</div>
											))}
										</Carousel>
									</div>
								) : null}

								{/* Reactions Summary */}
								<div
									style={{
										padding: "10px 16px",
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										borderBottom: "1px solid #ececec",
									}}
									dir={En ? "ltr" : "rtl"}
								>
									<div
										style={{ display: "flex", alignItems: "center", gap: 6 }}
									>
										<div
											style={{
												background: "#1976d2",
												color: "white",
												borderRadius: "50%",
												width: 20,
												height: 20,
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												fontSize: 12,
											}}
										>
											<FontAwesomeIcon icon={faThumbsUp} />
										</div>
										<div>
											<Text type="secondary" style={{ fontSize: "14px" }}>
												{post.likesCount}
											</Text>
											<Text type="secondary" style={{ fontSize: "14px" }}>
												{En ? " likes" : " اعجاب"}
											</Text>
										</div>
									</div>
									<div style={{ display: "flex", gap: 10 }}>
										<div>
											<Text type="secondary" style={{ fontSize: "14px" }}>
												{post.commentCount}
											</Text>
											<Text type="secondary" style={{ fontSize: "14px" }}>
												{En ? " comments" : " تعليق"}
											</Text>
										</div>
										<div>
											<Text type="secondary" style={{ fontSize: "14px" }}>
												{post.shareCount}
											</Text>
											<Text type="secondary" style={{ fontSize: "14px" }}>
												{En ? " shares" : " مشاركة"}
											</Text>
										</div>
									</div>
								</div>
							</Card>
						</Col>
					))}
				</Row>
			</div>
			
		</div>
	);
};

export default SocialMedia;
