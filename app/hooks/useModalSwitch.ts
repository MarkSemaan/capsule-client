import { useState, useCallback } from "react";

interface UseModalSwitchProps {
  onSwitchTo?: () => void;
}

export const useModalSwitch = ({ onSwitchTo }: UseModalSwitchProps) => {
  const handleSwitch = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (onSwitchTo) {
        onSwitchTo();
      }
    },
    [onSwitchTo]
  );

  return {
    handleSwitch,
  };
};
