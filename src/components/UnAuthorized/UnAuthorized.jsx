import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

export default function UnAuthorized() {
	const { isEnglish: En } = useLanguage();
	const navigate = useNavigate();
	const backToHome = () => {
		navigate("/");
	};
	return (
		<div className="vh-100 d-flex flex-column justify-content-center align-items-center text-center bg-light px-3">
			<h1 className="display-3 fw-bold mb-3" style={{ color: "#03333d" }}>
				401
			</h1>
			<h2 className="mb-2"> {En ? "Unauthorized" : "غير مصرح"}</h2>
			<p className="text-muted mb-4">
				{En
					? "Unauthorized access. You don't have permission to access this page."
					: "غير مصرح لك بالدخول. ليس لديك صلاحية للوصول إلى هذه الصفحة."}
			</p>
			<button
				className="btn px-4 py-2 rounded-pill shadow"
				onClick={backToHome}
				style={{ backgroundColor: "#03333d", color: "white" }}
			>
				{En ? "Back to Home" : "العودة للصفحة الرئيسية"}{" "}
			</button>
		</div>
	);
}
