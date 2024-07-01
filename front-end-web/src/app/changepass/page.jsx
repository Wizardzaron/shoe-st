'use client'
import React, { useState} from 'react';
import { useRouter} from 'next/navigation'
import styles from '../page.module.css'

const PassPage = () => {
    const router = useRouter()
    const [showPassword,setShowPassword] = useState(false)
    const [eye, setEye] = useState("/eyeClosed.png")

    const changEye = () =>{
        
        setEye(eye == "/eyeClosed.png" ? "/eyeOpen.png" : "/eyeClosed.png") 
        setShowPassword(showPassword == true ? false : true)
    }

    const changepassword = async (event) => {

        const formData = new FormData(event.target);
        const password1 = formData.get('passwordcode1');
        const password2 = formData.get('passwordcode2');
    
        console.log('Password 1:', password1);
        console.log('Password 2:', password2);
    
        if (password1 === password2){
            const searchParams = new URLSearchParams(window.location.search);
            const username = searchParams.get('username')
            const url = process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/passwordchange'
            const encodedURL = encodeURI(`${url}?password=${password1}&username=${username}`)
            await fetch(encodedURL,{
                method: 'GET',
            })
            router.push('/home')
        }
        else{
            alert("Passwords do not match");
        }

    }

    return (
        <div class={styles.loginpage}>

            <h1>Enter new password</h1>
            
            <form onSubmit={changepassword}>
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
                <div class={styles.flexbutton}>
                    <div id="form-action">
                        <button type="submit" class={styles.buttoncontainer}>
                            Submit new password
                        </button>
                    </div>
                </div>
            </form>    
        </div>    
    );
};
export default PassPage;