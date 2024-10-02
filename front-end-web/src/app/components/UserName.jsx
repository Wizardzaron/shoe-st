"use client"
import styles from "../page.module.css";
import React, { useState, useImperativeHandle } from "react";

const UserName = ({}, ref) => {

    const [showUsername, setShowUsername] = useState(null);

    const getUsername = () => {
      return showUsername;
    }

    // A function that takes no arguments and returns the ref handle you want to expose
    useImperativeHandle(ref, () => ({
        getUsername: getUsername,
      }));

    return(
        <div id="username" className="mb-3">
        <label htmlFor="username" class={styles.attributetext}>
            Username
        </label>
        <input
        type="text"
        placeholder="Username..."
        name="username"
        value={showUsername}
        onChange={(e) => setShowUsername(e.target.value)}
        class={styles.textbox}
        />
        </div>
    )
};
export default React.forwardRef(UserName);