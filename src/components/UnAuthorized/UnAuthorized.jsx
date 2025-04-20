import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function UnAuthorized() {
    const navigate = useNavigate();
    const backToHome = () => {
        navigate('/');
    };
    return(
		<div className="vh-100 d-flex flex-column justify-content-center align-items-center text-center bg-light px-3">
  <h1 className="display-3 fw-bold mb-3" style={{ color: "#03333d" }}>401</h1>
  <h2 className="mb-2">غير مصرح لك بالدخول</h2>
  <p className="text-muted mb-4">
    عذرًا، ليس لديك صلاحية للوصول إلى هذه الصفحة.
  </p>
  {/*<a href="/" className="btn btn-danger px-4 py-2 rounded-pill shadow">
    الرجوع إلى الصفحة الرئيسية
  </a>*/}
  <button className="btn px-4 py-2 rounded-pill shadow" onClick={backToHome} style={{ backgroundColor: "#03333d", color: "white" }}>الرجوع للصفحة الرئيسية</button>
</div>

	);
}
