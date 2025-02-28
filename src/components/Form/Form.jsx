import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { CircleLoader } from "react-spinners";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";

export default function Form() {
	const [loading, setLoading] = useState(false);
	const [apiError, setApiError] = useState(false);
	const [En] = useState(true);
	const navigate = useNavigate();

	const SignInSubmit = async (values) => {
		try {
			setLoading(true);
			setApiError(false);
			let { data } = await axios.post(
				"https://cms-reporting.runasp.net/api/Auth/login",
				values
			);
			console.log(data);
			if (data.isSuccess === true) {
				localStorage.setItem("token", data.token);
				setLoading(false);
				navigate("/dashboard");
			} else {
				setLoading(false);
				setApiError(data.message || "Login failed. Please try again.");
			}
		} catch (error) {
			if (error.response) {
				switch (error.response.status) {
					case 400:
						setApiError("Invalid Email or Password");
						console.log(error.message);
						break;
					case 401:
						setApiError("Unauthorized access");
						console.log(error.message);
						break;
					case 404:
						setApiError("Service not found");
						console.log(error.message);
						break;
					default:
						setApiError("An error occurred. Please try again later");
						console.log(error.message);
						break;
				}
			} else if (error.request) {
				console.log(error.request);
				setApiError("Network error. Please check your internet connection.");
			} else {
				console.log("An unxpected error occurred:", error.message);
			}
			console.log("Login error:", error.response.status);
		} finally {
			setLoading(false);
		}
	};

	let validationSchema = yup.object({
		email: yup
			.string()
			.required("Please enter your email")
			.email("Invalid Email"),
		password: yup.string().required("Please enter your password"),
	});

	let formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema,
		onSubmit: SignInSubmit,
	});

	return (
		<>
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
									placeholder="••••••••"
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
								<CircleLoader color="white" size={15} />
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
						{apiError && (
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
