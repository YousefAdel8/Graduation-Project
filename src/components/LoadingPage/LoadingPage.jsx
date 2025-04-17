import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BeatLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center"> <BeatLoader color="
#0e3c62" size={60} /> </div>
  );
}