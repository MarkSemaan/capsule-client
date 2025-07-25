import React from "react";
import styles from "./CreateCapsule.module.css";
import { useCreateCapsuleLogic } from "./logic";

interface CreateCapsuleProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (capsuleData: any) => void;
}

const CreateCapsule = ({ isOpen, onClose, onSubmit }: CreateCapsuleProps) => {
  const {
    formData,
    tagInput,
    setTagInput,
    handleInputChange,
    handleTagInputKeyDown,
    removeTag,
    isLoading,
    error,
    handleOverlayClick,
    handleBackClick,
    handleAudioUpload,
    handleImageUpload,
    handleSubmit,
  } = useCreateCapsuleLogic({ isOpen, onClose, onSubmit });

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <button onClick={handleBackClick} className={styles.backButton}>
            ←
          </button>
          <h2 className={styles.title}>Create Capsule</h2>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.messageSection}>
            <textarea
              className={styles.messageInput}
              placeholder="Write a message to your future self"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              rows={4}
            />
          </div>

          <div className={styles.mediaButtons}>
            <label
              className={`${styles.mediaButton} ${
                formData.mediaType === "audio" ? styles.active : ""
              }`}
            >
              <input
                type="file"
                accept="audio/*"
                onChange={handleAudioUpload}
                style={{ display: "none" }}
              />
              🎤 Audio
            </label>
            <label
              className={`${styles.mediaButton} ${
                formData.mediaType === "image" ? styles.active : ""
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              📷 Image
            </label>
          </div>

          <div className={styles.inputSection}>
            <div className={styles.inputWrapper}>
              📅
              <input
                type="datetime-local"
                className={styles.input}
                value={formData.dateTime}
                onChange={(e) => handleInputChange("dateTime", e.target.value)}
                placeholder="Select date and time"
              />
              ▼
            </div>
          </div>

          <div className={styles.inputSection}>
            <div className={styles.inputWrapper}>
              🔒
              <select
                className={styles.input}
                value={formData.privacy}
                onChange={(e) => handleInputChange("privacy", e.target.value)}
              >
                <option value="Private">Status: Private</option>
                <option value="Public">Status: Public</option>
                <option value="Unlisted">Status: Unlisted</option>
              </select>
            </div>
          </div>

          <div className={styles.inputSection}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                className={styles.input}
                placeholder="Add tag (press Enter)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
              />
            </div>
            {formData.tags.length > 0 && (
              <div className={styles.tagsContainer}>
                {formData.tags.map((tag: string, index: number) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className={styles.tagRemove}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className={styles.surpriseModeSection}>
            <div className={styles.surpriseModeContent}>
              <div>
                <h3 className={styles.surpriseModeTitle}>Surprise Mode</h3>
                <p className={styles.surpriseModeDescription}>
                  Keep this capsule hidden even to yourself
                </p>
              </div>
              <label className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={formData.surpriseMode}
                  onChange={(e) =>
                    handleInputChange("surpriseMode", e.target.checked)
                  }
                />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className={styles.createButton}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCapsule;
