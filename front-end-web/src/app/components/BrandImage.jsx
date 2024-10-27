"use client"
import styles from "../page.module.css";

export default function BrandImage(){

    return( 
        <div className={styles.homeimg}>         
            <a href={"/brand?manufacture_id=1"}>
                <img src="/adidas.png" width={100} height={100} />
            </a>
            <a href={"/brand?manufacture_id=2"}>
                <img src="/nike.jpg" width={100} height={80} />
            </a>
            <a href={"/brand?manufacture_id=3"}>
                <img src="/puma.png" width={100} height={80} />
            </a>
            <a href={"/brand?manufacture_id=4"}>
                <img src="/jordan.png" width={100} height={100} />
            </a>
        </div>
    );

}