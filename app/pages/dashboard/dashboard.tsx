import React from "react";
import Sidebar from "../../components/layout/sidebar/sidebar";
import Capsule from "../../components/capsule/Capsule";
import styles from "./dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.topBar}>
          <h1 className={styles.title}>Capsule Wall</h1>
          <div className={styles.topBarRight}>
            <button className={styles.createButton}>Create Capsule</button>
            <div className={styles.filter}>
              <span>Filter</span>
              <span className={styles.dropdownArrow}>▼</span>
            </div>
          </div>
        </div>

        <div className={styles.capsuleGrid}>
          {Array.from({ length: 20 }, (_, index) => (
            <Capsule
              key={index}
              title="Title"
              avatar="https://placehold.co/600x400"
              username="Username"
              content="This is a sample capsule, hello world!"
              tag="Tag"
              date={new Date()}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
