'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import styles from '../page.module.css'

function ShoeList(){

    const [brands, setBrands] = useState(null);   
    const [connect, setConnect] = useState(null);
    // const [mainImage, setMainImage] = useState([]);
    // const [colorImage, setColorImages] = useState([]);



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
        .then((fetchedBrands) => {

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

        // fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/allshoecolors')

        // .then((response) => response.json())
        // .then((colors) => {
        //     console.log(colors)
        //     //need to use Object.values because we returned a dictionary and .map only works with arrays
        //     const arrayOfColors = Object.values(colors)
        //     console.log("Hi")
        //     console.log(arrayOfColors)
        //     setColorImages(arrayOfColors)
        // })
        // .catch(e => {
        //     console.log("Before error")
        //     console.log({ e })
        //     console.log("After error")
        // })

    },[])
    if (brands == null) {
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
                    {brands.map((aBrand) => {
                        return (
                            <div key={aBrand.brand_id}>
                                <a href={"/shoedetail?id=" + aBrand.id + "&brand_id=" + aBrand.brand_id}>
                                    <div class={styles.shoelist}>
                                        <div class={styles.list}>
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
                                    <div class={styles.flexcarouselrow}>

                                        {aBrand.images.map((aImage, theIndex) => 
                                                <img
                                                    class={styles.shoeimg}
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