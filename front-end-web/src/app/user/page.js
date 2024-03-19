//used in next.js to show that this is a client component
'use client'

import React, { useState, useEffect } from 'react';
import styles from '../page.module.css'


function CustomerData() {

    const [item, setItem] = useState(null);

    (async() => {
        fetch('https://shoe-st-api-58c2623d13b8.herokuapp.com/userdata', {
            method: 'GET',
            credentials: 'include',
        })

            .then((response) => response.json())
            .then((itemx) => {
                if ("message" in itemx) {
                    console.log("Got an error: " + itemx.message)
                    return
                }
                console.log("Before setItem: ", item);
                //itemx is the result of the promise i.e. the response parameter
                console.log("itemx is: ", itemx)
                setItem(itemx)
                console.log("After setItem: ", item)
            })
            .catch(e => {
                console.log("Before error")
                console.log({ e })
                console.log("After error")
            })
    })();
    if (item == null) {
        return console.log("returned null")
    }
    //if (isLoading) return <p>Loading...</p>
    //if (!data) return <p>No profile data</p>
    return (
        <>
            {item.map((it, index) => {
                return (
                    <div key={index}>
                        <section className={styles.userinfo}>
                            <h1>First Name</h1>
                            {it.firstname}
                            <h1>Last Name</h1>
                            {it.lastname}
                            <h1>User Name</h1>
                            {it.username}
                            <h1>Password</h1>
                            {it.passwd}
                            <h1>Email</h1>
                            {it.email}
                            <h1>Street Address</h1>
                            {it.streetaddress}
                            <h1>Zipcode</h1>
                            {it.zipcode}
                        </section>
                    </div>
                )
            })}
        </>
    )
};

export default CustomerData;