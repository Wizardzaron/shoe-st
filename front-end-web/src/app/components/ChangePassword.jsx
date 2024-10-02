"use client"
import styles from "../page.module.css";
import React, { useState } from "react";


export default function ChangePassword() {

    const [showPassword,setShowPassword] = useState(false)
    const [eye, setEye] = useState("/eyeClosed.png")

    const changEye = () =>{
        
        setEye(eye == "/eyeClosed.png" ? "/eyeOpen.png" : "/eyeClosed.png") 
        setShowPassword(showPassword == true ? false : true)
    }


    return(
        <>
            <div id="password1" class="mb-3">
                <label htmlFor="passwordcode1" class={styles.attributetext}>Password</label>
                <input
                    type="text"
                    placeholder="Enter your new password"
                    name="passwordcode1"
                    class={styles.textbox}
                />
            </div>
            
            <div id="password2" class="mb-3">
                <label htmlFor="passwordcode2" class={styles.attributetext}>Confirm Password</label>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    name="passwordcode2"
                    class={styles.textbox}
                />
                <img 
                    src={eye}
                    class={styles.eyeimage}
                    onClick={changEye}
                />
            </div>
        </>
    )
};