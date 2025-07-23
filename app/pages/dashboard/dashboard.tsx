import React, { useState, useEffect } from "react";
import Sidebar from "../../components/layout/sidebar/sidebar";
import Capsule from "../../components/capsule/Capsule";
import styles from "./dashboard.module.css";
import CreateCapsule from "../../components/modals/CreateCapsule/CreateCapsule";
import Login from "../../components/modals/auth/Login/Login";
import Register from "../../components/modals/auth/Register/Register";
import BigCapsule from "../../components/modals/BigCapsule/BigCapsule";
import { capsuleAPI } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import type { CapsuleData } from "../../types/Capsule";

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const [isCreateCapsuleModalOpen, setIsCreateCapsuleModalOpen] =
    useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isBigCapsuleModalOpen, setIsBigCapsuleModalOpen] = useState(false);
  const [selectedCapsule, setSelectedCapsule] = useState<CapsuleData | null>(
    null
  );
  const [capsules, setCapsules] = useState<CapsuleData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentView, setCurrentView] = useState<"all" | "my">("all");

  const handleSwitchToLogin = () => {
    setIsLoginModalOpen(true);
  };

  const handleSwitchToRegister = () => {
    setIsRegisterModalOpen(true);
  };

  const handleCapsuleClick = (capsule: CapsuleData) => {
    setSelectedCapsule(capsule);
    setIsBigCapsuleModalOpen(true);
  };

  const handleCloseBigCapsule = () => {
    setIsBigCapsuleModalOpen(false);
    setSelectedCapsule(null);
  };

  const loadCapsules = async () => {
    setIsLoading(true);
    setError("");

    try {
      let response;
      if (currentView === "my" && isAuthenticated) {
        response = await capsuleAPI.getMyCapsules();
      } else {
        response = await capsuleAPI.getPublicCapsules();
      }
      setCapsules(response);
    } catch (error: any) {
      console.error("Error loading capsules:", error);
      setError("Failed to load capsules");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCapsuleCreated = (newCapsule: CapsuleData) => {
    if (isAuthenticated) {
      loadCapsules();
    }
  };

  useEffect(() => {
    loadCapsules();
  }, [isAuthenticated, currentView]);

  return (
    <div className={styles.dashboard}>
      <Sidebar
        onLoginClick={() => setIsLoginModalOpen(true)}
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          // Auto-switch to "all" if user selects "my" but isn't authenticated
          if (view === "my" && !isAuthenticated) {
            setCurrentView("all");
            setIsLoginModalOpen(true);
          }
        }}
      />
      <main className={styles.mainContent}>
        <div className={styles.topBar}>
          <h1 className={styles.title}>
            {currentView === "my" ? "My Capsules" : "All Capsules"}
          </h1>
          <div className={styles.topBarRight}>
            {isAuthenticated && (
              <button
                className={styles.createButton}
                onClick={() => setIsCreateCapsuleModalOpen(true)}
              >
                Create Capsule
              </button>
            )}
            <div className={styles.filter}>
              <span>Filter</span>
              <span className={styles.dropdownArrow}>▼</span>
            </div>
          </div>
        </div>

        <div className={styles.capsuleGrid}>
          {isLoading ? (
            <div className={styles.loading}>Loading capsules...</div>
          ) : error ? (
            <div className={styles.error}>{error}</div>
          ) : capsules.length === 0 ? (
            <div className={styles.emptyState}>
              <p>
                {isAuthenticated
                  ? "No capsules yet. Create your first one!"
                  : "No public capsules available at the moment."}
              </p>
            </div>
          ) : (
            capsules.map((capsule) => (
              <Capsule
                key={capsule.id}
                {...capsule}
                isRevealed={new Date() >= new Date(capsule.reveal_date)}
                onCapsuleClick={handleCapsuleClick}
              />
            ))
          )}
        </div>
      </main>
      <CreateCapsule
        isOpen={isCreateCapsuleModalOpen}
        onClose={() => setIsCreateCapsuleModalOpen(false)}
        onSubmit={handleCapsuleCreated}
      />
      <Login
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <Register
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
      <BigCapsule
        isOpen={isBigCapsuleModalOpen}
        onClose={handleCloseBigCapsule}
        capsule={selectedCapsule}
      />
    </div>
  );
};

export default Dashboard;
