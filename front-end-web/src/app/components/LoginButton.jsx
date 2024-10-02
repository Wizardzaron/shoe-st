"use client"
import styles from "../page.module.css";
import Link from "next/link";


export default function LoginButton() {

    return(
      <Link href="/login" className={styles.spaceBetweenLink}>
        {" "}
        Login
      </Link>
    );
}