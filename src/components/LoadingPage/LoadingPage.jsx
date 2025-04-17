import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BeatLoader } from 'react-spinners';

export default function Loading() {
  const [dots, setDots] = useState([
    { id: 1, color: "#36d7b7", delay: 0 },
    { id: 2, color: "#ff6b6b", delay: 0.2 },
    { id: 3, color: "#feca57", delay: 0.4 }
  ]);

  // Create color cycling effect
  useEffect(() => {
    const colors = ["#36d7b7", "#ff6b6b", "#feca57", "#48dbfb", "#9c88ff"];
    
    const interval = setInterval(() => {
      setDots(prevDots => {
        return prevDots.map((dot, index) => {
          const nextColorIndex = (colors.indexOf(dot.color) + 1) % colors.length;
          return { ...dot, color: colors[nextColorIndex] };
        });
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center"> <BeatLoader color="
#0e3c62" size={60} /> </div>
  );
}