"use client"
import styles from "../page.module.css";

export default function ShoeBrandList({brands}) {

    return (
    <>
        <div className={styles.brand} key={brands.id}>
            <a href={"/shoedetail?id=" + brands.id}>
                <img
                    src={brands.image_url}
                    height={250}
                    alt="random stuff"
                    style={{ marginLeft: "30px", marginTop: "30px" }}
                />
                <b>{brands.brand_name} {brands.shoe_name}</b>
                <br/>
                <b>{brands.sex}&apos;s Shoes</b>
                <br/>
                <b>${brands.price}</b>
            </a>
        </div>
    </>
    )
}