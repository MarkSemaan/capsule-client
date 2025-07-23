import React from "react";
import styles from "./BigCapsule.module.css";
import { useModalClose } from "../../../hooks/useModalClose";
import { useDateFormatter } from "../../../hooks/useDateFormatter";

interface CapsuleData {
  id: number;
  title?: string;
  avatar?: string;
  username?: string;
  content?: string;
  message: string;
  tag?: string;
  tags?: Array<{ id: number; name: string }>;
  date?: Date;
  created_at: string;
  reveal_date: string;
  location?: string;
  privacy: string;
  surprise_mode: boolean;
  isRevealed?: boolean;
  mediaType?: "audio" | "image" | null;
  mediaUrl?: string;
  capsuleMedia?: Array<{ id: number; type: string; content: string }>;
  user?: { id: number; name: string; email: string };
}

interface BigCapsuleProps {
  isOpen: boolean;
  onClose: () => void;
  capsule: CapsuleData | null;
}

const BigCapsule = ({ isOpen, onClose, capsule }: BigCapsuleProps) => {
  const { handleOverlayClick } = useModalClose({ isOpen, onClose });
  const { formatDate } = useDateFormatter();

  if (!isOpen || !capsule) return null;

  // Debug logging
  console.log("BigCapsule received capsule data:", capsule);
  if (capsule.capsuleMedia && capsule.capsuleMedia.length > 0) {
    console.log("Capsule has media:", capsule.capsuleMedia[0]);
    console.log(
      "Media content length:",
      capsule.capsuleMedia[0].content?.length
    );
  }

  const isRevealTime = new Date() >= new Date(capsule.reveal_date);

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
                    <img
                      src={capsule.avatar}
                      alt={`${capsule.username}'s avatar`}
                    />
                  </div>
                  <div className={styles.userInfo}>
                    <h2 className={styles.title}>
                      {capsule.title ||
                        (capsule.message && capsule.message.length > 30
                          ? capsule.message.substring(0, 30) + "..."
                          : capsule.message) ||
                        "Untitled"}
                    </h2>
                    <p className={styles.username}>
                      by {capsule.username || capsule.user?.name || "Anonymous"}
                    </p>
                  </div>
                </div>
                <div className={styles.tagSection}>
                  <span className={styles.tag}>
                    {capsule.tag || capsule.tags?.[0]?.name || "No tag"}
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
