'use client'

import React, { useState, useEffect } from 'react';
import styles from '../page.module.css'
import Link from 'next/link'

import SignUpButton from "../components/SignUpButton"
import LoginButton from "../components/LoginButton"
import ShoeBrandList from "../components/ShoeBrandList"

function Brand() {

    const [item, setItem] = useState(null);


    useEffect(() => {

        const urlParams = new URLSearchParams(window.location.search);
        var brand = urlParams.get('brand')
        //console.log(item_id);

        fetch('https://shoe-st-api-58c2623d13b8.herokuapp.com/shoebrand?brand=' + brand, {

            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

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


    }, [])
    if (item == null) {
        return console.log("returned null")
    }

    return (
        <>
            <div class={styles.brandpage}>
                <div class={styles.followers}>
                    <div class={styles.spacingInsideSticky}>
                        <img
                            src="/fakeLogo.png"
                            width={100}
                            hieght={100}
                        />
                        <SignUpButton />
                        <LoginButton />
                    </div>
                </div>

                <div>
                    {item.map((it) => {

                        return (
                            <ShoeBrandList key={it.item_id} brands={it}/>
                        )

                    })}

                </div>
            </div>
        </>
    )
};
export default Brand;