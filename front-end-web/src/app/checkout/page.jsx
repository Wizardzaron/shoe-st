"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../page.module.css";
import SignUpButton from "../components/SignUpButton";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import CartButton from "../components/CartButton";

const OrderPage = () => {
  const [authenticate, setAuthenticate] = useState({});
  const [shippingAddressAvailable, setShippingAddressAvailable] =
    useState(null);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);


  const router = useRouter();

  const createOrder = () => {
    const cart_id = searchParams.get("cart_id");
    const url = process.env.NEXT_PUBLIC_LOCAL_HOST_URL + "/ordercreate";
    const encodedURL = encodeURI(`${url}?total=${totalPrice}&cart_id=${cart_id}`);

    fetch(encodedURL, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .catch((e) => {
        console.log("Before error");
        console.log({ e });
        console.log("After error");
      });

    router.push("/home");
  };


  const updateUserInfo = () => {
    const formData = new FormData();

    formData.append("city", city);
    formData.append("state", state);

    const obj = Object.fromEntries(formData.entries());
    console.log("user info ", obj);

    fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + "/updateshippingaddress", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .catch((e) => {
        console.log("Before error");
        console.log({ e });
        console.log("After error");
      });
  };

  // [] means that the useEffect has no dependency and should be run one (or mount and unmount)
  //useEffect runs after the rendering
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + "/getlogin", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((authen) => {
        console.log(authen);
        if (authen["loggedin"] == "False") {
          router.push("/home");
        }
        setAuthenticate(authen);
      })
      .catch((e) => {
        console.log("Before error");
        console.log({ e });
        console.log("After error");
      });

    fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + "/checkshippingaddress", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((shipping) => {
        console.log("Shipping object: ", shipping);
        //Because I'm using fetchObjectFromCursor it only returns an object and not an array, this means we don't
        //need to use .map since it's only one row of data and not multiple
        setShippingAddressAvailable(shipping);
      })
      .catch((e) => {
        console.log("Before error");
        console.log({ e });
        console.log("After error");
      });

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
            console.log("retrieving cart data")
            console.log(data);
            setCartData(data[0]);
            setTotalPrice(Number(data[1].subTotal) + 8.00);


        })
        .catch(e => {
            console.log("Before error")
            console.log({ e })
            console.log("After error")
        });


  }, []);

  return (
    <div className={styles.homepage}>
      {/* conditional rendering is like if statements */}

      <div className={styles.navigationbar}>
        <div className={styles.spaceForImage}>
          <a href="/home">
            <img src="/fakeLogo.png" width={100} hieght={100} />
          </a>
          {authenticate["loggedin"] === "False" ? (
            <>
              <SignUpButton />
              <LoginButton />
            </>
          ) : (
            <>
              <LogoutButton />
              <CartButton />
            </>
          )}
        </div>
      </div>
      <div className={styles.checkout}>
        <h1>Checkout</h1>
        {shippingAddressAvailable === null && (
          <>
            <p>
              We noticed that you didn&apos;t include your state and city, in
              order to continue through checkout we need this info
            </p>
            <form onSubmit={updateUserInfo}>
              <div id="state" className="mb-3">
                <label htmlFor="state" className={styles.attributetext}>
                  State
                </label>
                <input
                  type="text"
                  placeholder="Please Enter the State in which you are located"
                  name="state"
                  onChange={(e) => setState(e.target.value)}
                  className={styles.textbox}
                />
              </div>
              <div id="city" className="mb-3">
                <label htmlFor="city" className={styles.attributetext}>
                  City
                </label>
                <input
                  type="text"
                  placeholder="Please Enter the City in which you are located"
                  name="city"
                  onChange={(e) => setCity(e.target.value)}
                  className={styles.textbox}
                />
              </div>
              <div id="form-action">
                <button type="submit" className={styles.buttonorder}>
                  Submit
                </button>
              </div>
            </form>
          </>
        )}
        {shippingAddressAvailable ? (
          <>
            {/* can only access the class with [] due to the hyphen */}
          <div className={styles['flex-container']}>
            <div className={styles.address}>
              <div className={styles.addresstext}>
                <h2>Shipping Address</h2>
                <p>{shippingAddressAvailable.email}</p>
                <p>{shippingAddressAvailable.city}</p>
                <p>{shippingAddressAvailable.state}</p>
                <p>{shippingAddressAvailable.streetaddress}</p>
                <p>{shippingAddressAvailable.zipcode}</p>
              </div>
            </div>
            <div className={styles.cart}>
              <div className={styles.carttext}>
                <h3>Total Amount</h3>
                <p>Subtotal: ${totalPrice}</p>
                <p>Estimated Shipping: $0.00</p>
                <p>Estimated Handeling: $0.00</p>
                <p>Total: ${totalPrice}</p>

                {cartData.map((cartItem, index) => (
                  <div className={styles.carttable} key={index}>  
                    <div className={styles.checkoutimg}>
                      <img
                          style={{width: '20%', height: '40%'}}
                          key={cartItem.image_id}
                          src={cartItem.image_url}
                      />
                    </div>
                    <div className={styles.checkoutinfo}>
                      <b>{cartItem.brand_name} {cartItem.shoe_name}</b>
                      <p>{cartItem.sex} Shoe&apos;s</p>
                      <p>Size: {cartItem.size}</p>
                      <p>Color: {cartItem.color}</p>
                      <p>Quantity: {cartItem.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className={styles.buttoncheckout} onClick={() => createOrder()}>
            Place your order
          </button>
        </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default OrderPage;
