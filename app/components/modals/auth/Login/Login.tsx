import React from "react";
import styles from "./Login.module.css";
import { useLoginLogic } from "./logic";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister?: () => void;
}

const Login = ({ isOpen, onClose, onSwitchToRegister }: LoginProps) => {
  const {
    formData,
    isLoading,
    error,
    handleOverlayClick,
    handleSwitchToRegister,
    handleInputChange,
    handleSubmit,
  } = useLoginLogic({ isOpen, onClose, onSwitchToRegister });

  if (!isOpen) return null;

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
        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>📧</span>
            <input
              className={styles.input}
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>🔒</span>
            <input
              className={styles.input}
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            className={styles.loginButton}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
