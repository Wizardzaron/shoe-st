'use client'

import React, { useState, useEffect } from 'react';
import styles from '../page.module.css'

import SignUpButton from "../components/SignUpButton"
import LoginButton from "../components/LoginButton"
import ShoeBrandList from "../components/ShoeBrandList"
import LogoutButton from "../components/LogoutButton"
import CartButton from "../components/CartButton"



function Brand() {

    const [shoeBrand, setShoeBrand] = useState(null);
    const [loginToken, setLoginToken] = useState({});

    useEffect(() => {

        const urlParams = new URLSearchParams(window.location.search);
        var id = urlParams.get('manufacture_id')
        //console.log(item_id);

        fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + "/getlogin", {
            method: "GET",
            credentials: "include",
          })
            .then((response) => response.json())
            .then((authenticateValue) => {
              console.log(authenticateValue);
              setLoginToken(authenticateValue);
            })
            .catch((e) => {
              console.log({ e });
            });



        fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL+'/shoebrand?manufacture_id='+id, {

            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

            .then((response) => response.json())
            .then((item) => {
                console.log(item)
                setShoeBrand(item)
            })
            .catch(e => {
                console.log("Before error")
                console.log({ e })
                console.log("After error")
            })


    }, [])
    if (shoeBrand == null) {
        return console.log("returned null")
    }

    return (
        <>
            <div className={styles.brandpage}>
                <div className={styles.navigationbar}>
                    <div className={styles.spaceForImage}>
                        <a href="/home">
                            <img src="/fakeLogo.png" width={100} hieght={100} />
                        </a>
                        {loginToken["loggedin"] === "False" ? (
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
                <div>
                    {shoeBrand && shoeBrand.length > 0 ? (
                        shoeBrand.map((it) => {
                            return (
                                <ShoeBrandList key={it.id} brands={it}/>
                            )
                        })
                    ): (
                        <p style={{textAlign: "center", marginTop: "20%", fontWeight: "bold", fontSize: "45px"}}>There's currently no shoes related to this brand</p>
                    )}
                </div>
            </div>
        </>
    )
};
export default Brand;