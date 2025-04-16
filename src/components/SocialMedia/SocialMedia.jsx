import React from "react";
import { Card, Row, Col, Typography, Avatar } from "antd";

const { Title, Text } = Typography;
const SocialMedia = ({ En = false }) => {
	const posts = [
		{
			id: 1,
			name: "Ahmed Hassan",
			icon: "https://img.icons8.com/office/80/000000/user-male-circle.png",
			time: En?"2 hours ago":"قبل ساعتين",
			discription:
				"التكدس المروري في شارع الملك فيصل ",
			isPicture: true,
			PostPicture:
				"https://media.istockphoto.com/id/2185791629/photo/diverse-business-colleagues-shaking-hands-in-a-modern-office.jpg?s=1024x1024&w=is&k=20&c=JqmI06gpuxc2JaNsP0wTsuBqWNamXGv-0j-LcdQI60Q=",
		},
		{
			id: 2,
			name: "Fatima Ali",
			icon: "https://img.icons8.com/office/80/000000/user-female-circle.png",
			time: En?"1 day ago":"قبل 1 يوم",
			discription:
				"مشكلة تراكم القمامة في حي السلام مستمرة. نطالب بتحسين خدمات النظافة والبلدية. #نظافة_المدينة",
			isPicture: true,
			PostPicture:
				"https://plus.unsplash.com/premium_photo-1677094310919-d0361465d3be?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			id: 3,
			name: "Mohamed Khalid",
			icon: "https://img.icons8.com/office/80/000000/user-male-circle.png",
			time: En?"6 hours ago":"قبل 6 ساعات",
			discription:
				"إنارة الشوارع متقطعة في منطقة المعادي. خطر على سلامة المواطنين وقت الليل. #إنارة_الشوارع",
			isPicture: true,
			PostPicture:
				"https://images.unsplash.com/photo-1582496927349-3c368dc73c28?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			id: 4,
			name: "Laila Ibrahim",
			icon: "https://img.icons8.com/office/80/000000/user-female-circle.png",
			time: En?"3 days ago":"قبل 3 ايام",
			discription:
				"المواصلات العامة في حالة مزرية. الحافلات متهالكة وغير منتظمة. نحتاج لمواصلات عامة آمنة وموثوقة. #المواصلات_العامة",
			isPicture: false,
		},
		{
			id: 5,
			name: "Omar Samy",
			icon: "https://img.icons8.com/office/80/000000/user-male-circle.png",
			time: En?"12 hours ago":"قبل 12 ساعات",
			discription:
				"تسريب المياه في شبكة الصرف الصحي بحي الزمالك يهدد بكارثة بيئية. سريعًا يا مسؤولين! #الصرف_الصحي",
			isPicture: true,
			PostPicture:
				"https://media.istockphoto.com/id/2185337504/photo/automation-of-business-or-robotic-process-rpa-technology-transfer-of-data-between-application.webp?s=1024x1024&w=is&k=20&c=gYHTFBbvYBT2Q8dTK5IKLMfvu6NZCg4ME447wffNhKA=",
		},
		{
			id: 6,
			name: "Nada Mahmoud",
			icon: "https://img.icons8.com/office/80/000000/user-female-circle.png",
			time: En?"1 day ago":"قبل 1 يوم",
			discription:
				"عدم وجود أماكن آمنة للمشاة وركوب الدراجات. المدينة غير صديقة للمشاة. #المشاة_والدراجات",
			isPicture: false,
		},
		{
			id: 7,
			name: "Kareem Osama",
			icon: "https://img.icons8.com/office/80/000000/user-male-circle.png",
			time: En?"2 days ago":"قبل 2 ايام",
			discription:
				`الزحام المروري أصبح مشكلة يومية تؤرق الجميع، سواء كنت سائقًا، راكبًا في المواصلات العامة، أو حتى مشاة تحاول عبور الطريق بأمان. الطرق أصبحت أشبه بساحات انتظار ضخمة، والسيارات تتحرك بسرعة السلحفاة، بينما تتزايد معاناة المواطنين يومًا بعد يوم.

🌍 أسباب الأزمة:
🔹 تزايد أعداد السيارات: كل عام، تنضم آلاف السيارات الجديدة إلى الشوارع دون وجود خطة واضحة لاستيعابها.
🔹 البنية التحتية غير المؤهلة: معظم الطرق لم يتم تطويرها منذ عقود، ولا تزال تعاني من الحفر والمطبات العشوائية.
🔹 سوء التخطيط المروري: الكثير من الإشارات المرورية والتقاطعات غير مدروسة، مما يؤدي إلى تعطيل حركة السير بدلًا من تنظيمها.
🔹 عدم وجود وسائل مواصلات عامة كافية: قلة عدد الحافلات ومترو الأنفاق يجعل الناس مضطرين لاستخدام سياراتهم الخاصة، مما يزيد الزحام.
🔹 سلوكيات السائقين: الوقوف العشوائي، القيادة بدون التزام بالقواعد، وعدم احترام خطوط المشاة، كلها عوامل تؤدي إلى تفاقم الأزمة.

💡 الحلول الممكنة:
✅ تطوير وتوسيع الطرق: يجب على الحكومة الاستثمار في تطوير البنية التحتية لتستوعب الزيادة في أعداد المركبات.
✅ تحسين وسائل النقل العام: توفير أتوبيسات حديثة ومترو أنفاق فعال يمك`,
			isPicture: true,
			PostPicture:
				"https://media.istockphoto.com/id/1934523700/photo/close-up-on-man-hand-using-mobile-phone.jpg?s=1024x1024&w=is&k=20&c=8rb1PLOQMgOY52356fBOBjWfVknpGT-uxfeJk_h3ols=",
		},
		{
			id: 8,
			name: "Sarah Ahmed",
			icon: "https://img.icons8.com/office/80/000000/user-female-circle.png",
			time: En?"6 hours ago":"قبل 6 ساعات",
			discription:
				"النفايات الإلكترونية مشكلة متزايدة. نحتاج لنظام إعادة تدوير فعال. #إعادة_التدوير",
			isPicture: false,
		},
		{
			id: 9,
			name: "Mohamed Hassan",
			icon: "https://img.icons8.com/office/80/000000/user-male-circle.png",
			time: En?"1 week ago":"قبل 1 اسبوع",
			discription:
				"ازدحام المستشفيات العامة وعدم كفاية الخدمات الصحية. نحتاج لتحسين البنية التحتية الصحية. #الخدمات_الصحية",
			isPicture: false,
		},
		{
			id: 10,
			name: "Amira Farouk",
			icon: "https://img.icons8.com/office/80/000000/user-female-circle.png",
			time: En?"3 days ago":"قبل 3 ايام",
			discription:
				"مشكلة التسرب الكهربائي في الأحياء السكنية. خطر حقيقي يهدد سلامة المواطنين. #السلامة_الكهربائية",
			isPicture: true,
			PostPicture:
				"https://media.istockphoto.com/id/2154887234/photo/futuristic-digital-network-background-people-and-cloud-computing-with-connections-technology.jpg?s=1024x1024&w=is&k=20&c=9j5pWs0osSDjrjXrCWvMRbzpZrBAykK5IOj1F9dnNQs=",
		},
	];

	return (
		<>
			<Title level={3} style={{ marginBottom: 24 }} className="fw-bold">
				{En ? "Social Media" : "منصة المجتمع"}
			</Title>
			<Row gutter={[16, 16]}>
				{posts.map((post, index) => (
					<Col xs={24} sm={24} md={12} lg={12} key={index} className="mb-3">
						<Card
							className="shadow-sm"
							Style={{
								padding: "20px",
								display: "flex",
								flexDirection: "column",
								height: "100%",
							}}
						>
							<div className="d-flex align-items-center mb-3">
								<Avatar src={post.icon} size={44} className="me-3 shadow-sm" />
								<div className="me-2">
									<Text strong>{post.name}</Text>
									<div>
										<Text type="secondary" style={{ fontSize: "12px" }}>
											{post.time}
										</Text>
									</div>
								</div>
							</div>

							<div
								style={{
									flex: 1,
									display: "flex",
									flexDirection: "column",
									overflow: "hidden",
								}}
							>
								<Text className="mb-3">{post.discription}</Text>

								<div
									style={{
										flex: 1,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										backgroundColor: !post.isPicture
											? "#f5f5f5"
											: "transparent",
										borderRadius: "8px",
										overflow: "hidden",
									}}
								>
									{post.isPicture ? (
										<img
											src={post.PostPicture}
											alt="post"
											style={{
												width: "100%",
												height: "400px",
												objectFit: "contain",
												borderRadius: "8px",
											}}
										/>
									) : (
										<div
											className="text-center"
											style={{
												width: "100%",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
                                                height: "378px",
											}}
										>
											<Text type="secondary" className="text-center">
												{En ? "Text-only post" : "منشور نصي فقط"}
											</Text>
										</div>
									)}
								</div>
							</div>
						</Card>
					</Col>
				))}
			</Row>
		</>
	);
}
export default SocialMedia;