"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../page.module.css'

const orderPage = () => {
    const [authenticate, setAuthenticate] = useState({});
    // const [shippingAddress, setShippingAddress] = useState(null);
    const [shippingAddressAvailable, setShippingAddressAvailable] = useState(null); 
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const router = useRouter()
    
    // const retrieveShippingAddress = () => {

    //     const url = process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/getshippingaddress'
    //     const encodedURL = encodeURI(url)

    //     fetch(encodedURL, {
    //         method: 'GET',
    //         credentials: 'include',
    //     })
    
    //         .then((response) => response.json())
    //         .then((shipping) => {
    //             console.log("Shipping object: ", shipping)
    //             const value = shipping.addressPresent
    //             setShippingAddress(value)
    //         })
    //         .catch(e => {
    //             console.log("Before error")
    //             console.log({ e })
    //             console.log("After error")
    //         })
    // }

    const createOrder = () => {
        const searchParams = new URLSearchParams(window.location.search);

        const total = searchParams.get('priceForEverything')
        const cart_id = searchParams.get('cart_id')
        const url = process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/ordercreate'
        const encodedURL = encodeURI(`${url}?total=${total}&cart_id=${cart_id}`)

        fetch(encodedURL,{
            method: 'POST',
            credentials: 'include',
        })
            .then((response) => response.json())
            .catch(e => {
                console.log("Before error")
                console.log({ e })
                console.log("After error")
            })

        router.push('/home')    
        
    }

    const updateUserInfo = () => {
        const formData = new FormData();
            
        const obj = Object.fromEntries(formData.entries());
        console.log("user info ", obj);
    
    
        fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + "/updateshippingaddress",{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj),
        })
        .then((response) => response.json())
        .catch(e => {
            console.log("Before error")
            console.log({ e })
            console.log("After error")
        })
        
    }

    // [] means that the useEffect has no dependency and should be run one (or mount and unmount)
    //useEffect runs after the rendering
    useEffect(() => {

        fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/getlogin',{
            method: 'GET',
            credentials: 'include',
        })
      
            .then((response) => response.json())
            .then((authen) => {
                setAuthenticate(authen);
                if (authenticate["loggedin"]== "False") {
                    router.push('/home');
                }
            })
            .catch(e => {
                console.log("Before error")
                console.log({ e })
                console.log("After error")
            })   

            fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/checkshippingaddress',{
                method: 'GET',
                credentials: 'include',
            })
        
                .then((response) => response.json())
                .then((shipping) => {
                    console.log("Shipping object: ", shipping)
                    //Because I'm using fetchObjectFromCursor it only returns an object and not an array, this means we don't
                    //need to use .map since it's only one row of data and not multiple
                    setShippingAddressAvailable(shipping)
                })
                .catch(e => {
                    console.log("Before error")
                    console.log({ e })
                    console.log("After error")
                })   
        },[]);


        // useEffect(() => {
        //     console.log("Use effect triggered for retrieving address")
        //     retrieveShippingAddress() 
        // },[shippingAddressAvailable]);
    return(
        <div class={styles.homepage}>

            {/* conditional rendering is like if statements */}

            <div class={styles.checkout}>
                {shippingAddressAvailable === null &&
                    <>
                        <p>
                            We noticed that you didn't include your state and city, in order to continue through checkout we need this info
                        </p>
                        <form onSubmit={updateUserInfo}>
                            <div id="state" className="mb-3">
                            <label htmlFor="state" className={styles.attributetext}>State</label>
                            <input
                                type="text"
                                placeholder="Please Enter the State in which you are located"
                                name="state"
                                onChange={(e) => setState(e.target.value)}
                                className={styles.textbox}
                            />
                            </div>
                            <div id="city" className="mb-3">
                            <label htmlFor="city" className={styles.attributetext}>City</label>
                            <input
                                type="text"
                                placeholder="Please Enter the City in which you are located"
                                name="city"
                                onChange={(e) => setCity(e.target.value)}
                                className={styles.textbox}
                            />
                            </div>
                            <div id="form-action">
                                <button type='submit' className={styles.buttonorder}>Submit</button>
                            </div>
                        </form>
                    </>
                }
                    {shippingAddressAvailable ? (
                        <>
                            <p>{shippingAddressAvailable.city}</p>
                            <p>{shippingAddressAvailable.state}</p>
                            <p>{shippingAddressAvailable.streetaddress}</p>
                            <p>{shippingAddressAvailable.zipcode}</p>
                            <p>{shippingAddressAvailable.email}</p>
                        </>
                    ) : <></>}

                    <button className={styles.buttonorder} onClick={() => createOrder()}>
                        Place your order
                    </button>
            </div>
        </div>
    );
};
export default orderPage;