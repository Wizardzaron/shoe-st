"use client";

import React, { createContext, useState, useEffect} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";
import ShoeImage from "../components/ShoeImage"
import BrandImage from "../components/BrandImage"
import SignUpButton from "../components/SignUpButton"
import LoginButton from "../components/LoginButton"
import LogoutButton from "../components/LogoutButton"
import CartButton from "../components/CartButton"
import ListButton from "../components/ListButton"
import SearchButton from "../components/SearchButton"
//NEED TO LOOK UP LOCALIZATION LIBRARIES


function HomePage() {
  // const [searchValue, setSearchValue] = useState(null); 
  const [item, setItem] = useState(null);
  //rename to login token
  // const [authenticate, setAuthenticate] = useState({});

  const [loginToken, setLoginToken] = useState({});


  // const { REACT_APP_API_ENDPOINT } = process.env;
  //console.log({line:20,env:process.env, endpoint:process.env.NEXT_PUBLIC_LOCAL_HOST_URL, foo:process.env.NEXT_PUBLIC_FOO})

  const router = useRouter();
  const SidebarContext = createContext();

  //In future need to create search page to show search results


//NOTE: Every time we render the page the connect fetch is called. Probably too many times
//make a connection token that reruns every hour
  const checkConnectionWithDB = () => {

    fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + "/connect")
      .then((response) => response.json())
      .then((connect) => {
        if (connect.status == 503) {
          router.push("../public/503.jsx");
        }
      })
      .catch((e) => {
        console.log({ e });
      });

  }



    //how do we make sure that we check that the user is logged in before the page is rendered
    //If the useEffect fires at each render we need to make a token that checks once an hour
  
  useEffect(() => {

    //app context stores global variables

    fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + "/getlogin", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((authenticateValue) => {
        console.log(authenticateValue);
        setLoginToken(authenticateValue);
      })
      .catch((e) => {
        console.log({ e });
      });

    fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + "/allshoedata")
      .then((response) => response.json())
      .then((anItem) => {
        setItem(anItem);
      })
      .catch((e) => {
        console.log({ e });
      });
  }, []);
  
  //return a loading screen instead of a console.log()
  if (item == null) {
    return console.log("returned null");
  }

//Reducers allow you to update the things you want to update and nothing else

  return (
    //fragments are used to wrap around elements without including DOM nodes
    <>
      <div className={styles.homepage}>
        <div>
            {checkConnectionWithDB()}
        </div>
        {/* make all this a component */}
        <div className={styles.navigationbar}>
          <div className={styles.spaceForImage}>
            <img src="/fakeLogo.png" width={100} height={100} />
            <>
              {loginToken["loggedin"] == "False" ? (
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
            </>
            <ListButton />
            <SearchButton />
          </div>
          <hr style={{border: "2px solid black"}}/>
        </div>
        <Carousel autoPlay={true} interval={3000} infiniteLoop={true} showThumbs={false}>
          {item.map((anImage) => {
            return (
              // ShoeImage would be the component that we call
            <ShoeImage key={anImage.image_id} image={anImage} />
            )}
          )}
        </Carousel>
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <b>Available Brands</b>
        </div>
        <BrandImage />
      </div>
    </>
  );
}
export default HomePage;
