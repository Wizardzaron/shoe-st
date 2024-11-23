"use client"
import styles from "../page.module.css";
import React, {useState} from "react";

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap-theme.min.css"
  integrity="sha512-kgrXVPaJi1gUqEbb3lVdpJ3tWjfCfEUGD4tKm5GpUW1Gy6PIq3n89kk0zEIWxgBlfpaZD7lcmTFdHL8u5eSzug=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>;

export default function ListOfSize ({listOfShoeSizes, indexOfSize, currentSize, selectedSize}) {
    

    const returnSize = (event) => {
        console.log(event.target.value)
        const shoeSize = event.target.value
        currentSize(shoeSize);
      }    

    return (
            <div className="radio" key={indexOfSize + 1} style={{ margin: "1%" }}>
            {/* need some help with explanation */}
            {listOfShoeSizes.in_stock > 0 &&(
              <label className={ styles.ghostbutton + " " + (selectedSize == listOfShoeSizes.size_id ? styles.ispressed : "")}>
              <input
                  type="radio"
                  name="size"
                  value={listOfShoeSizes.size_id}
                  key={indexOfSize + 1}
                  className={styles.hideradio}
                  onClick={returnSize}
              />
              {listOfShoeSizes.size}
              </label>
            )}
        </div>
    );
}