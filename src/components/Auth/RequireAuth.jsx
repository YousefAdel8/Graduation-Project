import React, { useContext } from 'react'
import {UserContext} from "../../context/usercontext";
import {  Outlet } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import Signin from '../Form/Form';
import Loading from '../LoadingPage/LoadingPage';
export default function RequireAuth({children}) {
    const {userToken,isTokenChecked}=useContext(UserContext);
    if(!isTokenChecked)
        {
            return<>
            <Loading />
            </> ;
        } 
    if (!userToken) {
        return <Signin />;
      }
    return <SideBar><Outlet /></SideBar>;
    
  
}
