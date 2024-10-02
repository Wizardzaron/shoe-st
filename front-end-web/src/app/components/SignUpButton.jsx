"use client"
import styles from "../page.module.css";
import Link from "next/link";

export default function SignUpButton() {

    return(
      <Link href="/signup" className={styles.spaceBetweenLink}>
        {" "}
        Create Account
      </Link>
    );
}