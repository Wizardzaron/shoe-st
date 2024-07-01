'use client'
import React, { useState} from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import styles from '../page.module.css'

const LoginPage = () => {

    const router = useRouter()

    const [showPassword,setShowPassword] = useState(true)
    const [eye, setEye] = useState("/eyeClosed.png")

    const changEye = () =>{
        
        setEye(eye == "/eyeClosed.png" ? "/eyeOpen.png" : "/eyeClosed.png") 
        setShowPassword(showPassword == true ? false : true)
    }

    const Login = (event) => {
        event.preventDefault()

        //retrieves the values I put in the the text boxs after pressing the submit button
        var formData = new FormData(event.target);

        console.log(formData);

        try {
            fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL +'/login', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            })

                .then(response => response.json())
                .then(loggedin => {


                    const login = loggedin;

                    console.log('login is', login);

                    if (login["loggedin"] === "False") {
                        alert("Incorrect username or password")
                    }
                    else if (login["loggedin"] === "True") {
                        console.log("Correct login");
                        // document.cookie = "checked=True";
                        router.push('/home');
                    }

                    else {
                        router.push('/login');
                    }

                })

        }
        catch (error) {
            console.error("Error occured at posting data: ", error);
        }
    }
    return (
        <div>
            <section className={styles.loginpage}>
                <h1 class={styles.aligntext}>Welcome to fake.com</h1>
                <div class={styles.flexbutton}>
                    <form onSubmit={Login}>
                        <div id="username" className="mb-3">
                            <label htmlFor="username" class={styles.attributetext}>Username</label>
                            <input
                                type="text"
                                placeholder="Please Enter your Username"
                                name="username"
                                class={styles.textbox}
                            />
                        </div>
                        <div id="passwd" className="mb-3">
                            <label htmlFor="password" class={styles.attributetext}>Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Please Enter your password"
                                name="passwd"
                                class={styles.textbox}
                            />
                            <img 
                                src={eye}
                                class={styles.eyeimage}
                                onClick={changEye}
                            />
                        </div>
                        <Link href={"/forgotpass"} class={styles.forgotpassword}>Forgot your password? </Link>

                        <div id="form-action">
                            <button type="submit" class={styles.buttoncontainer}>
                                Sign in
                            </button>
                        </div>
                        {/* <text>(or)</text> */}
                            {/* need to use goto */}
                        <a href={"/signup"}>
                            <button type="button" class={styles.buttoncontainer}>
                                    Create Account
                            </button>   
                        </a>
                    </form>
                </div>
            </section>
        </div>
    );
};
export default LoginPage;