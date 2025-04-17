import React, { useContext } from 'react'
import {UserContext} from "../../context/usercontext";
import {  Outlet } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import Signin from '../Form/Form';
import { BeatLoader } from "react-spinners";
export default function RequireAuth({children}) {
    const {userToken,isTokenChecked}=useContext(UserContext);
    if(!isTokenChecked)
        {
            return<>
            <div className='vh-100 d-flex justify-content-center align-items-center'>
            <BeatLoader color="#36d7b7" size={60}  />
          </div>
            </> ;
        } 
    if (!userToken) {
        return <Signin />;
      }
    return <SideBar><Outlet /></SideBar>;
    
  
}
