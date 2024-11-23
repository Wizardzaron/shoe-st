"use client"
import styles from "../page.module.css";
import React, { useState } from "react";


export default function ChangePassword() {

    const [showPassword,setShowPassword] = useState(false)

    return(
        <>
            <div id="password1" className="mb-3">
                <label htmlFor="passwordcode1" className={styles.attributetext}>Password</label>
                <input
                    type="text"
                    placeholder="Enter your new password"
                    name="passwordcode1"
                    className={styles.textbox}
                />
            </div>
            
            <div id="password2" className="mb-3">
                <label htmlFor="passwordcode2" className={styles.attributetext}>Confirm Password</label>
                <div style={{marginLeft: "50px"}}>     
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your new password"
                        name="passwordcode2"
                        className={styles.textbox}
                    />
                    <img
                        src={showPassword ? "/eyeOpen.png" : "/eyeClosed.png"}
                        className={styles.eyeimage}
                        onClick={() => setShowPassword(!showPassword)}
                    />
                </div>
            </div>
        </>
    )
};