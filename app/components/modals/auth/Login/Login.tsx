import React, { useState } from "react";
import styles from "./Login.module.css";
import { useModalClose } from "../../../../hooks/useModalClose";
import { useModalSwitch } from "../../../../hooks/useModalSwitch";
import { useAuth } from "../../../../contexts/AuthContext";

interface loginProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister?: () => void;
}

const Login = ({ isOpen, onClose, onSwitchToRegister }: loginProps) => {
  const { handleOverlayClick } = useModalClose({ isOpen, onClose });
  const { handleSwitch } = useModalSwitch({ onSwitchTo: onSwitchToRegister });
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSwitchToRegister = (e: React.MouseEvent) => {
    handleSwitch(e);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(formData.email, formData.password);
      onClose();
      setFormData({ email: "", password: "" });
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
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
