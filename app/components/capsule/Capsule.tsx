import React from "react";
import styles from "./Capsule.module.css";

type Props = {};

const Capsule = (props: Props) => {
  return (
    <div className={styles.capsuleContainer}>
      <div className={styles.capsule}>
        <div className={styles.header}>
          <div className={styles.avatar}></div>
          <div className={styles.userInfo}>
            <h3 className={styles.title}>Title</h3>
            <p className={styles.username}>Username</p>
          </div>
        </div>

        <div className={styles.content}>
          <p>This is a sample capsule, hello world!</p>
        </div>

        <div className={styles.footer}>
          <span className={styles.tag}>Tag</span>
          <div className={styles.date}>
            <span className={styles.calendarIcon}>📅</span>
            <span>Month, Day, Year</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Capsule;
