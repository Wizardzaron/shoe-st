"use client"
import styles from "../page.module.css";

export default function ShoeBrandList(brands) {

    return (

        <div className={styles.brand} key={brands.item_id}>
            <a href={"/shoedetail?id=" + brands.item_id}>
                <img
                    src={brands.images}
                    height={250}
                    alt="random stuff"
                />
                <b>{brands.names}</b>
                <b>{brands.price}</b>
            </a>
        </div>
    )


}