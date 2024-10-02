"use client"
import styles from "../page.module.css";
import Link from "next/link";


export default function CartButton() {

    return(
        <Link href="/cart" className={styles.spaceBetweenLink}>
            {" "}
            Cart
        </Link>
    );
}