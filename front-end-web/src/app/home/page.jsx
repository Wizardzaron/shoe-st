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
    const [authenticate, setAuthenticate] = useState(null);


    const router = useRouter()

    const setSearch = (event) => {

        setSearchValue(event.target.value)
    }

    const searching = (event) => {

        event.preventDefault();

        console.log(searchValue);


    }

    useEffect(() => {


        // const url = 'https://example.com'; // Replace with the URL you want to check

        // fetch(url)
        //     .then(response => {
        //         console.log('Status code:', response.status);
        //         // Handle the response status code as needed
        //     })
        //     .catch(error => {
        //         console.error('Error fetching URL:', error);
        //     });


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
    }, [])
    if (item == null) {
        return console.log("returned null")
    }

    return (
        //fragments are used to wrap around elements without including DOM nodes
        <>
            <div class={styles.homepage}>
                <div class={styles.followers}>
                    <div class={styles.spacingInsideSticky}>
                        <img
                            src="/fakeLogo.png"
                            width={100}
                            hieght={100}
                        />
                        <>
                            {authenticate["loggedin"] == "False" ? <><Link href="/signup" className={styles.stickySpaceLink}> Create Account</Link><Link href="/login" className={styles.stickySpaceLink}> Login</Link></> : <Link href="/logout" className={styles.stickySpaceLink}> Logout</Link>}
                        </>
                        <Link href="/list" className={styles.stickySpaceLink}> Shoe List</Link>

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
                {/* autoPlay infiniteLoop */}
                <Carousel> 
                    {item.map((it) => {
                        return (
                            <div key={it.item_id}>
                                {/* <span>Before</span> */}
                                <img
                                    src={it.images}
                                    alt="random stuff"
                                />
                                    {it.names}
                                {/* <span>After</span> */}
                            </div>
                            // <div key={it.item_id} class={styles.itemdiv}>
                            //     <div class={styles.flexcontainer}>
                            //         <div className={styles.block1}>
                            //             {/* Needed to add display flex style to link so it can cover the entire image */}
                            //             <a href={"/shoedetail?id=" + it.item_id} style={{ display: 'flex' }}>
                            //                 <img
                            //                     src={it.images}
                            //                     height={250}
                            //                     alt="random stuff"
                            //                 />
                            //             </a>
                            //         </div>
                            //         <section className={styles.block2}>
                            //             {it.names}
                            //         </section>
                            //         {/* <div className={styles.block3}>
                            //             {it.descript}
                            //         </div> */}
                            //     </div>
                            // </div>
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