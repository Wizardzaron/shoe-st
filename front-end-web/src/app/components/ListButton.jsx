"use client"
import styles from "../page.module.css";
import Link from "next/link";

export default function ListButton() {

    return(
        <Link href="/list" className={styles.spaceBetweenLink}>
            {" "}
            Shoe List
        </Link>
    );
}