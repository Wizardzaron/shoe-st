"use client"

import React, { createContext, useState, useEffect } from 'react';

const AppContext = createContext();


//change this specifically for context and is not a component

const AppProvider = ({ children }) => {
    // const [loginToken, setLoginToken] = useState({});

    // useEffect(() => {
    //     fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + "/getlogin", {
    //         method: "GET",
    //         credentials: "include",
    //     })
    //         .then((response) => response.json())
    //         .then((loginValue) => {
    //         setLoginToken(loginValue);
    //         })
    //         .catch((e) => {
    //         console.log({ e });
    //         });
    // }, []); 

    return (
        <AppContext.Provider value={{ loginToken, setLoginToken }}>
            {children}
        </AppContext.Provider>
        );
};
export { AppContext, AppProvider};