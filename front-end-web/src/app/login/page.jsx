"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../page.module.css";
import UserName from "../components/UserName"
import LoginPassword from "../components/LoginPassword"


const LoginPage = () => {
  const router = useRouter();

  const AddressRef = useRef(null);
  const UsernameRef = useRef(null);

  const Login = (event) => {
    event.preventDefault();

    console.log(AddressRef.current.getPassword());
    console.log(UsernameRef.current.getUsername());

    const password = AddressRef.current.getPassword();
    const username = UsernameRef.current.getUsername();


    try {
      fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + "/login?passwd=" + password + "&username=" + username, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((loginResponse) => {
          if (loginResponse["loggedin"] == "True") {
            router.push("/home");
          } else {
            alert("Incorrect username or password");
            router.push("/login");
          }
        });
    } catch (error) {
      console.error("Server error at logging in : ", error);
    }
  };
  return (
    <div>
      <section className={styles.loginpage}>
        <h1 className={styles.aligntext}>Login</h1>
        <div className={styles.flexbutton}>
          <form onSubmit={Login}>
            <UserName ref={UsernameRef}/>
            <LoginPassword ref={AddressRef}/>

            <Link href={"/forgotpass"} className={styles.forgotpassword}>
              Forgot your password?{" "}
            </Link>

            <div id="form-action">
              <button type="submit" className={styles.buttoncontainer}>
                Sign in
              </button>
            </div>
            {/* <text>(or)</text> */}
            {/* need to use goto */}
            <a href={"/signup"}>
              <button type="button" className={styles.buttoncontainer}>
                Create Account
              </button>
            </a>

            <a href={"/home"}>
              <button type="button" className={styles.buttoncontainer}>
                Go Back
              </button>
            </a>

          </form>
        </div>
      </section>
    </div>
  );
};
export default LoginPage;
