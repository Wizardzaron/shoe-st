"use client";
import React, { useState, useEffect } from "react";
import styles from "../page.module.css";
import Link from "next/link";
import { useRouter } from 'next/navigation';

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap-theme.min.css"
  integrity="sha512-kgrXVPaJi1gUqEbb3lVdpJ3tWjfCfEUGD4tKm5GpUW1Gy6PIq3n89kk0zEIWxgBlfpaZD7lcmTFdHL8u5eSzug=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>;

const ShoePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [shoedet, setShoedet] = useState(null);
  const [authenticate, setAuthenticate] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  const router = useRouter()

  const setMain = (event) => {
    // event.preventDefault();
    setMainImage(event);
    console.log(mainImage);
  }

  const setSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const searching = (event) => {
    event.preventDefault();

    console.log(searchValue);
  };

  const testing = (event) => {
    event.preventDefault();
    console.log("Hello");
  };

  const goToCart = (event) => {
    event.preventDefault();
    var size = document.querySelector('input[name="size"]:checked').value;
    console.log(size);
    console.log("Heyo");

    if (authenticate["loggedin"]== "False") {
      alert("You must be logged in to be able to order shoes")
    }
    else{

      const formData = new FormData(size);
      formData.append(shoedet.brand_name);
      formData.append(shoedet.shoe_name);
      formData.append(shoedet.price);
      const obj = Object.fromEntries(formData.entries());
      console.log(obj);
      try {
        fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + '/cartdata', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(obj)
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

  };

  const goToCheckout = (event) => {
    event.preventDefault();
    var size = document.querySelector('input[name="size"]:checked').value;
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

    fetch("http://127.0.0.1:5000/shoedata?id=" + item_id, {
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => response.json())
      .then((anItem) => {
        console.log(anItem);
        setShoedet(anItem);
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
          <img src="/fakeLogo.png" width={100} height={100} />
          <Link href="/signup" className={styles.spaceBetweenLink}>
            {" "}
            Create Account
          </Link>
          <Link href="/login" className={styles.spaceBetweenLink}>
            {" "}
            Login
          </Link>
          <form style={{ display: "inline-block" }} onSubmit={searching}>
            <input
              style={{ marginLeft: "30px" }}
              id="search"
              type="text"
              placeholder="search..."
              value={searchValue}
              onChange={setSearch}
            />
            <div id="form-action" style={{ display: "inline-block" }}>
              <button type="submit" style={{ marginLeft: "10px" }}>
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.detailflex}>
        <div className={styles.flexcarousel}>
          {shoedet.images.map((anImage) => (
            <img
              className={styles.shoeimg}
              key={anImage.image_id}
              src={anImage.image_url}
              onMouseOver={() => setMain(anImage.image_url)}
            />
          ))}
        </div>
        <div className={styles.imgdiv}>
          <img
            className={styles.imgsize}
            src={mainImage}
            // onMouseOut={shoedet.images[0].image_url}
          />
        </div>
        <div className={styles.descriptiveflex}>
          <div className={styles.descriptivetext}>
            <p>{shoedet.brand_name}</p>
            <p>{shoedet.shoe_name}</p>
            <p>{shoedet.sex}</p>
            <p>${shoedet.price}</p>
          </div>
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
                <div className="radio" key={sizeIndex + 1}>
                  <label className={styles.ghostbutton}>
                    <input
                      type="radio"
                      name="size"
                      value={aSize.size}
                      key={sizeIndex + 1}
                      disabled={!aSize.in_stock}
                      className={styles.hideradio}
                    />
                    {aSize.size}
                  </label>
                </div>
              ))}
            </div>
            
            <div id="form-action">
              <button type="submit" className={styles.buttonorder}>
                Checkout
              </button>
              <button type="button" onClick={goToCart} className={styles.buttonorder}>
                Add to Bag
              </button>
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
