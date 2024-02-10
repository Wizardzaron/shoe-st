//used in next.js to show that this is a client component
'use client'

import React, {useState, useEffect} from 'react';
import styles from '../page.module.css'


function CustomerData() {

    const [item, setItem] = useState(null);

    useEffect(() => {
       
        fetch('http://127.0.0.1:5000/userdata',{
            method: 'GET',
            credentials:'include',
        })
        
        .then((response) => response.json()) 
        .then((item) => {
            console.log(item)
            setItem(item)
          })
          .catch(e => console.log(e))
    },[])
    if(item == null){
        return console.log("returned null")
    }
    //if (isLoading) return <p>Loading...</p>
    //if (!data) return <p>No profile data</p>
    return(
        <>
        {item.map((it) => {
            return (
                <div> 
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