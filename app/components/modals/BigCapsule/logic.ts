import { useEffect } from "react";
import type { CapsuleData } from "../../../types/Capsule";

interface BigCapsuleLogicProps {
  isOpen: boolean;
  onClose: () => void;
  capsule: CapsuleData | null;
}

export const useBigCapsuleLogic = ({
  isOpen,
  onClose,
  capsule,
}: BigCapsuleLogicProps) => {
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

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (capsule) {
    console.log("BigCapsule received capsule data:", capsule);
    if (capsule.capsuleMedia && capsule.capsuleMedia.length > 0) {
      console.log("Capsule has media:", capsule.capsuleMedia[0]);
      console.log(
        "Media content length:",
        capsule.capsuleMedia[0].content?.length
      );
    }
  }

  const isRevealTime = capsule
    ? new Date() >= new Date(capsule.reveal_date)
    : false;

  return {
    handleOverlayClick,
    formatDate,
    isRevealTime,
  };
};
