"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "../page.module.css";
// import Cookie from '../components/cookiejar.jsx'
// import {fetch, CookieJar} from 'node-fetch-cookies';

const CodePage = () => {
  const router = useRouter();

  const [enteredCode, setEnteredCode] = useState({});

  const checkcode = async (event) => {
    event.preventDefault();

    console.log(event.target);
    const formData = new FormData(event.target);

    const url = process.env.NEXT_PUBLIC_LOCAL_HOST_URL + "/passwordcode";
    const resetCode = formData.get("resetCode");
    const searchParams = new URLSearchParams(window.location.search);

    const username = searchParams.get("username");
    console.log(username);

    const validateResetCodeURL = encodeURI(
      `${url}?passwordcode=${resetCode}&username=${username}`
    );

    console.log(validateResetCodeURL);
    try {
      await fetch(validateResetCodeURL, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Assuming the response is JSON
        })

        .then((data) => {
          console.log("Data: " + data);
          if (data) {
            const queryParams = {
              username: username,
            };
            const queryString = new URLSearchParams(queryParams).toString();
            const url2 = `/changepass?${queryString}`;
            router.push(url2);
          } else {
            alert("Recovery code was invalid");
          }
        })
        .catch((e) => {
          console.log({ e });
        });
    } catch (error) {
      console.error("Error occured at posting data: ", error);
    }
  };

  return (
    <div className={styles.loginpage}>
      <h1>Enter recovery code</h1>

      <p className={styles.textcondense}>
        Enter the recovery code sent to you via email and click Submit. If the
        email you provided was&apos;t found in our database double-check to see if
        you spelled it correctly, or sign up to create an account.
      </p>

      <form onSubmit={checkcode}>
        <div id="recovery" className="mb-3">
          <label htmlFor="resetCode" className={styles.attributetext}>
            Recovery code
          </label>
          <input
            type="text"
            placeholder="Recovery code..."
            name="resetCode"
            required
            className={styles.textbox}
          />
        </div>

        <div className={styles.flexbutton}>
          <div id="form-action">
            <button type="submit" className={styles.buttoncontainer}>
              Verify recovery code
            </button>
          </div>
        </div>
        <div className={styles.flexbutton}>
          <a href={"/forgotpass"}>
            <button type="button" className={styles.buttoncontainer}>
              Go Back
            </button>
          </a>
        </div>
      </form>
    </div>
  );
};
export default CodePage;
