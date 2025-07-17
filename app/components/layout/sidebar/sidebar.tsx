import React from "react";
import styles from "./sidebar.module.css";
import { Link } from "react-router";

type Props = {};

const sidebar = (props: Props) => {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.sidebarProfile}>
        <div className={styles.profilePicture}></div>
        <h2>Username</h2>
      </div>
      <div className={styles.sidebarNav}>
        <Link to="/dashboard/all-capsules" className={styles.active}>
          All Capsules
        </Link>
        <Link to="/dashboard/my-capsules">My Capsules</Link>
        <Link to="/dashboard/settings">Settings</Link>
      </div>
      <div className={styles.sidebarFooter}>
        <button className={styles.logoutButton}>Log Out</button>
      </div>
    </nav>
  );
};

export default sidebar;
