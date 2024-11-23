"use client"
import styles from "../page.module.css";
import React, { useState, useImperativeHandle } from "react";

const LoginPassword = ({}, ref) => {

    const [showPassword, setShowPassword] = useState(true);
    const [sendPassword, setSendPassword] = useState("");

    const getPassword = () => {
      return sendPassword;
    }

    // A function that takes no arguments and returns the ref handle you want to expose
    useImperativeHandle(ref, () => ({
        getPassword: getPassword,
      }));


    return (
        <div id="passwd" className="mb-3">
            <label htmlFor="password" className={styles.attributetext}>
            Password
            </label>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "8%"}}>
              <input
              type={showPassword ? "text" : "password"}
              placeholder="Password..."
              name="passwd"
              className={styles.textbox}
              value={sendPassword}
              onChange={(e) => setSendPassword(e.target.value)}
              />
              {/*if showPassword is true we us eyeOpen.png else we use eyeClosed.png*/}
              <img
              src={showPassword ? "/eyeOpen.png" : "/eyeClosed.png"}
              className={styles.eyeimage}
              onClick={() => setShowPassword(!showPassword)}
              />
            </div>
        </div>
    );
}
export default React.forwardRef(LoginPassword);