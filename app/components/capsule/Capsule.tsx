import React from "react";
import styles from "./Capsule.module.css";

type Props = {
  title: string;
  avatar: string;
  username: string;
  content: string;
  tag: string;
  date: Date;
};

const Capsule = (props: Props) => {
  return (
    <div className={styles.capsuleContainer}>
      <div className={styles.capsule}>
        <div className={styles.header}>
          <div className={styles.avatar}>
            <img src={props.avatar} alt="Avatar" />
          </div>
          <div className={styles.userInfo}>
            <h3 className={styles.title}>{props.title}</h3>
            <p className={styles.username}>{props.username}</p>
          </div>
        </div>

        <div className={styles.content}>
          <p>{props.content}</p>
        </div>

        <div className={styles.footer}>
          <span className={styles.tag}>{props.tag}</span>
          <div className={styles.date}>
            <span className={styles.calendarIcon}>📅</span>
            <span>{props.date.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Capsule;
