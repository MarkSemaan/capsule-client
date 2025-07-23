import React from "react";
import styles from "./BigCapsule.module.css";
import { useBigCapsuleLogic } from "./logic";
import type { CapsuleData } from "../../../types/Capsule";

interface BigCapsuleProps {
  isOpen: boolean;
  onClose: () => void;
  capsule: CapsuleData | null;
}

const BigCapsule = ({ isOpen, onClose, capsule }: BigCapsuleProps) => {
  const { handleOverlayClick, formatDate, isRevealTime } = useBigCapsuleLogic({
    isOpen,
    onClose,
    capsule,
  });

  if (!isOpen || !capsule) return null;

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
                  {formatDate(new Date(capsule.reveal_date))}
                </span>
              </p>
            </div>
          ) : (
            <div className={styles.revealedContent}>
              <div className={styles.capsuleHeader}>
                <div className={styles.userSection}>
                  <div className={styles.avatar}>
                    <span className={styles.avatarText}>
                      {(capsule.user?.name || "A")[0].toUpperCase()}
                    </span>
                  </div>
                  <div className={styles.userInfo}>
                    <h2 className={styles.title}>
                      {capsule.message.length > 30
                        ? capsule.message.substring(0, 30) + "..."
                        : capsule.message}
                    </h2>
                    <p className={styles.username}>
                      by by {capsule.user?.name || "Anonymous"}
                    </p>
                  </div>
                </div>
                <div className={styles.tagSection}>
                  <span className={styles.tag}>
                    {capsule.tags?.[0]?.name || "No tag"}
                  </span>
                </div>
              </div>

              {capsule.capsuleMedia && capsule.capsuleMedia.length > 0 && (
                <div className={styles.mediaSection}>
                  {capsule.capsuleMedia[0].type === "image" ? (
                    <img
                      src={`data:image/png;base64,${capsule.capsuleMedia[0].content}`}
                      alt="Capsule media"
                      className={styles.mediaImage}
                      onLoad={() => {
                        console.log("Image loaded successfully");
                      }}
                      onError={(e) => {
                        console.log(
                          "Image failed to load, trying JPEG fallback"
                        );
                        // Fallback to JPEG if PNG fails
                        const target = e.target as HTMLImageElement;
                        if (capsule.capsuleMedia && capsule.capsuleMedia[0]) {
                          target.src = `data:image/jpeg;base64,${capsule.capsuleMedia[0].content}`;
                        }
                      }}
                    />
                  ) : capsule.capsuleMedia[0].type === "audio" ? (
                    <div className={styles.audioPlayer}>
                      <audio controls className={styles.audio}>
                        <source
                          src={`data:audio/mpeg;base64,${capsule.capsuleMedia[0].content}`}
                          type="audio/mpeg"
                        />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  ) : null}
                </div>
              )}

              <div className={styles.messageSection}>
                <div className={styles.messageContent}>
                  <p>{capsule.message}</p>
                </div>
              </div>

              <div className={styles.metadata}>
                <div className={styles.metadataItem}>
                  <span className={styles.metadataIcon}>📅</span>
                  <span className={styles.metadataLabel}>Created:</span>
                  <span className={styles.metadataValue}>
                    {formatDate(new Date(capsule.created_at))}
                  </span>
                </div>
                <div className={styles.metadataItem}>
                  <span className={styles.metadataIcon}>📍</span>
                  <span className={styles.metadataLabel}>Location:</span>
                  <span className={styles.metadataValue}>
                    {capsule.location || "Unknown location"}
                  </span>
                </div>
                <div className={styles.metadataItem}>
                  <span className={styles.metadataIcon}>🔓</span>
                  <span className={styles.metadataLabel}>Revealed:</span>
                  <span className={styles.metadataValue}>
                    {formatDate(new Date(capsule.reveal_date))}
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
