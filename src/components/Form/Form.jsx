import React, { useContext, useState, useEffect } from "react";
import { Form, Input, Button, Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./Form.module.css";
import { UserContext } from "../../context/usercontext";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import axios from "axios";

export default function AntdLoginForm() {
	const [loading, setLoading] = useState(false);
	const [apiError, setApiError] = useState("");
	const { isEnglish: En } = useLanguage();
	const [successMsgShown, setSuccessMsgShown] = useState(false);
	const { setUserToken } = useContext(UserContext);
	const { isDark } = useTheme();
	const [messageApi, contextHolder] = message.useMessage();

	useEffect(() => {
		if (successMsgShown) {
			messageApi.success(En ? "Login successful" : "تم تسجيل الدخول بنجاح");
		}
	}, [successMsgShown, En, messageApi]);

	const handleFinish = async (values) => {
		setLoading(true);
		setApiError("");
		try {
			const { data } = await axios.post(
				"https://cms-reporting.runasp.net/api/Auth/login",
				values
			);
			if (data.isSuccess === true) {
				setSuccessMsgShown(true);
				setTimeout(() => {
					localStorage.setItem("userToken", data.value.token);
					setUserToken(data.value.token);
				}, 1000);
			} else {
				setApiError(
					data.message ||
						(En
							? "Login failed. Please try again."
							: "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.")
				);
			}
		} catch (error) {
			if (error.response) {
				setApiError(
					error.response.data?.detail ||
						(En
							? "Invalid Email Or Password"
							: "البريد الإلكتروني أو كلمة المرور غير صحيحة")
				);
			} else if (error.request) {
				setApiError(
					En
						? "Network error. Please check your internet connection."
						: "خطأ في الشبكة. يرجى التحقق من اتصال الانترنت"
				);
			}
		}
		setLoading(false);
	};

	return (
		<>
			{contextHolder}
			<div
				className={`min-vh-100 d-flex flex-column justify-content-center align-items-center ${
					isDark ? styles["dark-bg"] : "bg-light"
				}`}
				dir={En ? "ltr" : "rtl"}
			>
				<h5
					className={`${styles["head-Form"]} fw-bold mb-0 pb-4 ${
						En ? "" : "fs-4"
					} ${isDark ? "text-white" : "text-dark"}`}
				>
					{En ? "Welcome Back, Administrator" : "مرحبا بعودتك"}
				</h5>

				<div
  className={`${styles["div-Form"]} ${isDark ? "bg-dark" : "bg-white"} p-4 rounded-3`}
  style={
    isDark
      ? {
          boxShadow: "0 8px 40px 0 rgba(255,255,255,0.04)", border: "1px solid #202949",
        }
      : {
          boxShadow: "0 6px 32px 0 rgba(0,0,0,0.09), 0 1.5px 6px 0 rgba(0,0,0,0.03)",
        }
  }
>
					<h4 className={`fw-bold mb-2 ${isDark ? "text-white" : "text-dark"}`}>
						{En ? "Sign In" : "تسجيل الدخول"}
					</h4>
					<p
						className={`mb-4 ${isDark ? "text-white" : "text-muted"}`}
						style={{ fontSize: "14px" }}
					>
						{En
							? "Enter your email and password below"
							: "أدخل بريدك الإلكتروني وكلمة المرور أدناه"}
						<br />
						{En ? "to log into your account" : "لتسجيل الدخول في حسابك"}
					</p>

					<Form
						name="login"
						layout="vertical"
						onFinish={handleFinish}
						autoComplete="off"
						className="mt-2"
						style={{ minWidth: 285 }}
					>
						<Form.Item
							label={
								<span
									className={isDark ? "text-white" : "text-dark"}
								>
									{En ? "Email" : "البريد الإلكتروني"}
								</span>
							}
							name="email"
							rules={[
								{
									required: true,
									message: En
										? "Please enter your email"
										: "يرجى ادخال البريد الالكتروني",
								},
								{
									type: "email",
									message: En ? "Invalid Email" : "البريد الالكتروني غير صحيح",
								},
							]}
							labelCol={{
								style: {
									fontSize: "13px",
									fontWeight: 600,
									color: isDark ? "white" : "black",
								},
							}}
						>
							<Input
								type="email"
								size="large"
								style={{
									fontSize: "14px",
									padding: "8px 12px",
									background: isDark ? "#23272f" : "",
									color: isDark ? "#fff" : "#222",
								}}
								className={isDark ? "bg-dark text-white" : "bg-light text-dark"}
								placeholder={En ? "name@example.com" : "name@example.com"}
							/>
						</Form.Item>

						<Form.Item
							label={
								<span
									className={isDark ? "text-white" : "text-dark"}
								>
									{En ? "Password" : "كلمة المرور"}
								</span>
							}
							name="password"
							rules={[
								{
									required: true,
									message: En
										? "Please enter your password"
										: "يرجى ادخال كلمة المرور",
								},
							]}
							labelCol={{
								style: {
									fontSize: "13px",
									fontWeight: 600,
									color: isDark ? "white" : "black",
								},
							}}
						>
							<Input.Password
								size="large"
								placeholder={En ? "Password" : "كلمة المرور"}
								style={{
									fontSize: "14px",
									padding: "8px 12px",
									background: isDark ? "#23272f" : "",
									color: isDark ? "#fff" : "#222",
								}}
								className={isDark ? "bg-dark text-white" : "bg-light text-dark"}
							/>
						</Form.Item>

						<Form.Item shouldUpdate>
							{() => (
								<Button
									type="primary"
									htmlType="submit"
									block
									style={{
										backgroundColor: "#0f1426",
										padding: "10px",
										fontSize: "14px",
										fontWeight: "600",
										border: 0,
									}}
									disabled={loading}
									className={`${styles["Button-Form"]} w-100 mb-3`}
								>
									{loading ? (
										<Spin
											indicator={<LoadingOutlined spin />}
											className="text-white"
										/>
									) : En ? (
										"Login"
									) : (
										"تسجيل الدخول"
									)}
								</Button>
							)}
						</Form.Item>

						{apiError && (
							<div className="d-flex align-items-center gap-2 mt-3 p-3 rounded-2 bg-danger bg-opacity-25 border border-danger animate__animated animate__fadeIn">
								<i
									className="bi bi-exclamation-circle-fill"
									style={{ color: "red" }}
								></i>
								<span
									style={{ fontSize: "13px", fontWeight: "500", color: "red" }}
								>
									{apiError}
								</span>
							</div>
						)}
					</Form>
				</div>
			</div>
		</>
	);
}
