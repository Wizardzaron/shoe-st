"use client"
import styles from "../page.module.css";
import React, { useState, useImperativeHandle } from "react";

const LoginPassword = ({}, ref) => {

    const [showPassword, setShowPassword] = useState(true);
    const [sendPassword, setSendPassword] = useState(null);

    const getPassword = () => {
      return sendPassword;
    }

    // A function that takes no arguments and returns the ref handle you want to expose
    useImperativeHandle(ref, () => ({
        getPassword: getPassword,
      }));


    return (
        <div id="passwd" className="mb-3">
            <label htmlFor="password" class={styles.attributetext}>
            Password
            </label>
            <input
            type={showPassword ? "text" : "password"}
            placeholder="Password..."
            name="passwd"
            class={styles.textbox}
            value={sendPassword}
            onChange={(e) => setSendPassword(e.target.value)}
            />
            {/*if showPassword is true we us eyeOpen.png else we use eyeClosed.png*/}
            <img
            src={showPassword ? "/eyeOpen.png" : "/eyeClosed.png"}
            class={styles.eyeimage}
            onClick={() => setShowPassword(!showPassword)}
            />
        </div>
    );
}
export default React.forwardRef(LoginPassword);