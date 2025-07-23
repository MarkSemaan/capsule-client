import React, { useState } from "react";
import styles from "./LandingPage.module.css";
import { Link } from "react-router";
import badgePlus from "./badge-plus.svg";
import badgeShare from "./share.svg";
import badgeExplore from "./telescope.svg";
import Login from "../../components/modals/auth/Login/Login";

type Props = {};

const LandingPage = (props: Props) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <main>
      <header>
        <div className={styles.navbar}>
          <div className={styles.title}>
            <Link to="/">Time Capsule</Link>
          </div>
        </div>
      </header>
      <section className={styles.hero}>
        <div>
          <h1>Your time capsules</h1>
          <p>All in one place</p>
        </div>
        <div>
          <button className={styles.getStarted}>
            <Link to="/dashboard">Get Started</Link>
          </button>
        </div>
      </section>
      <section className={styles.featuresContainer}>
        <div className={styles.feature}>
          <div className={styles.featureBox}>
            <img src={badgePlus} className={styles.featureIcon} />
          </div>
          <h2>Create</h2>
          <p>Create a time capsule to share with your friends and family.</p>
        </div>
        <div className={styles.feature}>
          <div className={styles.featureBox}>
            <img src={badgeShare} className={styles.featureIcon} />
          </div>
          <h2>Share</h2>
          <p>Share your time capsule for everyone to see.</p>
        </div>
        <div className={styles.feature}>
          <div className={styles.featureBox}>
            <img src={badgeExplore} className={styles.featureIcon} />
          </div>
          <h2>Explore</h2>
          <p>Explore all the unique time capsules from around the world.</p>
        </div>
      </section>
      <Login
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </main>
  );
};

export default LandingPage;
