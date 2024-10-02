"use client"
import styles from "../page.module.css";


export default function ShoeDescription({ShoeDesc}) {

    return(

        <div className={styles.descriptivetext}>
        <p>{ShoeDesc.brand_name} {ShoeDesc.shoe_name}</p>
        <p>{ShoeDesc.sex}</p>
        <p>${ShoeDesc.price}</p>
      </div>


    );
}