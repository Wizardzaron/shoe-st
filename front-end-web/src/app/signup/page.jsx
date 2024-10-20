//used in next.js to show that this is a client component
'use client'

import React, { useState, useRef} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import styles from "../page.module.css";
import SignUp from '../components/SignUp'


//find a way to make city, and state optinal and togglable like hiding password

function Signingup() {

  const UserRef = useRef(null);
  // const SignUp = useRef(null);
  // const UserRef = SignUp;

  const router = useRouter()

  const submitInfo = (event) => {
    event.preventDefault();

    const x = UserRef.current.getUserInfo();
    console.log(x)

    const formData = new FormData();

    formData.append("firstname", x[0]);
    formData.append("lastname", x[1]);
    formData.append("email", x[2]);
    formData.append("passwd", x[3]);
    formData.append("streetaddress", x[4]);
    formData.append("username", x[5]);
    formData.append("zipcode", x[6]);
    formData.append("city", x[7]);
    formData.append("state", x[8]);
    formData.append("url", window.location.origin)

    const obj = Object.fromEntries(formData.entries());
    console.log(obj);


    try {
      fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + "/signup", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      })

        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // Assuming the response is JSON
        })

        .then((data) => {
          console.log("Data: " + data);
        })
        .catch(e => {
          console.log("Before error")
          console.log({ e })
          console.log("After error")
        });
    } catch (error) {
      console.error("Error occured at posting data: ", error);
    }
    router.push('/home');
  };

  return (
    <div className={styles.signup}>
      <h1 className={styles.aligntext}>Sign Up</h1>
        <form onSubmit={submitInfo}>
          <SignUp ref={UserRef}/>
        </form>
    </div>
  );
};
export default Signingup;