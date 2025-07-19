import React from "react";
import Sidebar from "../../components/layout/sidebar/sidebar";
import Capsule from "../../components/capsule/Capsule";
import styles from "./dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <main className={styles.mainContent}>
        <Capsule />
      </main>
    </div>
  );
};

export default Dashboard;
