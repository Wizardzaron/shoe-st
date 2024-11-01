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
    const [totalPrice, setTotalPrice] = useState(null);
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


    const gettingSizes = (shoeId) =>{

        console.log("Getting shoe sizes");
        console.log(shoeId)
        var id = shoeId;

        const url = process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/allsizes'

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

    const changeSize = (sizeId,cart_item_id) => {

        console.log("Getting shoe sizes");
        console.log(sizeId)
        console.log(cart_item_id)
        var id = sizeId;
        const url = process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/changeshoesize'

        const encodedURL = encodeURI(`${url}?id=${id}&cart_item_id=${cart_item_id}`)

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



    const addToFavorites = () => {

        alert("Favorites feature will be added later");
        // router.push('/favorites');
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

        const quantity = cartData.map(item => item.quantity)
        const prices = cartData.map(item => item.price)

        const url2 = process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/totalcost'
        const encodedURL2 = encodeURI(`${url2}?quantity=${quantity}&prices=${prices}`)

        fetch(encodedURL2,{
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
            console.log(totalValue)
            setTotalPrice(totalValue);
          })


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
            cart_id: cart_id
        };
        const queryString = new URLSearchParams(queryParams).toString();
        const url = `/checkout?${queryString}`
        router.push(url)
    }

    useEffect(() => {
    if(totalPrice != null){
        return
    }

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

        .then((data, subTotal) => {
            console.log("retrieving cart data")
            console.log(data);
            setCartData(data[0]);
            console.log(Number(data[1].subTotal));
            // data.forEach(shoe => {
            //     setTotalCost(shoe.price, shoe.Quantity)
            //     console.log("Test")
            // })
            setTotalPrice(Number(data[1].subTotal) + 8.00);
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
                {cartData && cartData.length > 0 ? (

                    cartData.map((cartItem, index) => (
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
                                        <button variant="bordered" onClick={() => gettingSizes(cartItem.id)}>
                                            Size {cartItem.size} v
                                        </button>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Static Actions">
                                        {sizeData.map((item,index) =>
                                            <DropdownItem
                                            key={index} 
                                            onClick={() => changeSize(item.size_id,cartItem.cart_item_id)}
                                            >{item.size}    
                                            </DropdownItem>
                                        )}
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown>
                                    <DropdownTrigger>
                                        <button variant="bordered">
                                        Quantity {cartItem.quantity} v
                                        </button>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Static Actions">
                                        {/* <div className={styles.dropdown}> */}
                                            {range(1,10).map((qty) => 
                                                <DropdownItem 
                                                    key={qty} 
                                                    onClick={() => changeQuantity(cartItem,qty,cartData)}
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
                                        <p style={{marginTop: "10px"}}>Subtotal: ${totalPrice - 8.00}</p>
                                        <p style={{marginTop: "10px"}}>Estimated Shipping & Handling: 8.00</p>
                                        <p style={{marginTop: "10px"}}>Total:${totalPrice}</p>
                                        <button className={styles.buttonorder} onClick={() => goToCheckout(cartItem.cart_id)}>
                                            Checkout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                    ) : (
                        <p style={{fontWeight: "bold" , fontSize: "25px", textAlign: "center"}}>No items in bag</p>
                )}
        </div>
    );
};
export default OrderPage;