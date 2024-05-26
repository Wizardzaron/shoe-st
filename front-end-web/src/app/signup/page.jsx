//used in next.js to show that this is a client component
'use client'

import React, { useState } from 'react';
import { toast } from "react-hot-toast";
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../page.module.css'

// const nextPage = () => {
//   const router = useRouter();

//   console.log('Onto next page');

//   router.push('/home/page.js');
// }

function Signup() {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [streetaddress, setStreetaddress] = useState('');
  const [username, setUsername] = useState('');
  const [zipcode, setZipcode] = useState('');

  const router = useRouter()

  const handleZip = (event) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    const decimalCount = numericValue.split('.').length - 1;
    if (decimalCount !== 1) {
      setZipcode(numericValue);
    } else {
      // Alert the user about invalid input
      toast.error('Invalid Input', 'Please enter a valid numeric value.');
    }
  };

  const submitInfo = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const obj = Object.fromEntries(formData.entries());
    console.log(obj);

    try {
      fetch('http://127.0.0.1:5000/signup', {
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
    <div class={styles.signup}>
      <h1 class={styles.aligntext}>Sign Up</h1>
      <form onSubmit={submitInfo}>
        <div id="firstName" className="mb-3">
          <label htmlFor="firstname" class={styles.attributetext}>First Name</label>
          <input
            type="text"
            placeholder="Please Enter your First Name"
            name="firstname"
            class={styles.textbox}
          />
        </div>
        <div id="lastName" className="mb-3">
          <label htmlFor="lastname" class={styles.attributetext}>Last Name</label>
          <input
            type="text"
            placeholder="Please Enter your Last Name"
            name="lastname"
            class={styles.textbox}
          />
        </div>
        <div id="username" className="mb-3">
          <label htmlFor="username" class={styles.attributetext}>Username</label>
          <input type="text"
            placeholder="Please Enter your Username"
            name="username"
            class={styles.textbox}
          />
        </div>
        <div id="pass" className="mb-3">
          <label htmlFor="passwd" class={styles.attributetext}>Password</label>
          <input
            type="password"
            placeholder="Please Enter your password"
            name="passwd"
            class={styles.textbox}
          />
        </div>
        <div id="emailaddr" className="mb-3">
          <label htmlFor="email" class={styles.attributetext}>Email</label>
          <input
            type="email"
            placeholder="Please Enter your Email"
            name="email"
            class={styles.textbox}
          />
        </div>
        <div id="streetaddr" className="mb-3">
          <label htmlFor="streetaddress" class={styles.attributetext}>Street Address</label>
          <input
            type="text"
            placeholder="Please Enter your street address"
            name="streetaddress"
            class={styles.textbox}
          />
        </div>
        <div id="zip" className="mb-3">
          <label htmlFor="zipcode" class={styles.attributetext}>Zip Code</label>
          <input
            type="text"
            placeholder="Please Enter your zip code"
            name="zipcode"
            value={zipcode}
            onChange={handleZip}
            class={styles.textbox}
          />
        </div>
        <div id="form-action">
          <button type='submit' class={styles.button}>Submit</button>
        </div>
        <ul>
          <li>
            <Link href="/user" class={styles.custombutton2}>Look At User Data</Link>
          </li>
          <li>
            <Link href="/home" class={styles.custombutton3}>Go Back</Link>
          </li>
        </ul>
      </form>
    </div>

  );
};
export default Signup;