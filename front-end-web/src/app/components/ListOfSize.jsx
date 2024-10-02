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

export default function CheckoutButton ({ListSize, IndexOfSize, currentSize}) {
    
    const [selectedSize, setSelectedSize] = useState(null);


    const returnSize = (event) => {
        const shoeSize = event.target.value
        setSelectedSize(shoeSize);
        currentSize(shoeSize);
      }    

    return (
            <div className="radio" key={IndexOfSize + 1}>
            <label className={(ListSize.in_stock > 0 ? styles.ghostbutton: "") + (selectedSize == ListSize.size_id ? " " + styles.ispressed : "")}>
            <input
                type="radio"
                name="size"
                value={ListSize.size_id}
                key={IndexOfSize + 1}
                disabled={!ListSize.in_stock}
                className={styles.hideradio}
                onClick={returnSize}
            />
            {ListSize.size}
            </label>
        </div>
    );
}