import React from "react";
import Sidebar from "../../components/layout/sidebar/sidebar";
import Capsule from "../../components/capsule/Capsule";
import styles from "./dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <main className={styles.mainContent}>
        <Capsule
          title="Stress overload"
          username="Mark"
          content="I'm so stressed out, I don't know what to do."
          tag="Stress"
          date="July 19, 2025"
        />
      </main>
    </div>
  );
};

export default Dashboard;
