import React from "react";
import styles from "./sidebar.module.css";
import { Link } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";

interface SidebarProps {
  onLoginClick: () => void;
}

const Sidebar = ({ onLoginClick }: SidebarProps) => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={styles.sidebarContainer}>
      <nav className={styles.sidebar}>
        <div className={styles.sidebarProfile}>
          <div className={styles.profilePicture}></div>
          <h2>{isAuthenticated ? user?.name : "Guest"}</h2>
        </div>
        <div className={styles.sidebarNav}>
          <Link to="/dashboard/all-capsules" className={styles.active}>
            All Capsules
          </Link>
          <Link to="/dashboard/my-capsules">My Capsules</Link>
        </div>
        <div className={styles.sidebarFooter}>
          {isAuthenticated ? (
            <button className={styles.authButton} onClick={handleLogout}>
              Log Out
            </button>
          ) : (
            <button className={styles.authButton} onClick={onLoginClick}>
              Log In
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
