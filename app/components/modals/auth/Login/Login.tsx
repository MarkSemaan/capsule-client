import React, { useEffect } from "react";
import styles from "./Login.module.css";

interface loginProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister?: () => void;
}

const Login = ({ isOpen, onClose, onSwitchToRegister }: loginProps) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleSwitchToRegister = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    if (onSwitchToRegister) {
      onSwitchToRegister();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.icon}>👤</div>
          <h3 className={styles.title}>Welcome Back!</h3>
          {onSwitchToRegister && (
            <p className={styles.subtitle}>
              Don't have an account?{" "}
              <button
                className={styles.registerLink}
                onClick={handleSwitchToRegister}
              >
                Sign Up
              </button>
            </p>
          )}
        </div>
        <form className={styles.form}>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>📧</span>
            <input className={styles.input} name="email" placeholder="Email" />
          </div>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>🔒</span>
            <input
              className={styles.input}
              name="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <button className={styles.loginButton} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
