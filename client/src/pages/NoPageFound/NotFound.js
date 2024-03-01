import React from "react";
import styles from "./NotFound.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.message}>
        The page you are looking for is temporarily unavailable.
      </p>
    </div>
  );
};

export default NotFoundPage;
