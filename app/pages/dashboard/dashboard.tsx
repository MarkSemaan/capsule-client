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
          {/* Revealed */}
          <Capsule
            title="Doing great!"
            avatar="https://placehold.co/600x400"
            username="Mark"
            content="SE Factory is a great place to learn! Nothing wrong with the program at all!"
            tag="SE Factory"
            date={new Date()}
            reveal_date={new Date()}
            isRevealed={true}
            location="SE Factory"
          />
          <Capsule
            title="Learning React"
            avatar="https://placehold.co/600x400"
            username="Sarah"
            content="React is amazing! Building components is so much fun."
            tag="Programming"
            date={new Date()}
            reveal_date={new Date()}
            isRevealed={true}
            location="SE Factory"
          />

          {/* Hidden */}
          <Capsule
            title="Secret thoughts"
            avatar="https://placehold.co/600x400"
            username="Alex"
            content="This is a hidden capsule that needs to be revealed."
            tag="Personal"
            date={new Date()}
            reveal_date={new Date()}
            isRevealed={false}
            location="SE Factory"
          />
          <Capsule
            title="Private notes"
            avatar="https://placehold.co/600x400"
            username="Emma"
            content="These are my private thoughts and feelings."
            tag="Private"
            date={new Date()}
            reveal_date={new Date()}
            isRevealed={false}
            location="SE Factory"
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
