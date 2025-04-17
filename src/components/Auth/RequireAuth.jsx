import React, { useContext } from 'react'
import {UserContext} from "../../context/usercontext";
import {  Outlet } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import Signin from '../Form/Form';
export default function RequireAuth({children}) {
    const {userToken}=useContext(UserContext);
    if (!userToken) {
        return <Signin />;
      }
    return <SideBar><Outlet /></SideBar>;
    
  
}
