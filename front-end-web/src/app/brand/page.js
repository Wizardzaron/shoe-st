'use client'

import React, {useState, useEffect} from 'react';
import styles from '../page.module.css'
import Link from 'next/link'

function Brand(){

    const [item, setItem] = useState(null);


    useEffect(() =>{

        const urlParams = new URLSearchParams(window.location.search);
        var brand = urlParams.get('brand')
        //console.log(item_id);
       
        fetch('https://shoe-st-api-58c2623d13b8.herokuapp.com/shoebrand?brand=' + brand,{

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
          .catch(e => console.log({e}))


    },[])
    if(item == null){
        return console.log("returned null")
    }

    return(
        <>
            <div class={styles.brandpage}>
                <div class={styles.followers}>
                    <div class={styles.spacingInsideSticky}>
                        <img
                            src = "/fakeLogo.png"
                            width={100}
                            hieght={100}                        
                        />
                        <Link href="/signup" className={styles.stickySpaceLink}> Create Account</Link>
                        <Link href="/login" className={styles.stickySpaceLink}> Login</Link>
                    </div>
                </div>
            
                <div>
                    {item.map((it)=>{

                        return(

                            <div class={styles.brand} key={it.item_id}>
                                <a href={"/shoedetail?id=" + it.item_id}>
                                    <img
                                        src = {it.images}
                                        height={250}
                                        alt="random stuff"
                                    />   
                                    <b>{it.names}</b>
                                    <b>{it.price}</b>
                                </a>
                            </div>
                        )

                    })}

                </div>
            </div>
        </>
)};
export default Brand;