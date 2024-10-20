"use client"
import styles from "../page.module.css";
import Link from 'next/link';
import React, { useState, useImperativeHandle } from "react";
import { toast } from "react-hot-toast";


const SignUp = ({}, ref) => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [streetaddress, setStreetaddress] = useState('');
    const [username, setUsername] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [showTextBox, setShowTextBox] = useState(false);
    
    const hideTextBox = () => {
      setShowTextBox(prevState => !prevState);
    }


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


    const getUserInfo = () => {
      return [firstname, lastname, email, password, streetaddress, username, zipcode];
    }

    // A function that takes no arguments and returns the ref handle you want to expose
    useImperativeHandle(ref, () => ({
        getUserInfo: getUserInfo,
      }));

    return(
      <>
        <div id="firstName" className="mb-3">
          <label htmlFor="firstname" className={styles.attributetext}>First Name</label>
          <input
            type="text"
            placeholder="Please Enter your First Name"
            name="firstname"
            onChange={(e) => setFirstname(e.target.value)}
            className={styles.textbox}
          />
        </div>
        <div id="lastName" className="mb-3">
          <label htmlFor="lastname" className={styles.attributetext}>Last Name</label>
          <input
            type="text"
            placeholder="Please Enter your Last Name"
            name="lastname"
            onChange={(e) => setLastname(e.target.value)}
            className={styles.textbox}
          />
        </div>
        <div id="username" className="mb-3">
          <label htmlFor="username" className={styles.attributetext}>Username</label>
          <input type="text"
            placeholder="Please Enter your Username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            className={styles.textbox}
          />
        </div>
        <div id="pass" className="mb-3">
          <label htmlFor="passwd" className={styles.attributetext}>Password</label>
          <input
            type="password"
            placeholder="Please Enter your password"
            name="passwd"
            onChange={(e) => setPassword(e.target.value)}
            className={styles.textbox}
          />
        </div>
        <div id="emailaddr" className="mb-3">
          <label htmlFor="email" className={styles.attributetext}>Email</label>
          <input
            type="email"
            placeholder="Please Enter your Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className={styles.textbox}
          />
        </div>
        <div id="streetaddr" className="mb-3">
          <label htmlFor="streetaddress" className={styles.attributetext}>Street Address</label>
          <input
            type="text"
            placeholder="Please Enter your street address"
            name="streetaddress"
            onChange={(e) => setStreetaddress(e.target.value)}
            className={styles.textbox}
          />
        </div>
        <div id="zip" className="mb-3">
          <label htmlFor="zipcode" className={styles.attributetext}>Zip Code</label>
          <input
            type="text"
            placeholder="Please Enter your zip code"
            name="zipcode"
            value={zipcode}
            onChange={handleZip}
            className={styles.textbox}
          />
        </div>

        <button type="button" onClick={hideTextBox}>
            Would you like to input city and state?
        </button>

       {showTextBox ?
            (
              <>
                <div id="city" className="mb-3">
                  <label htmlFor="city" className={styles.attributetext}>City</label>
                  <input
                    type="text"
                    placeholder="Please Enter your city"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={styles.textbox}
                  />
                </div>

                <div id="state" className="mb-3">
                  <label htmlFor="state" className={styles.attributetext}>State</label>
                  <input
                    type="text"
                    placeholder="Please Enter your state"
                    name="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className={styles.textbox}
                  />
                </div>
              </>
            ): ("")
        }
        
        <div id="form-action">
          <div className={styles.flexbutton}>
            <button type='submit' className={styles.buttoncontainer}>Submit</button>
          </div>
        </div>
        <ul>
          {/* <li>
            <Link href="/user" className={styles.custombutton2}>Look At User Data</Link>
          </li> */}
          <div className={styles.flexbutton}>
              <Link href="/home" className={styles.buttoncontainer}>Go Back</Link>
          </div>
        </ul>
      </>
    )
};
export default React.forwardRef(SignUp);