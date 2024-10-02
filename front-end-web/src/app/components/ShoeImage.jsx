"use client"
import styles from "../page.module.css";


export default function ShoeImage({image}){
    return (
        <div key={image.image_id}>
          <a
            href={
              "/shoedetail?id=" + image.shoe_id + "&brand_id=" + image.brand_id
            }
          >
            <img src={image.image_url} alt={"image of " + image.shoe_name} />
            <section className={styles.block2}>
              {image.brand_name}
              &nbsp;
              {image.shoe_name}
            </section>
            <section className={styles.block3}>{image.descript}</section>
          </a>
        </div>
      );
}