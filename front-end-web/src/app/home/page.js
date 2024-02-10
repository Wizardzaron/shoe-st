'use client'

import React, {useState, useEffect} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import Link from 'next/link'
import styles from '../page.module.css'

function HomePage(){

    const [searchValue, setSearchValue] = useState(null);
    const [item, setItem] = useState(null);

    const setSearch = (event) => {

        setSearchValue(event.target.value)
    }

    const searching = (event) =>{

        event.preventDefault();
        
        console.log(searchValue);
    
    
    }

    useEffect(() => {
       
        fetch('https://shoe-st-4581e5bc88b0.herokuapp.com/shoeimages')
        
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

    return(
        <>
        <div class={styles.homepage}>
            <div class={styles.followers}>
                <div class={styles.spacingInsideSticky}>
                    <img
                        src = "/fakeLogo.png"
                        width={100}
                        hieght={100}                        
                    />
                    <Link href="/signup" className={styles.stickySpaceLink}> Create Account</Link>
                    <Link href="/login" className={styles.stickySpaceLink}> Login</Link>
                    <form style={{display:'inline-block'}} onSubmit={searching}>
                        <input style={{marginLeft:"30px"}} 
                            id="search" 
                            type="text" 
                            class="input" 
                            placeholder="search..." 
                            value={searchValue} 
                            onChange={setSearch}
                        />   
                        <div id="form-action" style={{display:'inline-block'}}>
                            <button type='submit' style={{marginLeft:"10px"}}>Search</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* autoPlay infiniteLoop */}
            <Carousel>
                {item.map((it) => {
                    return (
                        <div key={it.item_id}>
                            <div class={styles.flexcontainer}>
                                <section className={styles.block1}> 
                                    {/* Needed to add display flex style to link so it can cover the entire image */}
                                    <a href={"/shoedetail?id=" + it.item_id} style={{display: 'flex'}}>
                                        <img
                                            src = {it.images}
                                            height={250}
                                            alt="random stuff"
                                        />                         
                                    </a> 
                                </section>
                                <section className={styles.block2}>
                                    {it.names}
                                </section>
                                <section className={styles.block3}>
                                    {it.descript}
                                </section>
                            </div>
                        </div>
                    )
                })}
            </Carousel>
            <b style={{marginTop:"20px"}}>Available Brands</b>
            <div class={styles.homeimg}>
                <a href={"/brand?brand=Adidas"}>
                    <img
                        src = "/adidas.png"
                        width={100}
                        hieght={100}                        
                    />
                </a>
                <a href={"/brand?brand=Nike"}>
                    <img
                        src = "/nike.jpg"
                        width={100}
                        hieght={100}                        
                    />
                </a>
                <a href={"/brand?brand=Puma"}>
                    <img
                        src = "/puma.png"
                        width={100}
                        hieght={100}                        
                    />
                </a>
                <a href={"/brand?brand=Jordan"}>
                    <img
                        src = "/jordan.png"
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