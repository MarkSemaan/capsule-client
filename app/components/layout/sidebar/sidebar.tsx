import React from "react";
import styles from "./sidebar.module.css";
import { Link } from "react-router";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className={styles.sidebarContainer}>
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
        </div>
        <div className={styles.sidebarFooter}>
          <button className={styles.logoutButton}>Log Out</button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
