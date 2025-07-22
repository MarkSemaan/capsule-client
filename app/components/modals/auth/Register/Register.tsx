import React, { useEffect } from "react";
import styles from "./Register.module.css";

interface RegisterProps {
  isOpen: boolean;
  onClose: () => void;
}

const Register = ({ isOpen, onClose }: RegisterProps) => {
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

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <h3 className={styles.title}>Create Account</h3>
        <form className={styles.form}>
          <input className={styles.input} name="name" placeholder="Username" />
          <input className={styles.input} name="email" placeholder="Email" />
          <input
            className={styles.input}
            name="password"
            type="password"
            placeholder="Password"
          />
          <input
            className={styles.input}
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
          />
          <button className={styles.registerButton} type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
