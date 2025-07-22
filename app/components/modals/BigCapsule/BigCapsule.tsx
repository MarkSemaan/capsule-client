import React, { useEffect } from "react";
import styles from "./BigCapsule.module.css";

interface CapsuleData {
  title: string;
  avatar: string;
  username: string;
  content: string;
  tag: string;
  date: Date;
  reveal_date: Date;
  location: string;
  isRevealed?: boolean;
  mediaType?: "audio" | "image" | null;
  mediaUrl?: string;
}

interface BigCapsuleProps {
  isOpen: boolean;
  onClose: () => void;
  capsule: CapsuleData | null;
}

const BigCapsule = ({ isOpen, onClose, capsule }: BigCapsuleProps) => {
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

  if (!isOpen || !capsule) return null;

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isRevealTime = new Date() >= capsule.reveal_date;

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.content}>
          {!capsule.isRevealed && !isRevealTime ? (
            <div className={styles.lockedState}>
              <div className={styles.lockIcon}>🔒</div>
              <h2 className={styles.lockedTitle}>Capsule Locked</h2>
              <p className={styles.lockedMessage}>
                This capsule will be revealed on{" "}
                <span className={styles.revealDate}>
                  {formatDate(capsule.reveal_date)}
                </span>
              </p>
              <div className={styles.countdown}>
                <span className={styles.countdownLabel}>Time remaining:</span>
                <span className={styles.countdownTime}>
                  {/* TODO: Add countdown timer */}
                  Coming soon...
                </span>
              </div>
            </div>
          ) : (
            <div className={styles.revealedContent}>
              <div className={styles.capsuleHeader}>
                <div className={styles.userSection}>
                  <div className={styles.avatar}>
                    <img
                      src={capsule.avatar}
                      alt={`${capsule.username}'s avatar`}
                    />
                  </div>
                  <div className={styles.userInfo}>
                    <h2 className={styles.title}>{capsule.title}</h2>
                    <p className={styles.username}>by {capsule.username}</p>
                  </div>
                </div>
                <div className={styles.tagSection}>
                  <span className={styles.tag}>{capsule.tag}</span>
                </div>
              </div>

              {capsule.mediaType && capsule.mediaUrl && (
                <div className={styles.mediaSection}>
                  {capsule.mediaType === "image" ? (
                    <img
                      src={capsule.mediaUrl}
                      alt="Capsule media"
                      className={styles.mediaImage}
                    />
                  ) : capsule.mediaType === "audio" ? (
                    <div className={styles.audioPlayer}>
                      <audio controls className={styles.audio}>
                        <source src={capsule.mediaUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  ) : null}
                </div>
              )}

              <div className={styles.messageSection}>
                <div className={styles.messageContent}>
                  <p>{capsule.content}</p>
                </div>
              </div>

              <div className={styles.metadata}>
                <div className={styles.metadataItem}>
                  <span className={styles.metadataIcon}>📅</span>
                  <span className={styles.metadataLabel}>Created:</span>
                  <span className={styles.metadataValue}>
                    {formatDate(capsule.date)}
                  </span>
                </div>
                <div className={styles.metadataItem}>
                  <span className={styles.metadataIcon}>📍</span>
                  <span className={styles.metadataLabel}>Location:</span>
                  <span className={styles.metadataValue}>
                    {capsule.location}
                  </span>
                </div>
                <div className={styles.metadataItem}>
                  <span className={styles.metadataIcon}>🔓</span>
                  <span className={styles.metadataLabel}>Revealed:</span>
                  <span className={styles.metadataValue}>
                    {formatDate(capsule.reveal_date)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BigCapsule;
