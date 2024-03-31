'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
function Logout(){

    const [logout, setLogout] = useState(null);

    const router = useRouter()

    useEffect(() => {

        fetch('https://shoe-st-api-58c2623d13b8.herokuapp.com/getlogin',{
            method: 'GET',
            credentials: 'include',
        })

            .then((response) => response.json())
            .then((logout) => {
                setLogout(logout);
                console.log("Hi")
                console.log(logout["Signout"])
                router.push('../home')
            })
            .catch(e => {
                console.log("Before error")
                console.log({ e })
                console.log("After error")
            })


    },[])

};
export default Logout;