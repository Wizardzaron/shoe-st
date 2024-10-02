"use client"
import styles from "../page.module.css";
import React, {useState} from "react";

export default function ChangeMainImage ({images, setMain}) {

    const [Image, setImage] = useState(null);


    const returnSize = (event) => {
        const imageURL = event
        setImage(imageURL);
        setMain(imageURL);
      }   

    return (

        <img
        className={styles.shoeimg}
        key={images.image_id}
        src={images.image_url}
        onMouseOver={() => returnSize(images.image_url)}
      />

    )

}