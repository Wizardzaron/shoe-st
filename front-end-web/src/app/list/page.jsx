'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import styles from '../page.module.css'

function ShoeList(){

    const [item, setItem] = useState(null);   
    const [connect, setConnect] = useState(null);
    const [authenticate, setAuthenticate] = useState(null);   

    useEffect(() => {

        fetch('https://shoe-st-api-58c2623d13b8.herokuapp.com/getlogin',{
            method: 'GET',
            credentials: 'include',
        })

            .then((response) => response.json())
            .then((authenticate) => {
                setAuthenticate(authenticate);
                console.log("Hi")
                console.log(authenticate["loggedin"])
                // if (authenticate["loggedin"]== "False") {
                //     console.log("Endpoint works")
                // }
            })
            .catch(e => {
                console.log("Before error")
                console.log({ e })
                console.log("After error")
            })

        fetch('https://shoe-st-api-58c2623d13b8.herokuapp.com/connect')

            .then((response) => response.json())
            .then((connect) => {
                setConnect(connect)
                console.log("Hi")
                console.log(connect.status)
                if (connect.status == 503) {
                    router.push('../public/503.jsx')
                }
            })
            .catch(e => {
                console.log("Before error")
                console.log({ e })
                console.log("After error")
            })

        fetch('https://shoe-st-api-58c2623d13b8.herokuapp.com/shoeimages')

        .then((response) => response.json())
        .then((item) => {
            console.log(item)
            setItem(item)
        })
        .catch(e => {
            console.log("Before error")
            console.log({ e })
            console.log("After error")
        })

    },[])
    if (item == null) {
        return console.log("returned null")
    }


    return (
            <div class={styles.homepage}>
                <div class={styles.followers}>
                    <div class={styles.spacingInsideSticky}>
                        <img
                            src="/fakeLogo.png"
                            width={100}
                            hieght={100}
                        />
                        <>
                            {authenticate["loggedin"] == "False"  ? <><Link href="/signup" className={styles.stickySpaceLink}> Create Account</Link><Link href="/login" className={styles.stickySpaceLink}> Login</Link></> : <Link href="/logout" className={styles.stickySpaceLink}> Logout</Link>}
                        </>
                        <Link href="/home" className={styles.stickySpaceLink}> Home</Link>
                    </div>
                </div>
                {item.map((it) => {
                    return (
                        <div key={it.item_id}>
                            <section className={styles.shoelist}>
    
                                <img
                                    src={it.images}
                                    height={250}
                                    alt="random stuff"
                                />

                            </section>
                        </div>
                    )
                })}
            </div>

    )

};
export default ShoeList;