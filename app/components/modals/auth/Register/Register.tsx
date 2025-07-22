import React, { useState } from "react";
import styles from "./Register.module.css";
import { useModalClose } from "../../../../hooks/useModalClose";
import { useModalSwitch } from "../../../../hooks/useModalSwitch";
import { useAuth } from "../../../../contexts/AuthContext";

interface RegisterProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const Register = ({ isOpen, onClose, onSwitchToLogin }: RegisterProps) => {
  const { handleOverlayClick } = useModalClose({ isOpen, onClose });
  const { handleSwitch } = useModalSwitch({ onSwitchTo: onSwitchToLogin });
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSwitchToLogin = (e: React.MouseEvent) => {
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password);
      onClose();
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
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
