'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import styles from '../page.module.css'
import SignUpButton from "../components/SignUpButton"
import LoginButton from "../components/LoginButton"
import LogoutButton from "../components/LogoutButton"
import CartButton from "../components/CartButton"

function ShoeList(){

    const [brands, setBrands] = useState(null);   
    const [connect, setConnect] = useState({});
    // const [mainImage, setMainImage] = useState([]);
    // const [colorImage, setColorImages] = useState([]);


    useEffect(() => {

        fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/connect')

            .then((response) => response.json())
            .then((connect) => {
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

        fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + "/getlogin", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((authenticateValue) => {
                console.log(authenticateValue);
                setConnect(authenticateValue);
            })
            .catch((e) => {
                console.log({ e });
            });

        fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/allshoes')

        .then((response) => { 
            
            console.log(response.status)

            if(response.status === 403){
                // alert("You are not an approved URL")
                // return;
                router.push("public/403");
            }
            
            if(!response.ok){
                console.error("An error occurred:", response.status);
                return;
            }

            return response.json()
        })


        .then((fetchedBrands) =>{
            console.log(fetchedBrands)
            //need to do this since we are retrieve an array of objects/dictionaries so we need to step through each one
            fetchedBrands.forEach(brand => {
                brand.currentColorImageIndex = 0
                console.log("Test")
            })

            setBrands(fetchedBrands)
        })

        .catch(e => {
            console.log("Before error")
            console.log({ e })
            console.log("After error")
        })

    },[])
    if (brands == null) {
        return console.log("returned null")
    }


    return (
            <div className={styles.homepage}>
                <div className={styles.navigationbar}>
                    <div className={styles.spaceForImage}>
                        <a href="/home">
                            <img src="/fakeLogo.png" width={100} hieght={100} />
                        </a>
                        {connect["loggedin"] === "False" ? (
                            <>
                                <SignUpButton />
                                <LoginButton />
                            </>
                        ) : (
                            <>
                                <LogoutButton />
                                <CartButton />
                            </>
                        )}
                    </div>
                </div>
                <div className={styles.flexshoelist}>
                    {brands.map((aBrand) => {
                        return (
                            <div key={aBrand.brand_id}>
                                <a href={"/shoedetail?id=" + aBrand.id + "&brand_id=" + aBrand.brand_id}>
                                    <div className={styles.shoelist}>
                                        <div className={styles.list}>
                                            <img
                                                src={aBrand.images[aBrand.currentColorImageIndex].image_url}
                                                alt="random stuff"
                                            />
                                            <p style={{fontWeight:"bold"}}>{aBrand.brand_name} {aBrand.shoe_name}</p>
                                            <p>{aBrand.sex + "'s Shoes"}</p>
                                            <p>{"$" + aBrand.images[aBrand.currentColorImageIndex].price}</p>
                                        </div>
                                    </div>
                                    {/* curly brace in a .map means we are returing either a block of code or data structures */}
                                    <div className={styles.flexcarouselrow}>

                                        {aBrand.images.map((aImage, theIndex) => 
                                                <img
                                                    className={styles.shoeimg}
                                                    key={aImage.image_id}
                                                    src={aImage.image_url}
                                                    onMouseOver={(e) => {aBrand.currentColorImageIndex = theIndex; setBrands([...brands])}}
                                                />
                                        )}
                                    </div>    

                                </a>
                            </div>
                        )
                    })}
                </div>
            </div>

    )

};
export default ShoeList;