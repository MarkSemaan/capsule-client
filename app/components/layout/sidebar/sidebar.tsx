import React from "react";
import styles from "./sidebar.module.css";
import { Link } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";

interface SidebarProps {
  onLoginClick: () => void;
  currentView: "all" | "my";
  onViewChange: (view: "all" | "my") => void;
}

const Sidebar = ({ onLoginClick, currentView, onViewChange }: SidebarProps) => {
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
          <button
            onClick={() => onViewChange("all")}
            className={currentView === "all" ? styles.active : ""}
          >
            All Capsules
          </button>
          <button
            onClick={() => onViewChange("my")}
            className={currentView === "my" ? styles.active : ""}
            disabled={!isAuthenticated}
          >
            My Capsules
          </button>
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
