import React from "react";
import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <img
        alt="Not found"
        src={process.env.PUBLIC_URL + "/ostrich.png"}
        className={styles.img}
      />
      <h1 className={styles.heading}>Not Found</h1>
      <Link className={styles.link} to="/">
        Go to the main page ›
      </Link>
    </div>
  );
};

export default NotFound;
