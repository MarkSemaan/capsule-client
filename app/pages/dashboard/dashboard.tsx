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
          avatar="https://placehold.co/600x400"
          username="Mark"
          content="I'm so stressed out, I don't know what to do."
          tag="Stress"
          date={new Date()}
        />
      </main>
    </div>
  );
};

export default Dashboard;
