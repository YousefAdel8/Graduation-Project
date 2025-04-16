import React from "react";
import { useState,useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { message,Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

export default function Form() {
	const [loading, setLoading] = useState(false);
	const [apiError, setApiError] = useState(false);
	const [En] = useState(false);
	const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
	const [successLogin, setSuccessLogin] = useState(false);
	/*const errorTranslations = {
		"Can't Find This User": "لم يتم العثور على المستخدم",
		"Invalid Email Or Password": "البريد الإلكتروني أو كلمة المرور غير صحيحة",

	}
	const translateError = (error) => {
		return errorTranslations[error] || error;
	}*/
	const SignInSubmit = async (values) => {
		try {
			setLoading(true);
			setApiError(false);
			let { data } = await axios.post(
				"https://cms-reporting.runasp.net/api/Auth/login",
				values
			);
			//console.log(data);
			if (data.isSuccess === true) {
				localStorage.setItem("token", data.token);
				setLoading(false);
				setSuccessLogin(true);
				setTimeout(() => {
					navigate("/dashboard");
				}, 1000);
				
			} else {
				setLoading(false);
				setApiError(data.message || "Login failed. Please try again.");
			}
		} catch (error) {
			//console.log(error.response.data);
			if (error.response) {
				//setApiError(En?error.response.data?.detail:translateError(error.response.data?.detail)); //"?" is optional chaining operator (Runtime error protection)
				setApiError(error.response.data?.detail);
				/*switch (error.response.status) {
					
					case 400:
						setApiError(En?"Invalid Email or Password":"البريد الالكتروني او كلمة المرور غير صحيحة");
						break;
					case 401:
						setApiError(error);
						break;
					case 404:
						setApiError(En?"Service not found":"الخدمة غير موجودة");
						break;
					case 500:
						setApiError(En?"Internal server error":"خطأ في الخادم");
						break;
					default:
						setApiError(error.response.data.message);
						console.log(error.response);
						break;
				}*/
			} else if (error.request) {
				setApiError(En?"Network error. Please check your internet connection.":"خطأ في الشبكة. يرجى التحقق من اتصال الانترنت");
			}
		} finally {
			setLoading(false);
		}
	};

	let validationSchema = yup.object({
		email: yup
			.string()
			.required(En?"Please enter your email":"يرجى ادخال البريد الالكتروني")
			.email(En?"Invalid Email":"البريد الالكتروني غير صحيح"),
		password: yup.string().required(En?"Please enter your password":"يرجى ادخال كلمة المرور"),
	});

	let formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema,
		onSubmit: SignInSubmit,
	});

	const Success = () => {
		messageApi.open({
			type: "success",
			content: En?"Login successful":"تم تسجيل الدخول بنجاح",
		});
	}
	
	useEffect(() => {
		if (successLogin) {
			Success();
		}
	} , [successLogin]);
	return (
		<>
		 	{contextHolder}
			<div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light" 
			dir={En ? "ltr" : "rtl"}
			>
				
					<h5 className={`${styles["head-Form"]} fw-bold mb-0 pb-4 ${En ? "" : "fs-4"}`}>
					{En ? "Welcome Back, Administrator": "مرحبا بعودتك" }
					</h5>
				
				<div className={`${styles["div-Form"]} bg-white p-4 rounded-3 shadow`}>
						<h4 className="fw-bold mb-2">
							{En? "Sign In": "تسجيل الدخول"}
						</h4>
					
					
						<p className="text-muted mb-4" style={{ fontSize: "14px" }}>
							{En? "Enter your email and password below": "أدخل بريدك الإلكتروني وكلمة المرور التالية"}
							<br />
							{En? "to log into your account" : "لتسجيل الدخول في حسابك"}
						</p>
					

					<form onSubmit={formik.handleSubmit}>
						
							<div
								className={`mb-3`}
								
							>
								<label
									className={`mb-2 fw-semibold ${formik.touched.email && formik.errors.email ?"text-danger":""}`}
									style={{ fontSize: "13px" }}
								>
									{En ? "Email" : "البريد الإلكتروني"}
								</label>
								<input
									type="email"
									name="email"
									className="form-control"
									placeholder={En ? "name@example.com" : "name@example.com"}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									style={{ fontSize: "14px", padding: "8px 12px" }}
								/>
								{formik.touched.email && formik.errors.email ? (
									<small
									className="d-inline-block text-danger mt-2 px-2 py-1 bg-danger bg-opacity-10 rounded-1"
									style={{ fontSize: "12px" }}
								>
									{formik.errors.email}
								</small>
								) : null}
								
							</div>
						

						
							<div className="mb-3">
								<div className="d-flex justify-content-between align-items-center mb-2">
									<label
										className={`fw-semibold ${formik.touched.password && formik.errors.password ?"text-danger":""}`}
										style={{ fontSize: "13px" }}
									>
										{En? "Password": "كلمة المرور"} 
									</label>
								</div>
								<input
									type="password"
									name="password"
									className="form-control"
									placeholder="Password"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									style={{ fontSize: "14px", padding: "8px 12px" }}
								/>
								{formik.touched.password && formik.errors.password  ?(
									<small
										className="d-inline-block text-danger mt-2 px-2 py-1 bg-danger bg-opacity-10 rounded-1"
										style={{ fontSize: "12px" }}
									>
										{formik.errors.password}
									</small>
								):null}
								
								
							</div>
						

						{loading ? (
							<button
								type="submit"
								className="btn w-100 text-white mb-3 form-control"
								style={{
									backgroundColor: "#0f1426",
									padding: "10px",
								}}
							>
								<Spin indicator={<LoadingOutlined spin />} className="text-white" />
							</button>
						) : (
							<button
								type="submit"
								className={`${styles["Button-Form"]} btn w-100 text-white mb-3 form-control`}
								style={{
									backgroundColor: "#0f1426",
									padding: "10px",
									fontSize: "14px",
									fontWeight: "600",
								}}
							>
								{En ? "Login" : "تسجيل الدخول"}
							</button>
						)}
						{apiError &&  (
							<div className="d-flex align-items-center gap-2 mt-3 p-3 rounded-2 bg-danger bg-opacity-10 border border-danger animate__animated animate__fadeIn">
								<i className="bi bi-exclamation-circle-fill text-danger"></i>
								<span
									className="text-danger"
									style={{ fontSize: "13px", fontWeight: "500" }}
								>
									{apiError} 
								</span>
							</div>
							
						)}
					</form>
				</div>
			</div>
		</>
	);
}
