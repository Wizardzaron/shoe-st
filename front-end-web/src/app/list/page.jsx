'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import styles from '../page.module.css'

function ShoeList(){

    const [item, setItem] = useState(null);   
    const [connect, setConnect] = useState(null);
    const [mainImage, setMainImage] = useState([]);
    const [colorImage, setColorImages] = useState([]);

    const setMain = (event) => {
        setMainImage(event);
      }

    useEffect(() => {

        fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/connect')

            .then((response) => response.json())
            .then((connect) => {
                setConnect(connect)
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

        fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/allshoes')

        .then((response) => response.json())
        .then((items) => {

            console.log(items)
            //need to do this since we are retrieve an array of objects/dictionaries so we need to step through each one
            items.forEach(item => {
                setMainImage(item.image_url)
                console.log("Test")
            })

            setItem(items)
        })
        .catch(e => {
            console.log("Before error")
            console.log({ e })
            console.log("After error")
        })

        fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/allshoecolors')

        .then((response) => response.json())
        .then((colors) => {
            console.log(colors)
            //need to use Object.values because we returned a dictionary and .map only works with arrays
            const arrayOfColors = Object.values(colors)
            console.log("Hi")
            console.log(arrayOfColors)
            setColorImages(arrayOfColors)
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
                <div class={styles.navigationbar}>
                    <div class={styles.spaceForImage}>
                        <img
                            src="/fakeLogo.png"
                            width={100}
                            hieght={100}
                        />
                        <Link href="/home" class={styles.spaceBetweenLink}> Home</Link>
                    </div>
                </div>
                <div class={styles.flexshoelist}>
                    {item.map((it) => {
                        return (
                            <div key={it.item_id}>
                                <a href={"/shoedetail?id=" + it.id + "&brand_id=" + it.brand_id}>
                                    <div class={styles.shoelist}>
                                        <div>
                                            <img
                                                src={mainImage}
                                                alt="random stuff"
                                            />
                                            <p style={{fontWeight:"bold"}}>{it.brand_name} {it.shoe_name}</p>
                                            <p>{it.sex + "'s Shoes"}</p>
                                            <p>{"$" + it.price}</p>
                                        </div>
                                        {/* tried putting colorImage at line 96 but it caused duplicate images to appear */}
                                        {colorImage.map((color) => {
                                        return(
                                            <div class={styles.flexcarouselrow}>
                                                <img
                                                class={styles.shoeimg}
                                                key={color.image_id}
                                                src={color.image_url}
                                                onMouseOver={() => setMain(color.image_url)}
                                                />
                                            </div>
                                        )
                                        })}
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