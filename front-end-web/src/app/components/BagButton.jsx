"use client"
import styles from "../page.module.css";

export default function BagButton({callBackFunc}) {

return (
    <button type="button" onClick={callBackFunc} className={styles.buttoncontainer}>
        Add to Bag
    </button>
);
}