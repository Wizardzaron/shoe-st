"use client"
import styles from "../page.module.css";

export default function ShoeBrandList({brands}) {

    return (
    <>
        <h1 style={{textAlign: "center"}}>{brands.manufacture_name} Brand Shoes</h1>
        <div className={styles.brandContainer}>
            <div className={styles.brand} key={brands.id}>
                <a href={"/shoedetail?id=" + brands.id}>
                    <img
                        src={brands.image_url}
                        height={250}
                        alt="random stuff"
                        style={{ marginLeft: "30px", marginTop: "30px" }}
                    />
                    <b>{brands.manufacture_name}{brands.brand_name}{brands.shoe_name}</b>
                    <b>{brands.price}</b>
                </a>
            </div>
        </div>
    </>
    )
}