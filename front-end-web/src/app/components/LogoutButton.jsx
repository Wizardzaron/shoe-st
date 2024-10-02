"use client"
import styles from "../page.module.css";
import Link from "next/link";
import React, { useEffect } from 'react';

export default function LogoutButton() {

  function LogOut(){



    fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/logout',{
        method: 'GET',
        credentials: 'include',
    })

        .then((response) => response.json())
        .then(() => {
            console.log("Hi")
            location.reload()
        })
        .catch(e => {
            console.log("Before error")
            console.log({ e })
            console.log("After error")
        })

            
  }

    // need to use useEffect when calling the fetch on log out
    // bring LogOut.jsx into here 
    return(
      <button onClick={LogOut} className={styles.spaceBetweenLink}>
        {" "}
        Logout
      </button>
    );
}