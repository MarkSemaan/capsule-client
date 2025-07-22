import React from "react";
import styles from "./Register.module.css";
import { useModalClose } from "../../../../hooks/useModalClose";
import { useModalSwitch } from "../../../../hooks/useModalSwitch";

interface RegisterProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const Register = ({ isOpen, onClose, onSwitchToLogin }: RegisterProps) => {
  const { handleOverlayClick } = useModalClose({ isOpen, onClose });
  const { handleSwitch } = useModalSwitch({ onSwitchTo: onSwitchToLogin });

  if (!isOpen) return null;

  const handleSwitchToLogin = (e: React.MouseEvent) => {
    handleSwitch(e);
    onClose();
  };

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
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>🔒</span>
            <input
              className={styles.input}
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <button className={styles.registerButton} type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
