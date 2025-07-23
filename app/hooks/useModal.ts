import { useCallback } from "react";

interface UseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
}

export const useModal = ({ isOpen, onClose, onSubmit }: UseModalProps) => {
  const handleSubmit = useCallback(
    (e: React.FormEvent, formData: any, resetForm: () => void) => {
      e.preventDefault();
      if (onSubmit) {
        onSubmit(formData);
      }
      resetForm();
      onClose();
    },
    [onSubmit, onClose]
  );

  const handleBackClick = useCallback(() => {
    onClose();
  }, [onClose]);

  return {
    handleSubmit,
    handleBackClick,
  };
};
