'use client'
import React, { useState} from 'react';
import { useRouter, useSearchParams} from 'next/navigation'
import Link from 'next/link';
import styles from '../page.module.css'
// import Cookie from '../components/cookiejar.jsx'
// import {fetch, CookieJar} from 'node-fetch-cookies';

const CodePage = () => {

    const router = useRouter();

    const [comparecode, setCompareCode] = useState({});

    const checkcode = async (event) => {
        event.preventDefault()
        
        console.log(event.target)
        const formData = new FormData(event.target);

        const url = process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/passwordcode'
        const passwordcode = formData.get('passwordcode')
        const searchParams = new URLSearchParams(window.location.search);

        const username = searchParams.get('username')
        console.log(username)

        const encodedURL = encodeURI(`${url}?passwordcode=${passwordcode}&username=${username}`)

        console.log(encodedURL)
        try {
            await fetch(encodedURL,{
                method: 'GET',
                credentials: 'include',
            })
            .then((response) => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json(); // Assuming the response is JSON
              })
      
              .then((data) => {
                console.log("Data: " + data);
                setCompareCode(data);
              })
              .catch(e => {
                console.log({ e })
              });
          } 
          catch (error) {
            console.error("Error occured at posting data: ", error);
          }

          if (comparecode == null) {
            return console.log("returned null");
          }

          if (comparecode) {
            const queryParams = {
              username: username,
            };
            const queryString = new URLSearchParams(queryParams).toString();
            const url2 = `/changepass?${queryString}`
            router.push(url2)
        }
          else{
            alert("Recovery code was invalid");
          }
    }


    return (

        <div class={styles.loginpage}>

            <h1>Input recovery code</h1>

            <p class={styles.textcondense}>                
                Enter the recovery code sent to you via email and click submit. 
                If the email you provided wasn't found in our database double-check to see if you spelled it correctly, 
                or sign up to make an account.
            </p>

            <form onSubmit={checkcode}>
              <div id="username" class="mb-3">
                  <label htmlFor="passwordcode" class={styles.attributetext}>Recovery code</label>
                  <input
                      type="text"
                      placeholder="Please Enter the recovery code"
                      name="passwordcode"
                      class={styles.textbox}
                  />
              </div>

              <div class={styles.flexbutton}>
                <div id="form-action">
                    <button type="submit" class={styles.buttoncontainer}>
                        Send recovery code
                    </button>
                </div>
              </div>
              <div class={styles.flexbutton}>
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