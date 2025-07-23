import React from "react";
import styles from "./Register.module.css";
import { useRegisterLogic } from "./logic";

interface RegisterProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const Register = ({ isOpen, onClose, onSwitchToLogin }: RegisterProps) => {
  const {
    formData,
    isLoading,
    error,
    handleOverlayClick,
    handleSwitchToLogin,
    handleInputChange,
    handleSubmit,
  } = useRegisterLogic({ isOpen, onClose, onSwitchToLogin });

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.icon}>👤+</div>
          <h3 className={styles.title}>Welcome</h3>
          <p className={styles.subtitle}>
            Already have an account?{" "}
            <button className={styles.loginLink} onClick={handleSwitchToLogin}>
              Log In
            </button>
          </p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>👤</span>
            <input
              className={styles.input}
              name="name"
              placeholder="Username"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
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
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>🔒</span>
            <input
              className={styles.input}
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            className={styles.registerButton}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
