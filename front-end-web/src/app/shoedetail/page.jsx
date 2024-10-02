"use client";
import React, { useState, useEffect } from "react";
import styles from "../page.module.css";
import Link from "next/link";
import { useRouter } from 'next/navigation';

import SignUpButton from "../components/SignUpButton"
import LoginButton from "../components/LoginButton"
import LogoutButton from "../components/LogoutButton"
import BagButton from "../components/BagButton";
import SearchButton from "../components/SearchButton"
import CartButton from "../components/CartButton"
import ShoeDescription from "../components/ShoeDescription";
import ListOfSize from "../components/ListOfSize";
import ChangeMainImage from "../components/ChangeMainImage";

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap-theme.min.css"
  integrity="sha512-kgrXVPaJi1gUqEbb3lVdpJ3tWjfCfEUGD4tKm5GpUW1Gy6PIq3n89kk0zEIWxgBlfpaZD7lcmTFdHL8u5eSzug=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>;

const ShoePage = () => {
  const [shoedet, setShoedet] = useState(null);
  const [authenticate, setAuthenticate] = useState({});
  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const router = useRouter()

  const setMain = (event) => {
    setMainImage(event);
  }

  const currentSize = (shoeSize) => {
    setSelectedSize(shoeSize);
  }

  const testing = (event) => {
    event.preventDefault();
    console.log("This is testing");
  };

  //cannot use components in executable code or jsx

  const addItemToCart = (event) => { 
    console.log("addItemToCart");
    var size_id = document.querySelector('input[name="size"]:checked').value;
    console.log(size_id);

    if (authenticate["loggedin"] == "False") {
      alert("You must be logged in to be able to order shoes")
    }
    else{

      const formData = new FormData();
      formData.append('size_id',size_id);
      const obj = Object.fromEntries(formData.entries());
      console.log(obj);

      try {
        fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/cartitem', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(obj),
          credentials: 'include'
        })
  
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); // Assuming the response is JSON
          })
  
          .then((data) => {
            console.log("Data: " + data);
          })
          .catch(e => {
            console.log("Before error")
            console.log({ e })
            console.log("After error")
          });
      } catch (error) {
        console.error("Error occured at posting data: ", error);
      }
  
      router.push('/cart');
    }  
  }

  const goToCheckout = (event) => {
    console.log("goToCheckout");
    event.preventDefault();
    //when retrieving the value it retrieves it as a string,even if the value is an integer
    //need to convert back to a integer for the api
    var size = parseInt(document.querySelector('input[name="size"]:checked').value);
    console.log(size);

    if (authenticate["loggedin"]== "False") {
        alert("You must be logged in to be able to order shoes")
    }
    else{
      router.push('/checkout');
    }
  };

  useEffect(() => {
    const button = document.querySelector(".ghostbutton");

    if (button) {
      button.addEventListener("click", testing);
    }
    const urlParams = new URLSearchParams(window.location.search);
    var item_id = urlParams.get("id");
    console.log(item_id);
    const formData = new FormData();
    formData.append("item_id", item_id);

    fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/getlogin',{
      method: 'GET',
      credentials: 'include',
    })

      .then((response) => response.json())
      .then((authenticate) => {
          setAuthenticate(authenticate);
          console.log("We received a response for getlogin", authenticate["loggedin"]);
          // if (authenticate["loggedin"]== "False") {
          //     console.log("Endpoint works")
          // }
      })
      .catch(e => {
          console.log("Before error")
          console.log({ e })
          console.log("After error")
      })

    fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/shoedata?id=' + item_id, {
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => response.json())
      .then((anItem) => {
        console.log(anItem);
        setShoedet(anItem);
        setMainImage(anItem.images[0].image_url);
        // console.log(anItem.images[0].image_url);
      })
      .catch((e) => {
        console.log("Before error");
        console.log({ e });
        console.log("After error");
      });
  }, []);
  if (shoedet == null) {
    return console.log("returned null");
  }

  return (
    <div className={styles.backgroundpage}>
      <div className={styles.navigationbar}>
        <div className={styles.spaceForImage}>
          <a href="/home">
            <img src="/fakeLogo.png" width={100} height={100} />
          </a>
              {authenticate["loggedin"] == "False" ? (
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
              <SearchButton />
        </div>
      </div>

      <div className={styles.detailflex}>
        <div className={styles.flexcarousel}>
          {shoedet.images.map((anImage) => (
            <ChangeMainImage images={anImage} setMain={setMain} />
          ))}
        </div>
        <div className={styles.imgdiv}>
          <img
            className={styles.imgsize}
            src={mainImage}
          />
        </div>
        <div className={styles.descriptiveflex}>
          <ShoeDescription ShoeDesc={shoedet} />
          <div>
            {shoedet.brand_images.map((brandImg) => (
              <div key={brandImg.shoe_id}>
                <a href={"/shoedetail?id=" + brandImg.shoe_id}>
                <img className={styles.flexbrand} src={brandImg.image_url} />
                </a>
              </div>
            ))}
          </div>
          <form onSubmit={goToCheckout}>
            <div className={styles.split}>
              {shoedet.sizes.map((aSize, sizeIndex) => (
                <ListOfSize ListSize={aSize} IndexOfSize={sizeIndex} currentSize={currentSize}/>
              ))}
            </div>
            
            <div id="form-action">
              <div class={styles.flexbutton}>
                <button type="submit" className={styles.buttoncontainer}>
                  Checkout
                </button>
              </div>
              <div class={styles.flexbutton}>
                <BagButton callBackFunc={addItemToCart}/>
              </div>
            </div>
          </form>
          <div className={styles.descriptivetext}>
            <p>{shoedet.descript}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoePage;
