import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BeatLoader } from 'react-spinners';
import { useTheme } from "../../context/ThemeContext"; 
export default function Loading() {
  const { isDark } = useTheme(); 
  return (
    <div className={`vh-100 d-flex justify-content-center align-items-center ${isDark ? "bg-dark" : "bg-light"}`}> <BeatLoader color="
#0e3c62" size={60} /> </div>
  );
}