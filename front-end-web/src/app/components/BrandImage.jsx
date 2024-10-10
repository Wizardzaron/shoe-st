"use client"
import styles from "../page.module.css";

export default function BrandImage(){

    return( 
        <div className={styles.homeimg}>         
            <a href={"/brand?brand=Adidas"}>
                <img src="/adidas.png" width={100} hieght={100} />
            </a>
            <a href={"/brand?brand=Nike"}>
                <img src="/nike.jpg" width={100} hieght={100} />
            </a>
            <a href={"/brand?brand=Puma"}>
                <img src="/puma.png" width={100} hieght={100} />
            </a>
            <a href={"/brand?brand=Jordan"}>
                <img src="/jordan.png" width={100} hieght={100} />
            </a>
        </div>
    );

}