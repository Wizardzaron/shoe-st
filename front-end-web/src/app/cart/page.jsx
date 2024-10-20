"use client";
import React, { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../page.module.css'

import ListButton from '../components/ListButton'


import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
  } from "@nextui-org/dropdown";

  const range = (min, max) => {
    const result = [];
    for (let n = min; n < max; ++n) {
        result.push(n); // Or: `result[result.length] = n;` if you want to
                        // avoid the function call
    }
    return result;
};
// const UserContext = createContext();


<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap-theme.min.css"
  integrity="sha512-kgrXVPaJi1gUqEbb3lVdpJ3tWjfCfEUGD4tKm5GpUW1Gy6PIq3n89kk0zEIWxgBlfpaZD7lcmTFdHL8u5eSzug=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>;

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css"/>




const OrderPage = () => {
    const [cartData, setCartData] = useState([]);
    const [authenticate, setAuthenticate] = useState({});
    const [searchValue, setSearchValue] = useState(""); 
    const [sizeData, setSizeData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const router = useRouter()

    const deleteCartItems = (cart_item_id) => {

        console.log(cart_item_id);

        const formData = new FormData();
        formData.append('cart_item_id',cart_item_id);
        formData.append('url',window.location.origin);
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

    const setTotalCost = (cartData) => {

        const quantity = cartData.map(item => item.quantity)
        const prices = cartData.map(item => item.price)

        // console.log("Hi")
        // console.log(cartData)
        console.log(quantity)
        // console.log(prices)
        const url = process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/totalcost'
        const encodedURL = encodeURI(`${url}?quantity=${quantity}&prices=${prices}`)

        fetch(encodedURL,{
            method: 'GET',
        })

        .then((response) => response.json())
        .catch(e => {
            console.log("Before error")
            console.log({ e })
            console.log("After error")
        }) 

        .then((total) => {
            const totalValue = Number(total) + 8.00;
            setTotalPrice(totalValue);
          })
    }

    const changeQuantity = (cartItem, newQuantity) => {
        console.log("Hi");
        console.log(newQuantity);
        console.log(cartItem.cart_item_id);

        const url = process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/newquantity'
        const encodedURL = encodeURI(`${url}?newQuantity=${newQuantity}&cart_item_id=${cartItem.cart_item_id}`)


        fetch(encodedURL,{
            method: 'PATCH',
        })
      
            .then((response) => response.json())
            .catch(e => {
                console.log("Before error")
                console.log({ e })
                console.log("After error")
            })      

        setCartData([...cartData]);
    }
    

    const setSearch = (event) => {

        setSearchValue(event.target.value)
    }

    const searching = (event) => {

        event.preventDefault();

        console.log(searchValue);
    }

    const goToCheckout = (cart_id) => {
        const queryParams = {
            priceForEverything: totalPrice,
            cart_id: cart_id
        };
        const queryString = new URLSearchParams(queryParams).toString();
        const url = `/checkout?${queryString}`
        router.push(url)
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
            throw new Error('Network response was not ok, the status code is ' + response.status);
            }
            return response.json(); // Assuming the response is JSON
        })

        .then((data) => {
            console.log(data);
            setCartData(data);
            // data.forEach(shoe => {
            //     setTotalCost(shoe.price, shoe.Quantity)
            //     console.log("Test")
            // })

        })
        .catch(e => {
            console.log("Before error")
            console.log({ e })
            console.log("After error")
        });
    }, []);
    return(
        <div className={styles.homepage}>
            <div className={styles.navigationbar}>
                <div className={styles.spaceForImage}>
                    <a href="/home">
                        <img
                            src="/fakeLogo.png"
                            width={100}
                            hieght={100}
                        />
                    </a>
                    <div>
                        {setTotalCost(cartData)}
                    </div>
                    <>
                        <Link href="/home" className={styles.spaceBetweenLink}> Home</Link>
                    </>
                    <ListButton />

                    <form style={{ display: 'inline-block' }} onSubmit={searching}>
                        <input style={{ marginLeft: "30px" }}
                            id="search"
                            type="text"
                            className="input"
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
                {cartData.map((cartItem, index) => (
                    <div className={styles.cartitem} key={cartItem.cart_item_id}>
                        <div className={styles.cartimagediv} key={cartItem.image_id}>
                            <img
                                className={styles.cartimage}
                                key={cartItem.image_id}
                                src={cartItem.image_url}
                            />
                        </div>
                        <div className={styles.cartdescriptivetext}>
                            <p style={{fontWeight:"bold"}}>{cartItem.brand_name} {cartItem.shoe_name}</p>
                            <p>{cartItem.sex} Shoe&apos;s</p>
                            <p>{cartItem.color}</p>

                            <Dropdown>
                                <DropdownTrigger>
                                    <button variant="bordered">
                                        Size {cartItem.size} v
                                    </button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions">
                                    {/* <div className={styles.dropdown}> */}
                                    {/* setSizeData(data);  */}
                                        {sizeData.map((qty) => 
                                            <DropdownItem 
                                                key={qty} 
                                                // onClick={() => changeSize(cartItem,qty)}
                                                >{qty}
                                            </DropdownItem>)}
                                    {/* </div> */}
                                </DropdownMenu>
                            </Dropdown>

                            <Dropdown>
                                <DropdownTrigger>
                                    <button variant="bordered">
                                    Quantity {cartItem.Quantity} v
                                    </button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions">
                                    {/* <div className={styles.dropdown}> */}
                                        {range(1,10).map((qty) => 
                                            <DropdownItem 
                                                key={qty} 
                                                onClick={() => changeQuantity(cartItem,qty)}
                                                >{qty}
                                            </DropdownItem>)}
                                    {/* </div> */}
                                </DropdownMenu>
                            </Dropdown>                            
                            <div className={styles.icons}>
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
                                    onClick={() => deleteCartItems(cartItem.cart_item_id)}
                                />
                            </div>
                        </div>
                        <div className={styles.cartprice}>
                            <p style={{fontWeight: "bold"}}> ${cartItem.price}</p>
                        </div>
                        <div key={index}>
                            { index == 0 && (
                                <div style={{fontWeight:"bold", marginLeft: "200px"}}>
                                    <p style={{fontSize: "25px"}}>Summary</p>
                                    <p style={{marginTop: "10px"}}>Subtotal: ${totalPrice - 8}</p>
                                    <p style={{marginTop: "10px"}}>Estimated Shipping & Handling: 8.00</p>
                                    <p style={{marginTop: "10px"}}>Total:${totalPrice}</p>
                                    <button className={styles.buttonorder} onClick={() => goToCheckout(cartItem.cart_id)}>
                                        Checkout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
        </div>
    );
};
export default OrderPage;