import React, { useState } from "react";
import styles from "./Capsule.module.css";
import { useDateFormatter } from "../../hooks/useDateFormatter";
import type { CapsuleData } from "../../types/Capsule";

interface Props extends CapsuleData {
  onCapsuleClick?: (capsule: CapsuleData) => void;
}

const Capsule = (props: Props) => {
  const { formatShortDate } = useDateFormatter();

  const handleClick = () => {
    if (props.onCapsuleClick) {
      props.onCapsuleClick(props);
    }
  };

  if (!props.isRevealed) {
    return (
      <div className={styles.capsuleContainer}>
        <div
          className={`${styles.capsule} ${styles.hidden}`}
          onClick={handleClick}
        >
          <div className={styles.hiddenContent}>
            <div className={styles.hiddenIcon}>🔒</div>
            <p>Locked</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.capsuleContainer}>
      <div className={styles.capsule} onClick={handleClick}>
        <div className={styles.header}>
          <div className={styles.avatar}>
            <span className={styles.avatarText}>
              {(props.user?.name || "A")[0].toUpperCase()}
            </span>
          </div>
          <div className={styles.userInfo}>
            <h3 className={styles.title}>
              {props.message.length > 30
                ? props.message.substring(0, 30) + "..."
                : props.message}
            </h3>
            <p className={styles.username}>{props.user?.name || "Anonymous"}</p>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.contentText}>
            <p>{props.message}</p>
          </div>
          {props.capsuleMedia && props.capsuleMedia.length > 0 && (
            <div className={styles.mediaPreview}>
              {props.capsuleMedia[0].type === "image" ? (
                <img
                  src={`data:image/png;base64,${props.capsuleMedia[0].content}`}
                  alt="Capsule media"
                  className={styles.mediaThumbnail}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (props.capsuleMedia && props.capsuleMedia[0]) {
                      target.src = `data:image/jpeg;base64,${props.capsuleMedia[0].content}`;
                    }
                  }}
                />
              ) : props.capsuleMedia[0].type === "audio" ? (
                <div className={styles.audioPreview}>
                  <span>♪</span>
                </div>
              ) : null}
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <span className={styles.tag}>
            {props.tags?.[0]?.name || "No tag"}
          </span>
          <div className={styles.date}>
            <span className={styles.calendarIcon}>📅</span>
            <span>{formatShortDate(new Date(props.created_at))}</span>
          </div>
          <div className={styles.location}>
            <span className={styles.locationIcon}>📍</span>
            <span>{props.location || "Unknown location"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Capsule;
