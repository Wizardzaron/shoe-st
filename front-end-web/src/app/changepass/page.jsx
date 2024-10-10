'use client'
import React, { useState} from 'react';
import { useRouter} from 'next/navigation'
import styles from '../page.module.css'
import ChangePassword from '../components/ChangePassword'


const PassPage = () => {
    const router = useRouter()

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
        <div className={styles.loginpage}>

            <h1>Enter new password</h1>
            
            <form onSubmit={changepassword}>
                <ChangePassword />
                <div className={styles.flexbutton}>
                    <div id="form-action">
                        <button type="submit" className={styles.buttoncontainer}>
                            Submit new password
                        </button>
                    </div>
                </div>
            </form>    
        </div>    
    );
};
export default PassPage;