import React from 'react'
import { useState,createContext,useEffect } from "react";
export const UserContext = createContext();
export const  UserContextProvider = ({children }) => {
    const [userToken,setUserToken]=useState(null);
    useEffect(()=>{
        const token = localStorage.getItem("userToken");
        if(token){
            setUserToken(token);
        }
    },[]);
  return (
    <UserContext.Provider value={{userToken,setUserToken}}>{children}</UserContext.Provider>
  );
};
