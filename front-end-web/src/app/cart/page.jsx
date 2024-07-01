"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../page.module.css'

import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
  } from "@nextui-org/dropdown";


<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap-theme.min.css"
  integrity="sha512-kgrXVPaJi1gUqEbb3lVdpJ3tWjfCfEUGD4tKm5GpUW1Gy6PIq3n89kk0zEIWxgBlfpaZD7lcmTFdHL8u5eSzug=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>;

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css"/>


const orderPage = () => {
    const [cartData, setCartData] = useState([]);
    const [authenticate, setAuthenticate] = useState({});
    const [searchValue, setSearchValue] = useState(null); 
    const [totalValue, setTotalValue] = useState(0);
    const [sizeData, setSizeData] = useState([]);
    const router = useRouter()

    const deleteCartItems = (cart_item_id) => {

        console.log(cart_item_id);

        const formData = new FormData();
        formData.append('cart_item_id',cart_item_id);
        const obj = Object.fromEntries(formData.entries());

        fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/cartitemremoved', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
        })

        .then((response) => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json(); // Assuming the response is JSON
        })
        location.reload();
    }

    const gettingSizes = () =>{

        console.log("Boom");
        console.log(cartData)
        var formData = new FormData(cartData['id']);
        console.log(formData);
        console.log("Hey sexy");

        const url = process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/allsizes'
        const id = formData.get('id')

        const encodedURL = encodeURI(`${url}?id=${id}`)

        fetch(encodedURL, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
            })
    
            .then((response) => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json(); // Assuming the response is JSON
            })
    
            .then((data) => {
                console.log("Heyo");
                console.log(data);
                setSizeData(data);
            })
            .catch(e => {
                console.log("Before error")
                console.log({ e })
                console.log("After error")
            }); 

    }

    const addToFavorites = () => {


        router.push('/favorites');
    }

    const setTotalCost = (event) => {
        console.log(event)
        setTotalValue(totalValue + event);
        console.log(totalValue);

    }

    const setSearch = (event) => {

        setSearchValue(event.target.value)
    }

    const searching = (event) => {

        event.preventDefault();

        console.log(searchValue);
    }

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

        fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/cartitems', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
        })

        .then((response) => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json(); // Assuming the response is JSON
        })

        .then((data) => {
            console.log(data);
            setCartData(data);
            data.forEach(shoe => {
                setTotalCost(shoe.price)
                console.log("Test")
            })

        })
        .catch(e => {
            console.log("Before error")
            console.log({ e })
            console.log("After error")
        });
            gettingSizes();
    }, []);
    return(
        <div class={styles.homepage}>
            <div class={styles.navigationbar}>
                <div class={styles.spaceForImage}>
                    <a href="/home">
                        <img
                            src="/fakeLogo.png"
                            width={100}
                            hieght={100}
                        />
                    </a>
                    <>
                        <Link href="/home" class={styles.spaceBetweenLink}> Home</Link>
                    </>
                    <Link href="/list" class={styles.spaceBetweenLink}> Shoe List</Link>

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
                <p style={{fontWeight: "bold" , fontSize: "25px", marginLeft: "15%", marginTop: "25px"}}>Bag</p>
                {/* Item image component (essentially how we handle css in mobile apps)*/}
                {cartData.map((cartItems, index) => (
                    <div class={styles.cartitem}>
                        <div class={styles.cartimagediv}>
                            <img
                                class={styles.cartimage}
                                key={cartItems.image_id}
                                src={cartItems.image_url}
                            />
                        </div>
                        <div class={styles.cartdescriptivetext}>
                            <p style={{fontWeight:"bold"}}>{cartItems.brand_name} {cartItems.shoe_name}</p>
                            <p>{cartItems.sex} Shoe's</p>
                            <p>{cartItems.color}</p>
                            <p>Size {cartItems.size}</p>
                            <p>Quantity {cartItems.Quantity}</p>
                            <div class={styles.icons}>
                                <img 
                                    src="/heart.png"
                                    height={20}
                                    width={20}
                                    // must use () => otherwise the function is called automatically and causes an undefined error
                                    onClick={() => addToFavorites()}
                                />
                                <img 
                                    src="/trashCan.png"
                                    height={20}
                                    width={20}
                                    // must use () => otherwise the function is called automatically and causes an undefined error
                                    onClick={() => deleteCartItems(cartItems.cart_item_id)}
                                />
                                {sizeData.map((sizeChange) => (

                                    <Dropdown>
                                        <DropdownTrigger>
                                            <button>
                                            Open Menu
                                            </button>
                                        </DropdownTrigger>
                                        <DropdownMenu aria-label="Static Actions">
                                            <DropdownItem key="edit">{sizeChange.size}</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                ))}
                            </div>
                        </div>
                        <div class={styles.cartprice}>
                            <p style={{fontWeight: "bold"}}> ${cartItems.price}</p>
                        </div>
                        <div key={index}>
                            { index == 0 && (
                                <div style={{fontWeight:"bold", marginLeft: "250px"}}>
                                    <p style={{fontSize: "25px"}}>Summary</p>
                                    <p style={{marginTop: "10px"}}>Subtotal</p>
                                    <p>${totalValue}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
        </div>
    );
};
export default orderPage;