import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function AddNewUser() {
  const { isEnglish: En } = useLanguage();
    const navigate = useNavigate();
    const handleAddNewUser=()=>{
        navigate("/users/new");
    }
  return (
    
    <button className='btn btn-primary' onClick={handleAddNewUser}>{En?"New User ":" مستخدم جديد"}<span className='fs-5'> + </span></button>
  )
}
