import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../../contexts/AuthContext";

interface LoginLogicProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister?: () => void;
}

export const useLoginLogic = ({
  isOpen,
  onClose,
  onSwitchToRegister,
}: LoginLogicProps) => {
  const { login } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Modal close logic (from useModalClose)
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

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleSwitchToRegister = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (onSwitchToRegister) {
        onSwitchToRegister();
      }
      onClose();
    },
    [onSwitchToRegister, onClose]
  );

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

  return {
    formData,
    isLoading,
    error,
    handleOverlayClick,
    handleSwitchToRegister,
    handleInputChange,
    handleSubmit,
  };
};
