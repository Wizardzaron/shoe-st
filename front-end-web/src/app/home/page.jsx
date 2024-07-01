'use client'

import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from '../page.module.css'

function HomePage() {

    const [searchValue, setSearchValue] = useState(null);
    const [item, setItem] = useState(null);
    const [connect, setConnect] = useState(null);
    const [authenticate, setAuthenticate] = useState({});
    const [images, setImages] = useState(null);

    // const { REACT_APP_API_ENDPOINT } = process.env;
    //console.log({line:20,env:process.env, endpoint:process.env.NEXT_PUBLIC_LOCAL_HOST_URL, foo:process.env.NEXT_PUBLIC_FOO})

    const router = useRouter()

    const setSearch = (event) => {

        setSearchValue(event.target.value)
    }

    const searching = (event) => {

        event.preventDefault();

        console.log(searchValue);
    }

    useEffect(() => {

        console.log("Heyo",process.env.NEXT_PUBLIC_LOCAL_HOST_URL)
        // const url = 'https://example.com'; // Replace with the URL you want to check

        // fetch(url)
        //     .then(response => {
        //         console.log('Status code:', response.status);
        //         // Handle the response status code as needed
        //     })
        //     .catch(error => {
        //         console.error('Error fetching URL:', error);
        //     });



        fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/connect')

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

        fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/getlogin',{
            method: 'GET',
            credentials: 'include',
        })

            .then((response) => response.json())
            .then((authenticateValue) => {
                setAuthenticate(authenticateValue);
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

            // https://shoe-st-api-58c2623d13b8.herokuapp.com

        fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/allshoedata')

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
        fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/allmainimages')

            .then((response) => response.json())
            .then((images) => {
                console.log(images)
                setImages(images)
            })
            .catch(e => {
                console.log("Before error")
                console.log({ e })
                console.log("After error")
            })
    }, [])
    if (item == null || images == null) {
        return console.log("returned null")
    }

    return (
        //fragments are used to wrap around elements without including DOM nodes
        <>
            <div class={styles.homepage}>
                <div class={styles.navigationbar}>
                    <div class={styles.spaceForImage}>
                        <img
                            src="/fakeLogo.png"
                            width={100}
                            hieght={100}
                        />
                        <>
                            {/* need to find a way to make an OR statement when authenticate["loggedin"] is undefined */}
                            {authenticate["loggedin"] == 'False' ? (
                            <>
                                <Link href="/signup" className={styles.spaceBetweenLink}> Create Account</Link>
                                <Link href="/login" className={styles.spaceBetweenLink}> Login</Link>
                            </>) : (
                            <>
                                <Link href="/logout" className={styles.spaceBetweenLink}> Logout</Link>
                                <Link href="/cart" className={styles.spaceBetweenLink}> Cart</Link>
                            </>)
                            }
                        </>
                        <Link href="/list" className={styles.spaceBetweenLink}> Shoe List</Link>

                        <form style={{ display: 'inline-block' }} onSubmit={searching}>
                            <input style={{ marginLeft: "30px" }}
                                id="search"
                                type="text"
                                class="input"
                                placeholder="search..."
                                value={searchValue}
                                onChange={setSearch}
                            />
                            <div id="form-action" style={{ display: 'inline-block' }}>
                                <button type='submit' style={{ marginLeft: "10px" }}>Search</button>
                            </div>
                        </form>
                    </div>
                </div>
                <Carousel autoPlay={true} interval={3000} infiniteLoop={true}> 
                    {images.map((it) => {
                        return (
                            <div key={it.image_id}>
                                <a href={"/shoedetail?id=" + it.shoe_id + "&brand_id=" + it.brand_id}>
                                    <img
                                        src={it.image_url}
                                        alt="random stuff"
                                    />
                                    <section className={styles.block2}>
                                        {it.brand_name}
                                        &nbsp;
                                        {it.shoe_name}
                                    </section>
                                    <section className={styles.block3}>
                                        {it.descript}
                                    </section>
                                </a>
                            </div>
                        )
                    })}
                </Carousel>
                <b style={{ marginTop: "20px" }}>Available Brands</b>
                <div class={styles.homeimg}>
                        <a href={"/brand?brand=Adidas"}>
                            <img
                                src="/adidas.png"
                                width={100}
                                hieght={100}
                            />
                        </a>
                        <a href={"/brand?brand=Nike"}>
                            <img
                                src="/nike.jpg"
                                width={100}
                                hieght={100}
                            />
                        </a>
                        <a href={"/brand?brand=Puma"}>
                            <img
                                src="/puma.png"
                                width={100}
                                hieght={100}
                            />
                        </a>
                        <a href={"/brand?brand=Jordan"}>
                            <img
                                src="/jordan.png"
                                width={100}
                                hieght={100}
                            />
                        </a>
                </div>
            </div>
        </>
    )
};
export default HomePage;