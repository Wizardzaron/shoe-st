'use client'
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link';
import styles from '../page.module.css'
import UserName from '../components/UserName'
import SignUpButton from "../components/SignUpButton"
import LoginButton from "../components/LoginButton"

const RecoveryPage = () => {

    const router = useRouter()

    // const searchParams = useSearchParams();

    const submitEmail = async (event) => {
        event.preventDefault()
        // console.log(event.target)
        const formData = new FormData(event.target);

        // const params = new URLSearchParams(searchParams);

        const url = process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/sendemail'
        const username = formData.get('username')

        const encodedURL = encodeURI(`${url}?username=${username}`)
        
        await fetch(encodedURL,{
            method: 'GET',
        })

        const queryParams = {
            username: username,
        };

        // params.set('username', username)
        const queryString = new URLSearchParams(queryParams).toString();
        const url2 = `/recoverycode?${queryString}`
        router.push(url2)
    }

    return (
        <div className={styles.loginpage}>
            <div className={styles.navigationbar}>
                <div className={styles.spaceForImage}>
                    <img src="/fakeLogo.png" width={100} height={100} />
                    <SignUpButton />
                    <LoginButton />
                </div>
                <hr style={{border: "2px solid black", marginTop: "10px"}}/>
            </div>
            <h1 className={styles.aligntext}>Lost your password?</h1>
                <p className={styles.textcondense}>Enter the username associated with your account and click Submit. 
                    If your username is connected to a valid account 
                    you will receive a reset code to your email that allows you to change your password.</p>
                <form onSubmit={submitEmail}>
                    <div style={{textAlign: "center"}}>
                        <UserName />
                    </div>
                    <div className={styles.flexbutton}>
                        <div id="form-action">
                            <button type="submit" className={styles.buttoncontainer}>
                                Request recovery code
                            </button>
                        </div>
                    </div>
                    <div className={styles.flexbutton}>
                        <a href={"/home"}>
                            <button type="button" className={styles.buttoncontainer}>
                                Go Back
                            </button>
                        </a>
                    </div>
                </form>
        </div>
    );
};
export default RecoveryPage;