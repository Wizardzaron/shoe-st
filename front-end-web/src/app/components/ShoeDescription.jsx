"use client"
import styles from "../page.module.css";


export default function ShoeDescription({ShoeDesc}) {

    return(

        <div className={styles.descriptivetext}>
        <p style={{"fontSize": "25px"}}>{ShoeDesc.brand_name} {ShoeDesc.shoe_name}</p>
        <p style={{"fontSize": "19px"}}>{ShoeDesc.sex}</p>
        <p style={{"fontSize": "19px"}}>${ShoeDesc.price}</p>
      </div>


    );
}