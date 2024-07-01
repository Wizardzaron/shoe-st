'use client'
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link';
import styles from '../page.module.css'

const RecoveryPage = () => {

    const router = useRouter()

    // const searchParams = useSearchParams();

    const checkuser = async (event) => {
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

        // router.push({pathname: '/recoverycode', query: queryParams})
    }

    return (
        <div class={styles.loginpage}>
            <h1 class={styles.aligntext}>Lost your password?</h1>
                <p class={styles.textcondense}>Enter the username associated with your account and click Submit. 
                    If your username is connected to a valid account 
                    you will receive a reset code to your email that allows you to change your password.</p>
                <form onSubmit={checkuser}>
                    <div id="username" class="mb-3">
                        <label htmlFor="username" class={styles.attributetext}>Username</label>
                        <input
                            type="text"
                            placeholder="Please Enter your Username"
                            name="username"
                            class={styles.textbox}
                        />
                    </div>
                    <div class={styles.flexbutton}>
                        <div id="form-action">
                            <button type="submit" class={styles.buttoncontainer}>
                                Send username
                            </button>
                        </div>
                    </div>
                    <div class={styles.flexbutton}>
                        <a href={"/login"}>
                            <button type="button" class={styles.buttoncontainer}>
                                Go Back
                            </button>
                        </a>
                    </div>
                </form>
        </div>
    );
};
export default RecoveryPage;