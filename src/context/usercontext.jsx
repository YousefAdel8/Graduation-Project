import React from 'react'
import { useState,createContext,useEffect } from "react";
export const UserContext = createContext();
export const  UserContextProvider = ({children }) => {
    const [userToken,setUserToken]=useState(null);
    const [isTokenChecked, setIsTokenChecked] = useState(false); //Flash of unauthenticated content (solved problem)

    useEffect(()=>{
        const token = localStorage.getItem("userToken");
        if(token){
            setUserToken(token);
        }
        setIsTokenChecked(true);
    },[]);
  return (
    <UserContext.Provider value={{userToken,setUserToken,isTokenChecked}}>{children}</UserContext.Provider>
  );
};
